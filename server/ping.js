import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const db = client.db("digsystem");
  const reply = await db.command({ ping: 1 });
  console.log("Connected! Server said:", reply);
} finally {
  await client.close();
}
