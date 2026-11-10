import express from "express";
import cors from "cors";
import { db } from "./db.js";
import { toFeature, toFeatureCollection } from "./geojson.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ ok: true, message: "waiter is here" });
});

app.get("/api/assets", async (req, res) => {
  const docs = await db.collection("assets").find().toArray();
  res.json(toFeatureCollection(docs));
});

app.get("/api/digs", async (req, res) => {
  const docs = await db.collection("digs").find().toArray();
  res.json(toFeatureCollection(docs));
});

app.post("/api/digs", async (req, res) => {
  try {
    const { purpose, start, end, geometry } = req.body;

    if (!purpose || !start || !end || !geometry) {
      return res
        .status(400)
        .json({ error: "purpose, start, end and geometry are required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate) || endDate < startDate) {
      return res.status(400).json({ error: "dates are invalid" });
    }

    if (!["LineString", "Polygon"].includes(geometry.type)) {
      return res
        .status(400)
        .json({ error: "geometry must be a LineString or Polygon" });
    }

    const doc = {
      purpose,
      start: startDate,
      end: endDate,
      status: "pending",
      conflicts: [],
      geometry,
    };

    await db.collection("digs").insertOne(doc);
    res.status(201).json(toFeature(doc));
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "could not save the dig" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
