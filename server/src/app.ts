import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { CONFIG } from './config/config';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors({
  origin: CONFIG.CORS_ORIGIN,
  credentials: true
}));

// Configure Helmet for security while allowing React app to work
app.use(helmet({
  contentSecurityPolicy: false, // Disabled because React needs to load various resources
  crossOriginEmbedderPolicy: false
}));

app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    environment: CONFIG.NODE_ENV 
  });
});

// Serve static files in production
if (CONFIG.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Error handling (should be last)
app.use(errorHandler);

export default app;