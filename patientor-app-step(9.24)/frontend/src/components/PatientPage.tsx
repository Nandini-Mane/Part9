<<<<<<< HEAD
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { type Patient, Gender } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${API_BASE_URL}/patients/${id}`);
        setPatient(data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchPatient();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!patient) return <div>Loading patient details...</div>;

  const genderIcon = patient.gender === Gender.Male ? '♂' : (patient.gender === Gender.Female ? '♀' : '⚥');

  return (
    <div>
      <h2>{patient.name} {genderIcon}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      
      <h3>entries</h3>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

=======
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { type Patient, Gender } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${API_BASE_URL}/patients/${id}`);
        setPatient(data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchPatient();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!patient) return <div>Loading patient details...</div>;

  const genderIcon = patient.gender === Gender.Male ? '♂' : (patient.gender === Gender.Female ? '♀' : '⚥');

  return (
    <div>
      <h2>{patient.name} {genderIcon}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      
      <h3>entries</h3>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
export default PatientPage;