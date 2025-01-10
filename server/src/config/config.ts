// server/src/config/config.ts

import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean | ((msg: string) => void);
  dialectOptions?: {
    ssl?: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

export interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}


const config : Config = {
  development: {
    username: process.env.DB_USER || 'dgold',
    password: process.env.DB_PASSWORD || 'Qazwsx!@12',
    database: process.env.DB_NAME || 'taskmaster',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres', 
    logging: console.log,
  },
  
test: {
    username: process.env.DB_USER || 'dgold',
    password: process.env.DB_PASSWORD || 'Qazwsx!@12',
    database: process.env.TEST_DB_NAME || 'taskmaster_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  
production: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
