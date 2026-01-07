import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import letterRoutes from "./routes/letterRoutes.js";
import "./scheduler.js";

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/letters", letterRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.send("OK");
});

// mongo
const CONN_URL = process.env.MONGO_URI;
if (!CONN_URL) {
  console.error("MONGO_URI missing");
  process.exit(1);
}

mongoose
  .connect(CONN_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
