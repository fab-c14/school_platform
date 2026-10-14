import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

function clientPromise() {
  if (!uri) {
    throw new Error("Set MONGODB_URI in .env.local");
  }

  const globalForMongo = globalThis as typeof globalThis & {
    _mongoClient?: Promise<MongoClient>;
  };

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri).connect();
  }

  return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(process.env.MONGODB_DB || "xyz_school");
}
