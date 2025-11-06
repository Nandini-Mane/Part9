// src/index.ts
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/diaries", (_req, res) => {
  res.json([{ id: 1, date: "2025-11-05", weather: "sunny", visibility: "good" }]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
