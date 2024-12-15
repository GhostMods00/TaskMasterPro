import express, { Request, Response } from 'express';
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

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
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

// Error handling
app.use(errorHandler);

export default app;