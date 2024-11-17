import { type Response } from "express"
import { type VerifyErrors } from "jsonwebtoken";

export const errorCatcher = (res: Response, error: any, extraInfo?: Record<string, any>) => {
  console.error('Caught error:', error);
  return res.status(500).json({ error: error.toString(), ...extraInfo });
}

export const noAuthTokenErrorRes = (res: Response, tokenValue?: string) => {
  console.error('No auth token:', tokenValue);
  return res.status(401).json({
    message: 'No auth token',
    tokenValue,
  });
}
export const invalidAuthTokenErrorRes = (res: Response, error?: VerifyErrors) => {
  console.error('Invalid auth token:', error);
  return res.status(403).json({
    message: 'Invalid auth token',
    error,
  });
}
