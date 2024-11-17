import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorCatcher, invalidAuthTokenErrorRes, noAuthTokenErrorRes } from '../../lib/errorHandler';

interface User {
  name: string;
}
export const login = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const user: User = { name: username }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return errorCatcher(res, error);
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && `${authHeader.split(' ')[1]}`
    if (!token) {
      return noAuthTokenErrorRes(res, token);
    }

    jwt.verify(
      token, 
      process.env.ACCESS_TOKEN_SECRET, 
      (err, user) => {
        if (err) {
          return invalidAuthTokenErrorRes(res, err);
        }

        req.user = user;
        next();
    });
  } catch (error) {
    return errorCatcher(res, error);
  }  
}

export const generateAccessToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: '30s', 
    }
  );
}