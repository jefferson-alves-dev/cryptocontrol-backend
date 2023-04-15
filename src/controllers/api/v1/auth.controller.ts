import { Request, Response } from 'express';
import authModels from '../../../models/auth.models.js';
import jwtHandler from '../../../utils/validations/jtw.validations.js';
import passwordValidator from '../../../utils/validations/password.validations.js';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authModels.getByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Incorrect username or password.' });
  }

  if (user.isActive === 0) {
    res.status(200).json({
      message: `The account linked to the '${email}' email is not available.`,
    });
  }

  const isPasswordValid = await passwordValidator.comparePassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Incorrect username or password.' });
  }

  const tokenData = await jwtHandler.generateAccessTokenAndRefreshToken(
    String(user.id)
  );
  res.status(200).json({ ...tokenData });
};

const logout = async (req: Request, res: Response) => {
  res.send('Logout');
};

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers['authorization']?.split(' ')[1];
  if (!refreshToken) {
    return res.status(404).json({ error: true, statusToken: 'empty' });
  }

  const isRefreshTokenValid = await jwtHandler.validateRefreshToken(
    refreshToken
  );

  if (isRefreshTokenValid === 'expired') {
    return res.status(401).json({
      message: 'Your refresh token has been expired. Do login again!',
    });
  }
  if (!isRefreshTokenValid) {
    return res.status(401).json({ message: 'Invalid refresh token.' });
  }

  try {
    const refreshTokenPayload: any = await jwtHandler.decodeToken(refreshToken);
    const token = await jwtHandler.generateAccessTokenAndRefreshToken(
      refreshTokenPayload.userId
    );
    return res.status(200).json({
      ...token,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: (error as Error).message });
  }
};

const checkToken = async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token cannot be empty!' });
  }

  const isTokenValid = await jwtHandler.validateToken(token);
  if (isTokenValid === 'expired') {
    return res.status(400).json({ status: isTokenValid });
  }

  if (isTokenValid === 'invalid') {
    return res.status(400).json({ status: isTokenValid });
  }

  if (!isTokenValid) {
    return res.status(400).json({ status: isTokenValid });
  }

  return res.status(200).json({ status: isTokenValid });
};

export default { logout, refreshToken, login, checkToken };
