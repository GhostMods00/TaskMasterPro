import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any
> extends Request<P, ResBody, ReqBody> {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}