import express from 'express';
import cors from 'cors';
import { Patient, Gender } from './types';

const app = express();
app.use(express.json());
app.use(cors());

// Updated mock patient data with entries for all patients
const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'Aarav Sharma',
    ssn: '150295-321',
    occupation: 'Engineer',
    gender: Gender.Male,
    dateOfBirth: '1995-02-15',
    entries: [
      {
        id: "d8112-f432-11e9-8e42-1212122111",
        date: "2020-05-15",
        specialist: "Dr. Jane Smith",
        type: "HealthCheck",
        description: "Patient complains of persistent cough and fatigue. Suspects seasonal allergies.",
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'd27734a8-f723-11e9-8f0b-362b9e155667',
    name: 'Priya Verma',
    ssn: '200597-456',
    occupation: 'Doctor',
    gender: Gender.Female,
    dateOfBirth: '1997-05-20',
    entries: [
      {
        id: "d8112-f432-11e9-8e42-1212122113",
        date: "2021-03-22",
        specialist: "Dr. Michael Ross",
        type: "Hospital",
        description: "Patient admitted for appendectomy. Post-operative recovery is good.",
        diagnosisCodes: ["K35.8", "T81.4"],
        discharge: {
          date: "2021-03-24",
          criteria: "Patient stable and pain-free.",
        },
      },
    ],
  },
  {
    id: 'd2773660-f723-11e9-8f0b-362b9e155667',
    name: 'Rohan Patil',
    ssn: '101185-789',
    occupation: 'Teacher',
    gender: Gender.Male,
    dateOfBirth: '1985-11-10',
    entries: [
      {
        id: "d8112-f432-11e9-8e42-1212122114",
        date: "2022-01-10",
        specialist: "Dr. Emily Clark",
        type: "OccupationalHealthCare",
        employerName: "St. Mary's School",
        description: "Routine check-up. No major concerns.",
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    ssn: '300179-777A',
    occupation: 'Cop',
    gender: Gender.Male,
    dateOfBirth: '1979-01-30',
    entries: [
      {
        id: "d8112-f432-11e9-8e42-1212122112",
        date: "2019-08-05",
        specialist: "Dr. Gregory House",
        type: "HealthCheck",
        description: "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.",
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
        healthCheckRating: 0,
      }
    ]
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
});