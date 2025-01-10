// src/models/projectMembers.model.ts

import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import path as needed
import Project from './project.model';
import User from './user.model';

class ProjectMember extends Model {
  static associate(models: any) {
    // Define associations here
    ProjectMember.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    ProjectMember.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
  }

  static initModel(sequelize: Sequelize) {
    return ProjectMember.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'ProjectMember',
        tableName: 'ProjectMembers',
        timestamps: true,
      }
    );
  }
}

export default ProjectMember;