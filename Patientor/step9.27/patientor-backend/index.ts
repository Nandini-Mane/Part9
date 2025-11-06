import express from 'express';
import cors from 'cors';
import { v1 as uuid } from 'uuid';

// Define the types for our data
interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// Gender type definition
type Gender = 'male' | 'female' | 'other';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

// In-memory "database" to store our data
const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-1256",
    gender: "male",
    occupation: "New York city police detective"
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "John Rambo",
    dateOfBirth: "1984-07-07",
    ssn: "070784-1256",
    gender: "male",
    occupation: "U.S. Army"
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "John Wick",
    dateOfBirth: "1989-07-07",
    ssn: "070789-1256",
    gender: "male",
    occupation: "Assasin"
  }
];

const diagnoses: Diagnosis[] = [
  {
    code: "M24.2",
    name: "Disorder of ligament",
    latin: "Morbus ligamentum"
  },
  {
    code: "A00",
    name: "Cholera"
  },
  {
    code: "J10",
    name: "Influenza due to identified seasonal influenza virus",
    latin: "Morbus influenzae"
  }
];

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  // We can return all patient data for simplicity
  res.json(patients);
});

app.post('/api/patients', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    // Basic validation to ensure required fields exist
    if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
      return res.status(400).send({
        error: "Missing required fields: name, dateOfBirth, ssn, gender, or occupation"
      });
    }

    // Use uuid to create a unique ID
    const newId = uuid();

    const newPatient: Patient = {
      id: newId,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    };

    patients.push(newPatient);

    res.status(201).json(newPatient);

  } catch (error) {
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
