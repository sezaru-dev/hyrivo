// lib/db.ts
import mongoose, { Mongoose } from "mongoose";
import { env } from "@/utils/env";

const MONGODB_URI = env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

// Define a type for the cached object
type MongooseCached = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Use globalThis for Next.js to avoid "any"
declare global {
  // eslint-disable-next-line no-var
  var mongooseCached: MongooseCached | undefined;
}

let cached: MongooseCached;

if (!globalThis.mongooseCached) {
  cached = { conn: null, promise: null };
  globalThis.mongooseCached = cached;
} else {
  cached = globalThis.mongooseCached;
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn; // Use existing connection
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: env.MONGO_DB,
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);

    mongoose.set("strictQuery", true);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
