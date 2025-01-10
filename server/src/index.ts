// server/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import projectRoutes from './routes/project.routes';
import db from './models'; // Import models to initialize the database

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/projects', projectRoutes);

// Routes
app.use('/api/auth', authRoutes);

// Start server function
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await db.sequelize.sync({ alter: true }); // Sync models
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer(); // Start the server