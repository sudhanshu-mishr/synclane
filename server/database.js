import { Sequelize } from 'sequelize';
import path from 'path';

// Use DB_PATH environment variable if available, otherwise default to local file
const storagePath = process.env.DB_PATH || './database.sqlite';

console.log(`Using database storage at: ${storagePath}`);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false // Set to console.log to see SQL queries
});

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQLite has been established successfully.');
    await sequelize.sync(); // Create tables if they don't exist
    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize };
