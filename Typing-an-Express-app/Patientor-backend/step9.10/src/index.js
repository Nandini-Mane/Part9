<<<<<<< HEAD
// src/index.ts
import express from 'express';
import cors from 'cors';
import diagnoses from './data/diagnoses';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
// src/index.ts
import express from 'express';
import cors from 'cors';
import diagnoses from './data/diagnoses';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
});