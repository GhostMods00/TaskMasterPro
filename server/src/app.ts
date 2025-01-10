// server/src/app.ts
import express from 'express';
import { securityMiddleware } from './middleware/security.middleware';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './services/logging.service';
import { logger } from './services/logging.service';
import config from './config/env.config';

const app = express();

// Security middleware
app.use(securityMiddleware.helmet);
app.use(securityMiddleware.cors);
app.use('/api/', securityMiddleware.rateLimiter);
app.use(securityMiddleware.sanitizeRequest);

// Logging middleware
app.use(requestLogger);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/integrations', require('./routes/integration.routes'));

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    const { port } = config.server;
    app.listen(port, () => {
      logger.info(`Server running on port ${port} in ${config.server.nodeEnv} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

export { app, startServer };