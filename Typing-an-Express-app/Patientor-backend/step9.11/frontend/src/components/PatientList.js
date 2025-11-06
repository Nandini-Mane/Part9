// frontend/src/components/PatientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientList.css'; // Import the CSS file

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/patients')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Patient List</h1>
      <button className="button" onClick={() => window.location.reload()}>Refresh List</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Health Rating</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.occupation}</td>
              <td>❤️❤️❤️❤️</td> {/* Example health rating */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
