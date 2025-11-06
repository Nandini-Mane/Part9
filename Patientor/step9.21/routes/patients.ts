<<<<<<< HEAD
import express from 'express';
import patientorEntry from '../data/patients';
import { Patient } from '../routes/types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientorEntry);
});

router.get('/:id', (req, res) => {
  const patient: Patient | undefined = patientorEntry.find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

export default router;
=======
import express from 'express';
import patientorEntry from '../data/patients';
import { Patient } from '../routes/types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientorEntry);
});

router.get('/:id', (req, res) => {
  const patient: Patient | undefined = patientorEntry.find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

export default router;
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
