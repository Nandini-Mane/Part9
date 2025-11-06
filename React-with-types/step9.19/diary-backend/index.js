// Import modules
import express from "express";
import cors from "cors";

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory diary entries
let diaryEntries = [
  { id: 1, date: "2025-11-05", weather: "sunny", visibility: "great", comment: "Had a wonderful day!" },
  { id: 2, date: "2025-11-04", weather: "cloudy", visibility: "ok", comment: "It rained a little." }
];

// GET all diary entries
app.get("/api/diaries", (req, res) => {
  res.json(diaryEntries);
});

// POST new diary entry
app.post("/api/diaries", (req, res) => {
  const newEntry = req.body;

  // Basic validation
  if (!newEntry.date || !newEntry.weather || !newEntry.visibility) {
    return res.status(400).json({ error: "Date, weather, and visibility are required" });
  }

  const newId = diaryEntries.length > 0 ? Math.max(...diaryEntries.map(e => e.id)) + 1 : 1;
  const entryToAdd = { ...newEntry, id: newId };
  diaryEntries.push(entryToAdd);

  res.status(201).json(entryToAdd);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
