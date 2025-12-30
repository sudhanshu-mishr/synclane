import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';

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
    // Pre-check: Ensure directory exists
    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) {
      console.log(`Directory ${dir} does not exist. Attempting to create...`);
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (err) {
        if (err.code === 'EACCES') {
          console.error(`
🚨 CRITICAL ERROR: Permission Denied 🚨
The application tried to create or access the directory: '${dir}' but was denied.

ON RENDER:
1. Did you add a Persistent Disk?
2. Did you mount it to '${dir}'?
3. Did you set DB_PATH to '${storagePath}'?

If you missed adding the disk, your data will NOT persist.
Please go to your Render Dashboard -> Disks -> Add Disk.
          `);
        }
        throw err;
      }
    }

    await sequelize.authenticate();
    console.log('Connection to SQLite has been established successfully.');
    await sequelize.sync(); // Create tables if they don't exist
    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // process.exit(1) is usually handled by the main process, but here we just log.
    // Throwing ensures the app knows it failed.
    throw error;
  }
}

export { sequelize };
