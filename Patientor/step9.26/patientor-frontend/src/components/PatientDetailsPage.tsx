import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';

import AddEntryForm from '../AddEntryForm';

const PatientDetailsPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');
  
  const { id } = useParams<{ id: string }>(); 

  const fetchPatient = async () => {
    if (!id) return;
    try {
      const { data: patientData } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(patientData);
    } catch (e) {
      console.error("Error fetching patient details:", e);
    }
  };

  useEffect(() => {
    void fetchPatient();
  }, [id]);

  const handleSuccess = () => {
    void fetchPatient();
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (!patient) return <div>Loading patient details...</div>;

  return (
    <div>
      <h1>{patient.name} {patient.gender === 'male' ? '♂' : '♀'}</h1>
      <p>ssn {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      
      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginTop: '10px' }}>
          {error} 
        </div>
      )}
      
      <AddEntryForm 
        patientId={id!}
        onSuccess={handleSuccess}
        onError={handleError}
      />
      
      <h2>Entries</h2>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>{entry.date} - {entry.description}</p>
          <p>Diagnosed by {entry.specialist}</p>
        </div>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
