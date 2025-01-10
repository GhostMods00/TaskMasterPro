// src/models/index.ts

import { Sequelize } from 'sequelize';
import Project from './project.model';
import Task from './task.model';
import User from './user.model';
import ProjectMember from './projectMembers.model';
import config from '../config/config'; // Database configuration

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  ...(dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions }),
});

// Initialize models
const db: { [key: string]: any } = {};

db.Project = Project.initModel(sequelize);
db.Task = Task.initModel(sequelize);
db.User = User.initModel(sequelize);
db.ProjectMember = ProjectMember.initModel(sequelize);

// Setup associations
if (db.Project.associate) db.Project.associate(db);
if (db.Task.associate) db.Task.associate(db);
if (db.User.associate) db.User.associate(db);
if (db.ProjectMember.associate) db.ProjectMember.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
