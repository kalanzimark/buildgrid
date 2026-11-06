import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const db = client.db("digsystem");

  const dig = await db
    .collection("digs")
    .findOne({ purpose: "Install fibre branch line" });

  const crossed = await db
    .collection("assets")
    .find({
      geometry: {
        $geoIntersects: { $geometry: dig.geometry },
      },
    })
    .toArray();

  console.log("Dig:", dig.purpose);
  console.log(crossed.map((a) => `${a.type} (${a.owner})`));
} finally {
  await client.close();
}
