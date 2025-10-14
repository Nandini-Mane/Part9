<<<<<<< HEAD
import express from 'express';
import patients from './patients'; // The mock data
import { PublicPatient } from './types'; // The utility type

const app = express();
const PORT = 3001; // The backend will run on port 3001

app.use(express.json());

// Set up the GET endpoint
app.get('/api/patients', (_req, res) => {
    // Map over the patients array and cast each patient object to the PublicPatient type.
    // This ensures that only the fields defined in PublicPatient (all fields except 'ssn') are returned.
    const publicPatients: PublicPatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    res.send(publicPatients);
});

// A simple health check endpoint
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
=======
import express from 'express';
import patients from './patients'; // The mock data
import { PublicPatient } from './types'; // The utility type

const app = express();
const PORT = 3001; // The backend will run on port 3001

app.use(express.json());

// Set up the GET endpoint
app.get('/api/patients', (_req, res) => {
    // Map over the patients array and cast each patient object to the PublicPatient type.
    // This ensures that only the fields defined in PublicPatient (all fields except 'ssn') are returned.
    const publicPatients: PublicPatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    res.send(publicPatients);
});

// A simple health check endpoint
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
});