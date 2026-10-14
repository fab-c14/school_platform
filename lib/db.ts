import { MongoClient, type Db } from "mongodb";

export function mongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

function clientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Set MONGODB_URI in the Vercel project environment.");
  }

  const globalForMongo = globalThis as typeof globalThis & {
    _mongoClient?: Promise<MongoClient>;
  };

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    }).connect();
  }

  return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(process.env.MONGODB_DB || "xyz_school");
}
