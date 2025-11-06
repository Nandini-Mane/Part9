// src/App.tsx
import React, { useState } from 'react';
import EntryForm from './components/EntryForm';
import PatientInfo from './components/PatientInfo';
import { Entry } from './types';
import { getPatients, addEntryToPatient } from './components/services/patientService';
const App: React.FC = () => {
  const [patients, setPatients] = useState(getPatients());
  const patient = patients[0]; // just show first one for simplicity

  const diagnosisCodes = ['Z57.1', 'N30.0', 'M24.2', 'J10.1'];

  const handleAddEntry = (entry: Entry) => {
    addEntryToPatient(patient.id, entry);
    setPatients([...patients]);
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Patientor</h1>
      <PatientInfo
        name={patient.name}
        ssn={patient.ssn}
        occupation={patient.occupation}
        entries={patient.entries}
      />
      <h2>Add New HealthCheck Entry</h2>
      <EntryForm onSubmit={handleAddEntry} diagnosisCodes={diagnosisCodes} />
    </div>
  );
};

export default App;
