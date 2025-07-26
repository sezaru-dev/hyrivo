// lib/db.ts
import mongoose from 'mongoose';
import { env } from '@/utils/env';

const MONGODB_URI = env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn; // Use existing connection
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: env.MONGO_DB, // optional: customize your DB name here
      bufferCommands: false,
    });

    mongoose.set("strictQuery", true); // optional: for mongoose >=7
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
