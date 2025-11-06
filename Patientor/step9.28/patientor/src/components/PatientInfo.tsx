// src/components/PatientInfo.tsx
import React from 'react';
import { Typography, Divider } from '@mui/material';
import EntryList from './EntryList';
import { Entry } from '../types';

interface PatientInfoProps {
  name: string;
  ssn: string;
  occupation: string;
  entries: Entry[];
}

const PatientInfo: React.FC<PatientInfoProps> = ({ name, ssn, occupation, entries }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Typography variant="h5" gutterBottom>{name}</Typography>
      <Typography>SSN: {ssn}</Typography>
      <Typography>Occupation: {occupation}</Typography>
      <Divider sx={{ margin: '1rem 0' }} />
      <EntryList entries={entries} />
    </div>
  );
};

export default PatientInfo;
