import express from 'express';
import path from 'path';
import app from './app';
import { sequelize } from './config/database';
import { CONFIG } from './config/config';

// Serve static files from the correct build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

async function startServer() {
  try {
    // Database authentication
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database in development
    if (CONFIG.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized');
    }

    // Start server
    app.listen(CONFIG.PORT, () => {
      console.log(`Server running in ${CONFIG.NODE_ENV} mode on port ${CONFIG.PORT}`);
      console.log(`Static files being served from: ${path.join(__dirname, '../client/dist')}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();