import { NextFunction, Request, Response } from 'express';
import jwtHandler from '../utils/validations/jtw.validations.js';

const tokenChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (!accessToken) {
    return res.status(403).json({ error: true, statusToken: 'empty' });
  }

  const isAccessTokenValid = await jwtHandler.validateAccessToken(accessToken);
  if (!isAccessTokenValid) {
    return res.status(403).json({ error: true, statusToken: 'invalid' });
  }

  if (isAccessTokenValid === 'expired') {
    return res.status(403).json({ error: true, statusToken: 'expired' });
  }
  res.locals.accessToken = accessToken;
  return next();
};

export default { tokenChecker };
