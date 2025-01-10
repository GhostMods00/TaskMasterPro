"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
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
exports.default = config;
//# sourceMappingURL=config.js.map