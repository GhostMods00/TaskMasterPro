import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: number;
  assigneeId?: number;
  startDate?: Date;
  dueDate?: Date;
  estimatedHours?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'todo' | 'in-progress' | 'review' | 'done';
  public priority!: 'low' | 'medium' | 'high';
  public projectId!: number;
  public assigneeId!: number;
  public startDate!: Date;
  public dueDate!: Date;
  public estimatedHours!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
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
      type: DataTypes.ENUM('todo', 'in-progress', 'review', 'done'),
      defaultValue: 'todo',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigneeId: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    estimatedHours: {
      type: DataTypes.DECIMAL(5, 2),
    },
  },
  {
    sequelize,
    modelName: 'Task',
  }
);