// pages/PatientDetailsPage/PatientDetailsPage.tsx

import React, { useEffect, useState } from 'react';
// Assuming use of react-router-dom for routing and parameter access
import { useParams, Link } from 'react-router-dom'; 

import { Patient, fetchPatientById } from '../../src/api/patients'; // Patient API functions
import { Entry, fetchEntries, deleteEntry } from '../../src/api/entries'; // Entry API functions
import CommonButton from '../../components/CommonButton'; // Reusable button
import AddEntryForm from '../../components/AddEntryForm'; // Component to add new entry

// Define the component's internal state
interface DetailsState {
    patient: Patient | null;
    entries: Entry[];
    loadingPatient: boolean;
    loadingEntries: boolean;
    error: string | null;
}

const PatientDetailsPage: React.FC = () => {
    // Get the patientId from the URL (e.g., /patients/123)
    const { patientId: idParam } = useParams<{ patientId: string }>();
    const patientId = idParam ? parseInt(idParam, 10) : NaN;

    const [state, setState] = useState<DetailsState>({
        patient: null,
        entries: [],
        loadingPatient: true,
        loadingEntries: true,
        error: null,
    });

    const [isAddingEntry, setIsAddingEntry] = useState(false);

    // --- 1. Data Fetching Effect ---

    useEffect(() => {
        if (isNaN(patientId)) {
            setState(prev => ({ ...prev, loadingPatient: false, error: 'Invalid Patient ID.' }));
            return;
        }

        // Fetch Patient Details
        const loadPatient = async () => {
            try {
                const patientData = await fetchPatientById(patientId);
                setState(prev => ({ ...prev, patient: patientData, loadingPatient: false }));
            } catch (err: any) {
                setState(prev => ({ ...prev, loadingPatient: false, error: err.message || 'Failed to load patient details.' }));
            }
        };

        // Fetch Patient Entries
        const loadEntries = async () => {
            try {
                const entriesData = await fetchEntries(patientId);
                setState(prev => ({ ...prev, entries: entriesData, loadingEntries: false }));
            } catch (err: any) {
                // Log entry error but don't halt the page
                console.warn('Failed to load patient entries:', err);
                setState(prev => ({ ...prev, loadingEntries: false }));
            }
        };

        loadPatient();
        loadEntries();
    }, [patientId]);

    // --- 2. Entry Management Handlers ---

    const handleEntryAdded = (newEntry: Entry) => {
        // Update the entries list and close the form
        setState(prev => ({ 
            ...prev, 
            entries: [newEntry, ...prev.entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        }));
        setIsAddingEntry(false);
    };

    const handleDeleteEntry = async (entryId: number) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }

        try {
            await deleteEntry(entryId);
            // Remove the entry from local state
            setState(prev => ({
                ...prev,
                entries: prev.entries.filter(e => e.id !== entryId),
            }));
        } catch (err: any) {
            alert(`Failed to delete entry: ${err.message}`);
        }
    };

    // --- 3. Render Status ---

    if (state.loadingPatient) {
        return <div className="details-container"><h2>Loading Patient Data...</h2></div>;
    }

    if (state.error) {
        return <div className="details-container" style={{ color: 'red' }}>
            <h2>Error</h2>
            <p>{state.error}</p>
            <Link to="/patients">Go back to Patient List</Link>
        </div>;
    }

    if (!state.patient) {
        return <div className="details-container"><h2>Patient Not Found</h2></div>;
    }
    
    // --- 4. Main Render ---
    const patient = state.patient;

    return (
        <div className="details-container">
            <div className="header-section">
                <h1>{patient.firstName} {patient.lastName}</h1>
                <Link to={`/patients/${patient.id}/edit`}>
                    <CommonButton variant="secondary">
                        Edit Patient Info
                    </CommonButton>
                </Link>
            </div>
            
            <p className="demographics">
                <strong>ID:</strong> {patient.id} | 
                <strong> DOB:</strong> {patient.dateOfBirth}
                {/* Add more patient details here */}
            </p>

            {/* --- Entries Section --- */}
            <div className="entries-section">
                <div className="entries-header">
                    <h2>Medical Entries ({state.entries.length})</h2>
                    <CommonButton 
                        variant="primary" 
                        onClick={() => setIsAddingEntry(true)}
                    >
                        + Add New Entry
                    </CommonButton>
                </div>

                {isAddingEntry && (
                    <div className="add-entry-form-wrapper">
                        <AddEntryForm 
                            patientId={patient.id}
                            onSuccess={handleEntryAdded}
                            onCancel={() => setIsAddingEntry(false)}
                        />
                    </div>
                )}
                
                {state.loadingEntries && <p>Loading entries...</p>}
                
                {!state.loadingEntries && state.entries.length === 0 && !isAddingEntry && (
                    <p>No medical entries found for this patient.</p>
                )}

                {/* List of Entries */}
                <div className="entry-list">
                    {state.entries.map(entry => (
                        <div key={entry.id} className={`entry-card entry-type-${entry.type}`}>
                            <div className="entry-header-row">
                                <h4>
                                    {entry.type.toUpperCase()} - {entry.date}
                                </h4>
                                <CommonButton 
                                    variant="danger" 
                                    onClick={() => handleDeleteEntry(entry.id)}
                                    style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                >
                                    Delete
                                </CommonButton>
                            </div>
                            <p className="entry-content">{entry.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example basic styling */}
            <style jsx>{`
                .details-container {
                    padding: 40px;
                    max-width: 900px;
                    margin: 0 auto;
                }
                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #ccc;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .demographics {
                    font-size: 1.1rem;
                    margin-bottom: 30px;
                }
                .entries-section {
                    margin-top: 40px;
                }
                .entries-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .add-entry-form-wrapper {
                    border: 1px solid #ddd;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-radius: 6px;
                    background: #f9f9f9;
                }
                .entry-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .entry-card {
                    padding: 15px;
                    border-left: 5px solid;
                    border-radius: 4px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                    background-color: white;
                }
                .entry-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                }
                .entry-card h4 {
                    margin: 0;
                    color: #007bff;
                }
                .entry-content {
                    white-space: pre-wrap; /* Preserve formatting */
                }
                /* Type-specific colors */
                .entry-type-note { border-left-color: #007bff; }
                .entry-type-log { border-left-color: #ffc107; }
                .entry-type-result { border-left-color: #28a745; }
            `}</style>
        </div>
    );
};

export default PatientDetailsPage;