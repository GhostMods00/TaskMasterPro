// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

interface ErrorResponse {
  status: 'error' | 'fail';
  message: string;
  stack?: string;
  errors?: any;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse: ErrorResponse = {
    status: 'error',
    message: err.message || 'Internal server error'
  };

  if (err instanceof AppError) {
    errorResponse.status = err.statusCode < 500 ? 'fail' : 'error';
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle Sequelize errors
  if (err.name === 'SequelizeValidationError') {
    errorResponse.status = 'fail';
    errorResponse.message = 'Validation error';
    errorResponse.errors = (err as any).errors.map((e: any) => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(errorResponse);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    errorResponse.status = 'fail';
    errorResponse.message = 'Invalid token';
    return res.status(401).json(errorResponse);
  }

  if (err.name === 'TokenExpiredError') {
    errorResponse.status = 'fail';
    errorResponse.message = 'Token expired';
    return res.status(401).json(errorResponse);
  }

  // Handle unknown errors
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(500).json(errorResponse);
};

export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};