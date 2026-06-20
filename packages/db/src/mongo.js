/**
 * @xapps/db — MongoDB Connection
 *
 * Mongoose connection manager optimized for scale.
 * Used for unstructured data like activity logs, custom dynamic forms, etc.
 */

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

/**
 * Connect to MongoDB if not already connected.
 * Uses a cached connection in development to prevent multiple connections.
 */
export async function connectMongo() {
  if (!MONGO_URI) {
    console.warn('⚠️ MONGO_URI is not defined. Skipping MongoDB connection.');
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      // Mongoose 6+ has optimal defaults, but you can add poolSize config here if needed
      maxPoolSize: 100, // Handle up to 100 concurrent connections
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`✅ MongoDB connected successfully to ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export const mongooseClient = mongoose;
