// server/src/app.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'TaskMaster Pro API' });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

export default app;