import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface PatientEntry {
  date: string;
  description: string;
  diagnosisCodes?: string[];
}

interface Patient {
  ssn: string;
  occupation: string;
  entries: PatientEntry[];
}

const PatientDetail: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    // Fetch patient data (this is static for this example)
    const patientData: Patient = {
      ssn: '300179-777A',
      occupation: 'Cop',
      entries: [
        {
          date: '2019-08-05',
          description: 'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.',
          diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2']
        }
      ]
    };
    setPatient(patientData);

    // Fetch diagnoses from the backend
    const fetchDiagnoses = async () => {
      try {
        const { data } = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses');
        setDiagnoses(data);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };
    fetchDiagnoses();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  return (
    <div>
      <h1>Patientor</h1>
      <button>Home</button>
      <h2>Martin Riggs ♂️</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <br />
      <h3>entries</h3>
      {patient.entries.map((entry, index) => (
        <div key={index}>
          <p><b>{entry.date}</b> <i>{entry.description}</i></p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetail;