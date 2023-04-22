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
  const tokenPayload = await jwtHandler.decodeToken(res.locals.accessToken);
  const userId = tokenPayload ? tokenPayload?.userId : false;

  if (!userId)
    return res.status(403).json({
      error: true,
      statusToken:
        'Could not identify the user linked to the provided token. Generate a new token and try again!',
    });
  res.locals.userId = Number(userId);

  return next();
};

export default { tokenChecker };
