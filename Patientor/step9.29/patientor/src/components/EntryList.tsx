// src/components/EntryList.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Entry } from '../types';

interface EntryListProps {
  entries: Entry[];
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <Typography>No entries available.</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Entries
      </Typography>
      {entries.map((entry, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              {entry.date} — {entry.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Specialist: {entry.specialist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Health Rating: {entry.healthCheckRating}
            </Typography>
            {entry.diagnosisCodes && (
              <Typography variant="body2" color="text.secondary">
                Codes: {entry.diagnosisCodes.join(', ')}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EntryList;
