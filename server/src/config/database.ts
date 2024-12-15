import { Sequelize } from 'sequelize';
import { CONFIG } from './config';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: CONFIG.DATABASE.HOST,
  port: CONFIG.DATABASE.PORT,
  username: CONFIG.DATABASE.USER,
  password: CONFIG.DATABASE.PASSWORD,
  database: CONFIG.DATABASE.NAME,
  logging: CONFIG.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: CONFIG.NODE_ENV === 'production' 
      ? {
          require: true,
          rejectUnauthorized: false
        } 
      : false
  }
});