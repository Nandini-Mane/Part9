// src/api/patients.ts

import axios, { AxiosInstance } from 'axios';

// -----------------------------------------------------------------------------
// 1. Configuration (e.g., creating an Axios instance)
// -----------------------------------------------------------------------------

// Define the base URL for the patient-related API endpoints
const API_BASE_URL = 'http://localhost:3000/api/v1'; // Example URL - replace with your actual API base URL

// Create a configured Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Example for including a token
    },
    timeout: 10000, // Timeout after 10 seconds
});

// -----------------------------------------------------------------------------
// 2. Data Structures (Interfaces for better type safety)
// -----------------------------------------------------------------------------

/** Interface for a Patient object */
export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO date string
    // Add other relevant patient fields
}

/** Interface for creating a new Patient (without ID) */
export interface NewPatient {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    // Add other relevant fields
}

// -----------------------------------------------------------------------------
// 3. API Functions
// -----------------------------------------------------------------------------

/**
 * Fetches a list of all patients.
 * @returns A promise that resolves to an array of Patient objects.
 */
export async function fetchPatients(): Promise<Patient[]> {
    try {
        const response = await api.get<Patient[]>('/patients');
        return response.data;
    } catch (error) {
        // Handle error (e.g., logging, re-throwing a custom error)
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error fetching patients:', error.response.data);
            throw new Error(`Failed to fetch patients: ${error.response.statusText}`);
        }
        console.error('An unexpected error occurred:', error);
        throw new Error('An unknown error occurred while fetching patients.');
    }
}

/**
 * Fetches a single patient by ID.
 * @param id The ID of the patient.
 * @returns A promise that resolves to a Patient object.
 */
export async function fetchPatientById(id: number): Promise<Patient> {
    try {
        const response = await api.get<Patient>(`/patients/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error fetching patient ${id}:`, error.response.data);
            throw new Error(`Failed to fetch patient ${id}: ${error.response.statusText}`);
        }
        throw new Error(`An unknown error occurred while fetching patient ${id}.`);
    }
}

/**
 * Creates a new patient.
 * @param newPatient The data for the new patient.
 * @returns A promise that resolves to the newly created Patient object.
 */
export async function createPatient(newPatient: NewPatient): Promise<Patient> {
    try {
        const response = await api.post<Patient>('/patients', newPatient);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error creating patient:', error.response.data);
            throw new Error(`Failed to create patient: ${error.response.statusText}`);
        }
        throw new Error('An unknown error occurred while creating a patient.');
    }
}

/**
 * Updates an existing patient.
 * @param id The ID of the patient to update.
 * @param updatedData The updated data for the patient (partial or full).
 * @returns A promise that resolves to the updated Patient object.
 */
export async function updatePatient(id: number, updatedData: Partial<NewPatient>): Promise<Patient> {
    try {
        const response = await api.put<Patient>(`/patients/${id}`, updatedData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error updating patient ${id}:`, error.response.data);
            throw new Error(`Failed to update patient ${id}: ${error.response.statusText}`);
        }
        throw new Error(`An unknown error occurred while updating patient ${id}.`);
    }
}

/**
 * Deletes a patient by ID.
 * @param id The ID of the patient to delete.
 * @returns A promise that resolves upon successful deletion (often an empty object).
 */
export async function deletePatient(id: number): Promise<void> {
    try {
        await api.delete(`/patients/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error deleting patient ${id}:`, error.response.data);
            throw new Error(`Failed to delete patient ${id}: ${error.response.statusText}`);
        }
        throw new Error(`An unknown error occurred while deleting patient ${id}.`);
    }
}