import { MongoClient } from "mongodb";

const DB_NAME = "purple_tested";
const COLLECTION = "consultation_submissions";

let clientPromise;

export function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  return uri;
}

export async function getDb() {
  if (!clientPromise) {
    const client = new MongoClient(getMongoUri());
    clientPromise = client.connect();
  }
  const client = await clientPromise;
  return client.db(DB_NAME);
}

export async function getConsultationsCollection() {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.createIndex({ email: 1 });
  await collection.createIndex({ createdAt: -1 });
  return collection;
}
