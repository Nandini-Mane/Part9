import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ... inside your form structure ...

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Sickleave start"
    // Set format to match dd.mm.yyyy, though the internal value will be a Date object
    format="DD.MM.YYYY" 
    slotProps={{ 
      textField: { 
        fullWidth: true, 
        margin: 'normal',
        // Type date input enforces valid date format
        type: 'date' 
      } 
    }}
    // value={startDate} // Controlled by form state
    // onChange={(newDate) => setStartDate(newDate)} // Update form state
  />
</LocalizationProvider>