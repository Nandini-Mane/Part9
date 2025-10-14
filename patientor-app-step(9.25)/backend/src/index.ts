import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const diagnoses = [
  { code: 'Z57.1', name: 'Occupational exposure to radiation', latin: '' },
  { code: 'Z74.3', name: 'Need for continuous supervision', latin: '' },
  { code: 'M51.2', name: 'Other specified intervertebral disc displacement', latin: '' }
];

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});