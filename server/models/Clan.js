import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Clan = sequelize.define('Clan', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  members: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});
