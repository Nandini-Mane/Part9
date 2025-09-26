export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    ssn: string;
}

// A utility type to create a new type by picking all fields from Patient except 'ssn'.
// 'Omit' is a built-in TypeScript utility type.
export type PublicPatient = Omit<Patient, 'ssn'>;