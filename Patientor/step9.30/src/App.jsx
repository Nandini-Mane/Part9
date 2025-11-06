import React from 'react';
import EntryForm from './components/EntryForm';
import { CssBaseline, Container, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" align="center" sx={{ marginTop: 5 }}>
          Patientor Entry Form
        </Typography>
        <EntryForm />
      </Container>
    </>
  );
}

export default App;
