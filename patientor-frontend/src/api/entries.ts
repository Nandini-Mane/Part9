// src/api/entries.ts

import axios, { AxiosInstance } from 'axios';

// -----------------------------------------------------------------------------
// 1. Configuration (Re-use or define API client)
// -----------------------------------------------------------------------------

// Define the base URL for the entries-related API endpoints
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
// 2. Data Structures (Interfaces)
// -----------------------------------------------------------------------------

/** Interface for a general Entry object */
export interface Entry {
    id: number;
    patientId: number; // Assuming entries are linked to patients
    date: string;       // ISO date string of the entry
    content: string;    // The main text/data of the entry
    type: 'note' | 'log' | 'result'; // Example entry types
    // Add other relevant fields (e.g., clinicianId, status)
}

/** Interface for creating a new Entry (without ID) */
export interface NewEntry {
    patientId: number;
    date: string;
    content: string;
    type: 'note' | 'log' | 'result';
}

// -----------------------------------------------------------------------------
// 3. API Functions
// -----------------------------------------------------------------------------

/**
 * Fetches all entries, optionally filtered by patient ID.
 * @param patientId Optional ID to filter entries for a specific patient.
 * @returns A promise that resolves to an array of Entry objects.
 */
export async function fetchEntries(patientId?: number): Promise<Entry[]> {
    try {
        const params = patientId ? { patientId } : {};
        const response = await api.get<Entry[]>('/entries', { params });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error fetching entries:', error.response.data);
            throw new Error(`Failed to fetch entries: ${error.response.statusText}`);
        }
        throw new Error('An unknown error occurred while fetching entries.');
    }
}

/**
 * Fetches a single entry by ID.
 * @param id The ID of the entry.
 * @returns A promise that resolves to an Entry object.
 */
export async function fetchEntryById(id: number): Promise<Entry> {
    try {
        const response = await api.get<Entry>(`/entries/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error fetching entry ${id}:`, error.response.data);
            throw new Error(`Failed to fetch entry ${id}: ${error.response.statusText}`);
        }
        throw new Error(`An unknown error occurred while fetching entry ${id}.`);
    }
}

/**
 * Creates a new entry.
 * @param newEntry The data for the new entry.
 * @returns A promise that resolves to the newly created Entry object.
 */
export async function createEntry(newEntry: NewEntry): Promise<Entry> {
    try {
        const response = await api.post<Entry>('/entries', newEntry);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error creating entry:', error.response.data);
            throw new Error(`Failed to create entry: ${error.response.statusText}`);
        }
        throw new Error('An unknown error occurred while creating an entry.');
    }
}

/**
 * Updates an existing entry.
 * @param id The ID of the entry to update.
 * @param updatedData The updated data for the entry (partial or full).
 * @returns A promise that resolves to the updated Entry object.
 */
export async function updateEntry(id: number, updatedData: Partial<NewEntry>): Promise<Entry> {
    try {
        const response = await api.put<Entry>(`/entries/${id}`, updatedData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error updating entry ${id}:`, error.response.data);
            throw new Error(`Failed to update entry ${id}: ${error.response.statusText}`);
        }
        throw new Error(`An unknown error occurred while updating entry ${id}.`);
    }
}

/**
 * Deletes an entry by ID.
 * @param id The ID of the entry to delete.
 * @returns A promise that resolves upon successful deletion.
 */
export async function deleteEntry(id: number): Promise<void> {
    try {
        await api.delete(`/entries/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error deleting entry ${id}:`, error.response.data);
            throw new Error(`Failed to delete entry ${id}: ${error.response.statusText}`);
        }
        throw new Error(`An unknown error occurred while deleting entry ${id}.`);
    }
}