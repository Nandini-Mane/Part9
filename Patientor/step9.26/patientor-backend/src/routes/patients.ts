import { Patient } from "../src/types";

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John Doe",
    dateOfBirth: "1995-01-01",
    ssn: "010195-711X",
    gender: "male",
    occupation: "Software Developer",
    entries: [
      {
        id: "d81184aa-b4f8-41b4-b16f-b258661660f9",
        description: "Patient was a bit anxious today. Symptoms include a slight fever and stomach pain.",
        date: "2019-05-01",
        specialist: "Dr. Gregory House",
        diagnosisCodes: [
          "M24.2",
          "M51.2"
        ],
        type: "HealthCheck",
        healthCheckRating: 0
      },
      {
        id: "d81184aa-b4f8-41b4-b16f-b258661660f8",
        description: "Patient has suffered a minor injury in a traffic accident.",
        date: "2019-05-01",
        specialist: "Dr. Gregory House",
        type: "OccupationalHealthcare",
        employerName: "Google",
        sickLeave: {
            startDate: "2019-05-01",
            endDate: "2019-05-05"
        }
      },
      {
        id: "d81184aa-b4f8-41b4-b16f-b258661660f7",
        description: "Patient diagnosed with pneumonia.",
        date: "2019-05-01",
        specialist: "Dr. Gregory House",
        type: "Hospital",
        discharge: {
            date: "2019-05-05",
            criteria: "Patient is healthy."
        }
      }
    ]
  },
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155668",
    name: "Jane Doe",
    dateOfBirth: "1995-01-01",
    ssn: "010195-712X",
    gender: "female",
    occupation: "CEO",
    entries: [
      {
        id: "d81184aa-b4f8-41b4-b16f-b258661660f6",
        description: "Patient has suffered a minor injury at work.",
        date: "2019-05-01",
        specialist: "Dr. Gregory House",
        type: "OccupationalHealthcare",
        employerName: "Microsoft",
      }
    ]
  },
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155669",
    name: "Peter Smith",
    dateOfBirth: "1995-01-01",
    ssn: "010195-713X",
    gender: "male",
    occupation: "Software Developer",
    entries: []
  }
];

export default patients;
