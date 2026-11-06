import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const assets = client.db("digsystem").collection("assets");

  const result = await assets.insertOne({
    type: "water_main",
    owner: "NWSC",
    depth_m: 1.2,
    installed: new Date("2018-03-14"),
    accuracy: "surveyed",
    geometry: {
      type: "LineString",
      coordinates: [
        [32.575, 0.31],
        [32.58, 0.3136],
        [32.585, 0.317],
      ],
    },
  });

  console.log("Saved with id:", result.insertedId);
} finally {
  await client.close();
}
