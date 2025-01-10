"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
    static associate(models) {
        Task.belongsTo(models.Project, { foreignKey: 'projectId' });
        Task.belongsTo(models.User, { foreignKey: 'assigneeId' });
    }
    static initModel(sequelize) {
        return Task.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: 'todo',
            },
            projectId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            assigneeId: {
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            sequelize,
            modelName: 'Task',
            tableName: 'Tasks',
            timestamps: true,
        });
    }
}
exports.default = Task;
//# sourceMappingURL=task.model.js.map