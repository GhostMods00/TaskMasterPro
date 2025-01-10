"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const config_1 = __importDefault(require("./config"));
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, Object.assign({ host: dbConfig.host, dialect: dbConfig.dialect, logging: dbConfig.logging }, (dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions })));
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map