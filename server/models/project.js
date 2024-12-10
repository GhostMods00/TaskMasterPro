// models/project.js
const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('planning', 'active', 'completed', 'on-hold'),
    defaultValue: 'planning'
  },
  dueDate: DataTypes.DATE
});