// src/models/user.model.ts

import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the import path as necessary

class User extends Model {
  static associate(models: any) {
    User.hasMany(models.ProjectMember, { foreignKey: 'userId', as: 'projectMembers' });
  }

  static initModel(sequelize: Sequelize) {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
      }
    );
  }
}

export default User;