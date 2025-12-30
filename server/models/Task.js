import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('todo', 'progress', 'review', 'done'),
    defaultValue: 'todo'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  assignee: {
    type: DataTypes.STRING
  },
  clanId: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  xpValue: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.STRING
  },
  labels: {
    type: DataTypes.JSON // SQLite stores this as TEXT
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  position: {
    type: DataTypes.INTEGER
  }
});
