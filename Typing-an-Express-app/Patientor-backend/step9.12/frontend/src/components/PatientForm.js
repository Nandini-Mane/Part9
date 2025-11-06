// frontend/src/components/PatientForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './PatientForm.css'; // Optional, for styling

const PatientForm = ({ onPatientAdded }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPatient = { name, dateOfBirth, gender, occupation };

    axios
      .post('http://localhost:3001/api/patients', newPatient)
      .then((response) => {
        alert('Patient added successfully!');
        onPatientAdded(response.data); // Notify the parent component
        setName('');
        setDateOfBirth('');
        setGender('');
        setOccupation('');
      })
      .catch((error) => {
        console.error('Error adding patient:', error);
        alert('Failed to add patient');
      });
  };

  return (
    <div className="patient-form">
      <h2>Add a New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Occupation:</label>
          <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
