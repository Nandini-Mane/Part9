<<<<<<< HEAD
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
=======
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
>>>>>>> 534f0d7baea23ffd5e45702c2883bd7b03e6f974
export type PublicPatient = Omit<Patient, 'ssn'>;