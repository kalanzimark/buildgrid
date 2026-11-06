import express from "express";
import cors from "cors";
import { db } from "./db.js";
import { toFeatureCollection } from "./geojson.js";

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

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
