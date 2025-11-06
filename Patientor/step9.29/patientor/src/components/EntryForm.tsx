// src/components/EntryForm.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


interface EntryFormProps {
  onSubmit: (entry: any) => void;
  diagnosisCodes: string[];
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, diagnosisCodes }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !description || !specialist) return alert("Fill all required fields");

    onSubmit({
      description,
      date: date.format('YYYY-MM-DD'),
      specialist,
      healthCheckRating,
      diagnosisCodes: selectedCodes
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <DatePicker
        label="Date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
        slotProps={{ textField: { fullWidth: true } }}
      />

      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        required
      />

      <TextField
        select
        label="Healthcheck Rating"
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
      >
        {[0, 1, 2, 3].map((rating) => (
          <MenuItem key={rating} value={rating}>
            {rating}
          </MenuItem>
        ))}
      </TextField>

      <FormControl>
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          value={selectedCodes}
          onChange={(e) => setSelectedCodes(e.target.value as string[])}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              <Checkbox checked={selectedCodes.indexOf(code) > -1} />
              <ListItemText primary={code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </Box>
  );
};

export default EntryForm;
