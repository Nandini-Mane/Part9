import express, { Request, Response } from 'express';
import cors from 'cors';
import { v1 as uuid } from 'uuid';
import { Gender, PatientSchema, Patient } from './models/patient.model';

const app = express();
app.use(cors());
app.use(express.json());

// Dummy patient data
let patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '123-45-6789',
    gender: Gender.Male,
    occupation: 'New York City Cop',
  },
  {
    id: 'd2773958-f723-11e9-8f0b-362b9e155668',
    name: 'Dana Scully',
    dateOfBirth: '1990-02-22',
    ssn: '987-65-4321',
    gender: Gender.Female,
    occupation: 'Forensic Pathologist',
  },
];

// GET route
app.get('/api/patients', (_req: Request, res: Response) => {
  res.json(patients);
});

// POST route
app.post('/api/patients', (req: Request, res: Response) => {
  const result = PatientSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }
  const newPatient: Patient = { ...result.data, id: uuid() };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
