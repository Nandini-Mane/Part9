// index.js (ES Module)
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const diaryEntries = [
  { id: 1, date: "2025-11-05", weather: "sunny", visibility: "great", comment: "Had a wonderful day!" },
  { id: 2, date: "2025-11-04", weather: "cloudy", visibility: "ok", comment: "It rained a little." },
  { id: 3, date: "2025-11-03", weather: "rainy", visibility: "poor", comment: "Stayed indoors and read a book." }
];

// GET all diaries
app.get("/api/diaries", (req, res) => {
  res.json(diaryEntries);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
