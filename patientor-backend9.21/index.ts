<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import patientorEntry from './data/patients';
import { Patient } from './routes/types';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  res.send(patientorEntry);
});

app.get('/api/patients/:id', (req, res) => {
  const patient: Patient | undefined = patientorEntry.find((p: { id: string; }): boolean => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
import express from 'express';
import cors from 'cors';
import patientorEntry from './data/patients';
import { Patient } from './routes/types';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  res.send(patientorEntry);
});

app.get('/api/patients/:id', (req, res) => {
  const patient: Patient | undefined = patientorEntry.find((p: { id: string; }): boolean => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
