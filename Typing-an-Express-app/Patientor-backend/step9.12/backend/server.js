// backend/server.js
const express = require('express');
const cors = require('cors');
const { v1: uuid } = require('uuid'); // Import UUID
const app = express();

// Middleware to parse JSON request body
app.use(cors());
app.use(express.json()); // For parsing application/json

// Dummy data for patients (you can store this in a database later)
let patients = [
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

// POST endpoint to add a new patient
app.post('/api/patients', (req, res) => {
  const { name, dateOfBirth, gender, occupation } = req.body;

  if (!name || !dateOfBirth || !gender || !occupation) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newPatient = {
    id: uuid(),  // Generate a unique ID for the new patient
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn: 'N/A'  // You can leave SSN as 'N/A' for now or omit it from the response
  };

  patients.push(newPatient);  // Add the new patient to the list
  res.status(201).json(newPatient);  // Respond with the newly added patient
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
