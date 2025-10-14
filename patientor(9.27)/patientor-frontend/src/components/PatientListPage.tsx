import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Patient } from "../types";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients }: Props) => {
  return (
    <div style={{ padding: "10px" }}>
      <Typography variant="h4" style={{ marginBottom: "1em" }}>
        Patient List
      </Typography>
      {patients.map(patient => (
        <Box key={patient.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <Typography variant="h6">
            <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
          </Typography>
          <Typography>{patient.ssn}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default PatientListPage;
