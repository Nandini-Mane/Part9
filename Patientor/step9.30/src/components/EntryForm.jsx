import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const diagnosisCodes = [
  'A01', 'B02', 'C03', 'D04', 'E05' // Example codes
];

const healthRatings = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'Medium Risk' },
  { value: 3, label: 'High Risk' }
];

export default function EntryForm() {
  const [date, setDate] = useState(null);
  const [codes, setCodes] = useState([]);
  const [healthRating, setHealthRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ date, codes, healthRating });
    alert('Entry Submitted! Check console.');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, margin: 'auto', marginTop: 5 }}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} required />}
        />

        <FormControl>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={codes}
            onChange={(e) => setCodes(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
            required
          >
            {diagnosisCodes.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Health Rating</InputLabel>
          <Select
            value={healthRating}
            onChange={(e) => setHealthRating(e.target.value)}
            required
          >
            {healthRatings.map((rating) => (
              <MenuItem key={rating.value} value={rating.value}>
                {rating.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">Submit Entry</Button>
      </Box>
    </LocalizationProvider>
  );
}
