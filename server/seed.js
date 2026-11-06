import { MongoClient } from "mongodb";
import { assets, digs } from "../client/src/data/sampleData.js";

const assetCards = assets.features.map((f) => ({
  ...f.properties,
  installed: new Date(f.properties.installed),
  geometry: f.geometry,
}));

const digCards = digs.features.map((f) => ({
  ...f.properties,
  start: new Date(f.properties.start),
  end: new Date(f.properties.end),
  conflicts: [],
  geometry: f.geometry,
}));

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const db = client.db("digsystem");

  await db.collection("assets").deleteMany({});
  await db.collection("digs").deleteMany({});

  const a = await db.collection("assets").insertMany(assetCards);
  const d = await db.collection("digs").insertMany(digCards);
  await db.collection("assets").createIndex({ geometry: "2dsphere" });
  await db.collection("digs").createIndex({ geometry: "2dsphere" });

  console.log("assets saved:", a.insertedCount);
  console.log("digs saved:", d.insertedCount);
} finally {
  await client.close();
}
