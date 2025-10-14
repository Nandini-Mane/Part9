// src/App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material'; // Assuming you use Material UI

// Import your components
import PatientListPage from '../src/components/PatientListPage'; 
import PatientDetailsPage from './components/PatientDetailsPage'; // A component to render the patient details and form
import { apiBaseUrl } from './constants'; 
import { Patient } from './types'; // Your patient types

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  // Configure axios base URL
  const [isApiWorking, setIsApiWorking] = useState(false);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)
      .then(() => setIsApiWorking(true))
      .catch(() => console.log('API is not responding'));
    
    // Fetch patient list to populate state
    void axios.get<Patient[]>(`${apiBaseUrl}/patients`)
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch patients:", error);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          
          <Routes>
            {/* Route for the patient list (optional, often combined with Home) */}
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            
            {/* Route for individual patient details (where your form lives) */}
            {/* The :id part is crucial for routing to the correct patient */}
            <Route path="/patients/:id" element={<PatientDetailsPage />} /> 
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;