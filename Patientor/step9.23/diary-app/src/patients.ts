// src/patients.ts (or wherever patient data is stored)
// src/patients.ts (or wherever patient data is stored)
import type { Entry, HospitalEntry, OccupationalHealthcareEntry } from './types';

const patients = [
  {
    id: "1",
    name: "John Doe",
    entries: [
      {
        id: "e1",
        type: "Hospital",
        description: "Appendectomy",
        date: "2025-11-05",
        specialist: "Dr. Smith",
        discharge: {
          date: "2025-11-10",
          criteria: "Healing well",
        },
      } as HospitalEntry,
      {
        id: "e2",
        type: "OccupationalHealthcare",
        description: "Back pain",
        date: "2025-10-20",
        specialist: "Dr. Jane",
        employerName: "ACME Corp",
      } as OccupationalHealthcareEntry,
    ] as Entry[],
  },
];

export default patients;
