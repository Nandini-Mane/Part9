// src/types.ts (Example structure - Ensure this is correctly defined)

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  entries: Entry[];
}

// Example for a HealthCheckEntry type, which you are adding
export interface HealthCheckEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  type: 'HealthCheck';
  healthCheckRating: number; // Must be a number (0, 1, 2, or 3)
  diagnosisCodes?: string[];
}

export type Entry = HealthCheckEntry; // Add other entry types (Hospital, OccupationalHealthcare) later