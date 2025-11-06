// src/PatientPage.tsx (Example Integration)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from './types';
import AddEntryForm from './AddEntryForm';

const PatientPage: React.FC = () => {
  // ... state for patient data
  const [patient, setPatient] = useState<Patient | null>(null); 
  const [error, setError] = useState('');
  const patientId = 'd2773336-f723-11e9-8f0b-362b9e155667'; // Get from route params

  const fetchPatient = async () => {
    try {
      const { data: patientData } = await axios.get<Patient>(
        `/api/patients/${patientId}`
      );
      setPatient(patientData);
    } catch (e) {
      console.error(e);
      // Handle error fetching patient
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  const handleSuccess = () => {
    // This function runs on a successful entry submission.
    // It refreshes the patient data to show the new entry.
    fetchPatient();
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };
  
  // ... rest of the component
  
  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      {/* Patient info like John McClane, ssn, occupation */}
      <h1>{patient.name}</h1>
      
      {/* ERROR MESSAGE DISPLAY */}
      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
          Value of healthCheckRating incorrect: {error} 
          {/* Your error display based on the image */}
        </div>
      )}
      
      {/* THE NEW FORM COMPONENT */}
      <AddEntryForm 
        patientId={patientId}
        onSuccess={handleSuccess}
        onError={handleError}
      />
      
      <h2>Entries</h2>
      {/* Map through patient.entries to display them */}
      {/* ... */}
    </div>
  );
};

export default PatientPage;