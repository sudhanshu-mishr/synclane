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
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
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
