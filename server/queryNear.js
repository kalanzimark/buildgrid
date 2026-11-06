import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

try {
  await client.connect();
  const assets = client.db("digsystem").collection("assets");

  const spot = { type: "Point", coordinates: [32.579, 0.315] };

  const found = await assets
    .find({
      geometry: {
        $near: {
          $geometry: spot,
          $maxDistance: 250,
        },
      },
    })
    .toArray();

  console.log(found.map((a) => `${a.type} (${a.owner})`));
} finally {
  await client.close();
}
