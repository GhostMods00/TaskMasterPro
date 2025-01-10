"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const project_model_1 = __importDefault(require("./project.model"));
const user_model_1 = __importDefault(require("./user.model"));
class ProjectMembers extends sequelize_1.Model {
}
ProjectMembers.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projects',
            key: 'id',
        },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'member',
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'ProjectMembers',
    tableName: 'ProjectMembers',
    timestamps: true,
});
ProjectMembers.belongsTo(project_model_1.default, { foreignKey: 'project_id', onDelete: 'CASCADE' });
ProjectMembers.belongsTo(user_model_1.default, { foreignKey: 'user_id', onDelete: 'CASCADE' });
exports.default = ProjectMembers;
//# sourceMappingURL=projectMembers.model.js.map