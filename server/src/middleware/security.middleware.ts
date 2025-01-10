// server/src/middleware/security.middleware.ts
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import config from '../config/env.config';
import { AppError } from './error.middleware';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// CORS configuration
const corsOptions = {
  origin: config.server.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 600 // 10 minutes
};

// Request sanitization
const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
  // Sanitize request body
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

// API key validation for external services
const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (req.path.startsWith('/api/public')) {
    return next();
  }

  if (!apiKey || apiKey !== config.server.apiKey) {
    throw new AppError(401, 'Invalid API key');
  }

  next();
};

export const securityMiddleware = {
  helmet: helmet(),
  cors: cors(corsOptions),
  rateLimiter: limiter,
  sanitizeRequest,
  validateApiKey
};