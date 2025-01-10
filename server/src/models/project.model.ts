import { Model, DataTypes, Sequelize } from 'sequelize';

class Project extends Model {
  static initModel(sequelize: Sequelize) {
    return Project.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Untitled Project',
        },
        description: {
          type: DataTypes.TEXT,
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        due_date: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'Project',
        tableName: 'Projects',
        timestamps: true, // Enable Sequelize-managed createdAt and updatedAt
      }
    );
  }
}

export default Project;
