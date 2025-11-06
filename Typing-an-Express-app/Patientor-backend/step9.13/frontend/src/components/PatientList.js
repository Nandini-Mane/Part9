// frontend/src/components/PatientList.js
import React from 'react';

const PatientList = ({ patients }) => {
  return (
    <div>
      <h2>Patient List</h2>
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
              <td>❤️❤️❤️❤️</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
