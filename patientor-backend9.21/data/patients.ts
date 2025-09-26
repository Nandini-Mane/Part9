import express from 'express';
import { patientorEntry } from '../data/patients';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientorEntry);
});

router.get('/:id', (req, res) => {
  const patient = patientorEntry.find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

export default router;
