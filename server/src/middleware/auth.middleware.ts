import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export interface UserPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest<
  P = Record<string, string>,
  ResBody = any,
  ReqBody = any
> extends Request<P, ResBody, ReqBody> {
  user?: UserPayload;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Authentication token required' });
      return;
    }

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};