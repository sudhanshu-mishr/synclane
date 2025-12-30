import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
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
