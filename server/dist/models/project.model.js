"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
    static initModel(sequelize) {
        return Project.init({
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
                defaultValue: 'active',
            },
            start_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            due_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            owner_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Project',
            tableName: 'Projects',
            timestamps: true,
        });
    }
}
exports.default = Project;
//# sourceMappingURL=project.model.js.map