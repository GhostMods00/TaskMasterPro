import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import { CONFIG } from '../config/config';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Invalid authentication token'
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    error: CONFIG.NODE_ENV === 'development' ? err.message : undefined
  });
};