import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { type Patient } from '../types';

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
        
        // Add mocked data to display detailed patient info
        if (data.name === 'Priya Verma') {
          setPatient({
            ...data,
            age: 28, 
            gender: 'Female',
            phone: '9123456780',
            email: 'priya.verma@example.com',
            address: 'Pune, India',
            diagnosis: 'Diabetes Type 2',
            treatment: 'Insulin therapy',
            lastVisit: '2025-09-14',
          });
        } else if (data.name === 'Aarav Sharma') {
          setPatient({
            ...data,
            age: 30,
            gender: 'Male',
            phone: '9876543210',
            email: 'aarav.sharma@example.com',
            address: 'Mumbai, India',
            diagnosis: 'Hypertension',
            treatment: 'Medication',
            lastVisit: '2025-09-10',
          });
        } else if (data.name === 'Rohan Patil') {
            // New block for Rohan Patil
            setPatient({
                ...data,
                age: 40,
                gender: 'Male',
                phone: '8765432109',
                email: 'rohan.patil@example.com',
                address: 'Bangalore, India',
                diagnosis: 'Asthma',
                treatment: 'Inhaler therapy',
                lastVisit: '2025-09-12',
            });
        }
        else {
          setPatient(data);
        }
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

  return (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender && <p><strong>Gender:</strong> {patient.gender}</p>}
      {patient.age && <p><strong>Age:</strong> {patient.age}</p>}
      {patient.phone && <p><strong>Phone:</strong> {patient.phone}</p>}
      {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
      {patient.address && <p><strong>Address:</strong> {patient.address}</p>}
      {patient.diagnosis && <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>}
      {patient.treatment && <p><strong>Treatment:</strong> {patient.treatment}</p>}
      {patient.lastVisit && <p><strong>Last Visit:</strong> {patient.lastVisit}</p>}
    </div>
  );
};

export default PatientPage;