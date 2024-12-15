import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface ProjectAttributes {
  id: number;
  title: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate?: Date;
  dueDate?: Date;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project extends Model<ProjectAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'planning' | 'active' | 'completed' | 'on-hold';
  public startDate!: Date;
  public dueDate!: Date;
  public ownerId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('planning', 'active', 'completed', 'on-hold'),
      defaultValue: 'planning',
    },
    startDate: {
      type: DataTypes.DATE,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Project',
  }
);