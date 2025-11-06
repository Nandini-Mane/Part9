import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import PatientPage from './components/PatientPage';
import { type Patient } from './types';

const API_BASE_URL = 'http://localhost:3001/api';

const PatientList = () => {
  const [patients, setPatients] = React.useState<Patient[]>([]);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get<Patient[]>(`${API_BASE_URL}/patients`);
        setPatients(data);
      } catch (e) {
        console.error('Error fetching patients:', e);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patients/:id" element={<PatientPage />} />
      </Routes>
    </Router>
  );
};

export default App;