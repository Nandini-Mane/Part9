// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import './App.css';

const App = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patient list when the component mounts
  useEffect(() => {
    fetch('http://localhost:3001/api/patients')
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  // Update the patient list when a new patient is added
  const handlePatientAdded = (newPatient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  return (
    <div className="App">
      <PatientForm onPatientAdded={handlePatientAdded} />
      <PatientList patients={patients} />
    </div>
  );
};

export default App;
