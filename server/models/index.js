const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db.config');

// Import models
const User = require('./user');
const Project = require('./project');
const Task = require('./task');

// Define associations
User.hasMany(Project, { foreignKey: 'owner_id' });
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

Project.hasMany(Task);
Task.belongsTo(Project);

User.hasMany(Task, { foreignKey: 'assignee_id', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignee_id', as: 'assignee' });

User.hasMany(Task, { foreignKey: 'created_by', as: 'createdTasks' });
Task.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// Project members association
Project.belongsToMany(User, { 
  through: 'project_members',
  as: 'members'
});
User.belongsToMany(Project, { 
  through: 'project_members',
  as: 'memberProjects'
});

module.exports = {
  sequelize,
  User,
  Project,
  Task
};