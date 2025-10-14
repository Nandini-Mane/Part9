// types/entryTypes.ts

// types/entryTypes.ts
import type { PatientId } from './patientTypes'; // Assuming patientTypes is in the same directory
 // Assuming patientTypes is in the same directory

/**
 * Type alias for the specific types of medical entries allowed in the system.
 */
export type EntryType = 'note' | 'log' | 'result' | 'vitals';

/**
 * Defines the complete structure of a medical Entry record returned by the API.
 */
export interface Entry {
    id: number;
    patientId: PatientId; // Foreign key linking to the patient
    date: string;       // ISO date string (YYYY-MM-DD) of when the entry was recorded
    content: string;    // The detailed text or data of the entry
    type: EntryType;    // The category of the entry
    createdAt: string; // Timestamp of creation
}

/**
 * Defines the structure for creating a new Entry.
 * It excludes the server-generated fields (id, createdAt).
 */
export interface NewEntry {
    patientId: PatientId;
    date: string;
    content: string;
    type: EntryType;
}

/**
 * Defines the structure for updating an existing Entry.
 * All fields are optional because a partial update (PATCH) might be used.
 */
export type UpdateEntry = Partial<NewEntry>;