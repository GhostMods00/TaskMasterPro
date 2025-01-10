// src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: 'No request body provided' });
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Validation error', error });
    }
  };
};