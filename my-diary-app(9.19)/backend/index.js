const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// In-memory array to store diary entries (for this example)
let diaryEntries = [
  {
    id: 1,
    date: '2017-01-01',
    visibility: 'poor',
    weather: 'rainy',
    comment: 'It was a rainy day.'
  },
  {
    id: 2,
    date: '2017-04-01',
    visibility: 'good',
    weather: 'sunny',
    comment: 'A beautiful sunny day.'
  }
];

// Helper function to generate an ID
const generateId = () => {
  const maxId = diaryEntries.length > 0
    ? Math.max(...diaryEntries.map(entry => entry.id))
    : 0;
  return maxId + 1;
};

// GET all diary entries
app.get('/api/diaries', (req, res) => {
  res.json(diaryEntries);
});

// POST a new diary entry with validation
app.post('/api/diaries', (req, res) => {
  const body = req.body;

  // Basic validation checks
  if (!body.date) {
    return res.status(400).send('date is missing');
  }
  if (!body.visibility) {
    return res.status(400).send('visibility is missing');
  }
  if (!body.weather) {
    return res.status(400).send('weather is missing');
  }
  if (!body.comment) {
    return res.status(400).send('comment is missing');
  }

  // Check for valid visibility values
  const validVisibilities = ['great', 'good', 'ok', 'poor'];
  if (!validVisibilities.includes(body.visibility)) {
    return res.status(400).send(`Incorrect visibility: ${body.visibility}`);
  }

  // Check for valid weather values
  const validWeathers = ['sunny', 'rainy', 'cloudy', 'windy'];
  if (!validWeathers.includes(body.weather)) {
    return res.status(400).send(`Incorrect weather: ${body.weather}`);
  }

  const newEntry = {
    id: generateId(),
    date: body.date,
    visibility: body.visibility,
    weather: body.weather,
    comment: body.comment
  };

  diaryEntries = diaryEntries.concat(newEntry);
  res.status(201).json(newEntry);
});

// GET a single diary entry by ID
app.get('/api/diaries/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = diaryEntries.find(entry => entry.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});