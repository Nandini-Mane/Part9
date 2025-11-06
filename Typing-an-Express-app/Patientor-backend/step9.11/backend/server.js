// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS to allow frontend access
app.use(cors());

// Dummy data for patients
const patients = [
  { id: 'd2773336-f723-11e9-8f0b-362b9e155667', name: 'John McClane', dateOfBirth: '1986-07-09', gender: 'male', occupation: 'New york city cop', ssn: '123-45-6789' },
  { id: 'd2773958-f723-11e9-8f0b-362b9e155667', name: 'Martin Riggs', dateOfBirth: '1985-03-15', gender: 'male', occupation: 'Cop', ssn: '234-56-7890' },
  { id: 'd2773958-f723-11e9-8f0b-362b9e155668', name: 'Hans Gruber', dateOfBirth: '1980-11-25', gender: 'male', occupation: 'Technician', ssn: '345-67-8901' },
  { id: 'd2773958-f723-11e9-8f0b-362b9e155669', name: 'Dana Scully', dateOfBirth: '1990-02-22', gender: 'female', occupation: 'Forensic Pathologist', ssn: '456-78-9012' }
];

// GET endpoint to fetch patients excluding SSN
app.get('/api/patients', (req, res) => {
  const patientsWithoutSSN = patients.map(({ ssn, ...patient }) => patient);
  res.json(patientsWithoutSSN);
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
