// src/services/patientService.ts
import { Entry } from "../../types";
interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  entries: Entry[];
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'John McClane',
    ssn: '090786-122X',
    occupation: 'New York City Cop',
    entries: [
      {
        description: "Healing time approx. 2 weeks. Patient doesn't remember how he got the injury.",
        date: '2015-01-02',
        specialist: 'Dr. House',
        healthCheckRating: 1,
        diagnosisCodes: ['S03.5'],
      },
    ],
  },
];

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export const addEntryToPatient = (id: string, entry: Entry): void => {
  const patient = getPatientById(id);
  if (patient) {
    patient.entries.push(entry);
  }
};
