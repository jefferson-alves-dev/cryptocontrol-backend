import { NextFunction, Request, Response } from 'express';

/* This middleware prevents internal errors from being sent to the client. */
export const preventSendingErrors = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(400).json({
    error: true,
    message:
      'There was an error! Please review your request or contact a system administrator.',
  });
};
