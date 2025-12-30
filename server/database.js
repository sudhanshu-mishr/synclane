import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

let mongoServer;

export async function connectDb() {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log('No MONGO_URI found, starting in-memory MongoDB...');
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log(`In-memory MongoDB started at ${mongoUri}`);
    } else {
        // Generic check for common malformed URI patterns (e.g. brackets around password)
        // Regex looks for: :<something>@
        // We do NOT fix it automatically to avoid security risks or incorrect assumptions.
        const malformedPattern = /:\<.*?\>@/;
        if (malformedPattern.test(mongoUri)) {
             console.warn(`
⚠️ WARNING: Your MONGO_URI appears to contain brackets '< >' around the password.
If this is unintentional, please remove them in your environment variables.
Example: use 'password' instead of '<password>'
             `);
        }

        console.log('Connecting to MongoDB at provided URI...');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Explicitly mentioning the EBADNAME error
    if (err.code === 'EBADNAME') {
        console.error(`
❌ DNS Error (EBADNAME): This often means your connection string is malformed.
1. Check if your password contains special characters like '@'. If so, they MUST be URL encoded (e.g., '@' -> '%40').
2. Ensure you have not included '<' or '>' brackets around your password unless they are actually part of it.
        `);
    }
    process.exit(1);
  }
}

export async function disconnectDb() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
}
