import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import Project from './project.model';
import User from './user.model';

class Task extends Model {
  static associate(models: any) {
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
    Task.belongsTo(models.User, { foreignKey: 'assigneeId' });
  }

  static initModel(sequelize: Sequelize) {
    return Task.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: 'todo',
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        assigneeId: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: 'Task',
        tableName: 'Tasks',
        timestamps: true,
      }
    );
  }
}


export default Task;
