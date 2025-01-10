// src/config/database.ts

import { Sequelize } from 'sequelize';
import config, { DBConfig } from './config'; // Import DBConfig and config

const env = process.env.NODE_ENV || 'development';
const dbConfig: DBConfig = config[env as keyof typeof config];

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  ...(dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions }),
});

export { sequelize, Sequelize };
