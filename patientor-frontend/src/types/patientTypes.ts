// types/patientTypes.ts

/**
 * Defines the complete structure of a Patient record returned by the API.
 */
export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO date string (YYYY-MM-DD)
    gender: 'Male' | 'Female' | 'Other' | 'Unknown';
    contactNumber: string;
    address: string;
    createdAt: string; // Timestamp of creation
    updatedAt: string; // Timestamp of last update
}

/**
 * Defines the structure for creating a new Patient.
 * It excludes the server-generated fields (id, timestamps).
 */
export interface NewPatient {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other' | 'Unknown';
    contactNumber: string;
    address: string;
}

/**
 * Defines the structure for updating an existing Patient.
 * All fields are optional because a partial update (PATCH) might be used.
 * We can reuse the fields from NewPatient but make them all optional.
 */
export type UpdatePatient = Partial<NewPatient>;


/**
 * Optional utility type for commonly used patient identifiers.
 */
export type PatientId = number;