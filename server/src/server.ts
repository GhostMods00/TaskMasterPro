import app from './app';
import { sequelize } from './config/database';
import { CONFIG } from './config/config';

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
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();