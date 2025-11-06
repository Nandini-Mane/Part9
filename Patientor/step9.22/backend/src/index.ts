<<<<<<< HEAD
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Dummy patient data as per the prompt's request
const patients = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'Aarav Sharma',
    dateOfBirth: '1995-02-15',
    gender: 'male',
    occupation: 'Engineer',
    ssn: '150295-321',
    entries: [],
  },
  {
    id: 'd27734a8-f723-11e9-8f0b-362b9e155667',
    name: 'Priya Verma',
    dateOfBirth: '1997-05-20',
    gender: 'female',
    occupation: 'Doctor',
    ssn: '200597-456',
    entries: [],
  },
  {
    id: 'd2773660-f723-11e9-8f0b-362b9e155667',
    name: 'Rohan Patil',
    dateOfBirth: '1985-11-10',
    gender: 'male',
    occupation: 'Teacher',
    ssn: '101185-789',
    entries: [],
  },
];

// Endpoint to get all patients (basic info)
app.get('/api/patients', (_req, res) => {
  res.send(patients.map(({ id, name }) => ({ id, name })));
});

// Endpoint to get a single patient's details
app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Dummy patient data as per the prompt's request
const patients = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'Aarav Sharma',
    dateOfBirth: '1995-02-15',
    gender: 'male',
    occupation: 'Engineer',
    ssn: '150295-321',
    entries: [],
  },
  {
    id: 'd27734a8-f723-11e9-8f0b-362b9e155667',
    name: 'Priya Verma',
    dateOfBirth: '1997-05-20',
    gender: 'female',
    occupation: 'Doctor',
    ssn: '200597-456',
    entries: [],
  },
  {
    id: 'd2773660-f723-11e9-8f0b-362b9e155667',
    name: 'Rohan Patil',
    dateOfBirth: '1985-11-10',
    gender: 'male',
    occupation: 'Teacher',
    ssn: '101185-789',
    entries: [],
  },
];

// Endpoint to get all patients (basic info)
app.get('/api/patients', (_req, res) => {
  res.send(patients.map(({ id, name }) => ({ id, name })));
});

// Endpoint to get a single patient's details
app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
});