"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const project_model_1 = __importDefault(require("./project.model"));
const task_model_1 = __importDefault(require("./task.model"));
const user_model_1 = __importDefault(require("./user.model"));
const config_1 = __importDefault(require("../config/config"));
const env = process.env.NODE_ENV || 'development';
const dbConfig = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, Object.assign({ host: dbConfig.host, dialect: dbConfig.dialect, logging: dbConfig.logging }, (dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions })));
const db = {};
const basename = path_1.default.basename(__filename);
fs_1.default.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file)).default;
    if (model.initModel) {
        db[model.name] = model.initModel(sequelize);
    }
    else {
        db[model.name] = model(sequelize);
    }
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.Project = project_model_1.default.initModel(sequelize);
db.Task = task_model_1.default.initModel(sequelize);
db.User = user_model_1.default.initModel(sequelize);
if (db.Project.associate)
    db.Project.associate(db);
if (db.Task.associate)
    db.Task.associate(db);
if (db.User.associate)
    db.User.associate(db);
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map