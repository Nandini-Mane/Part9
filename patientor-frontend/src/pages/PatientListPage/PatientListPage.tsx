// pages/PatientListPage/PatientListPage.tsx

import React, { useEffect, useState } from 'react';
import { Patient, fetchPatients } from '../../src/api/patients'; // Adjust path as needed
// Assuming you have a component to display the list and perhaps the CommonButton
import CommonButton from '../../components/CommonButton'; 
import { Link } from 'react-router-dom'; // For navigation

/**
 * Interface for the component's state to manage data and loading status.
 */
interface PatientListState {
    patients: Patient[];
    loading: boolean;
    error: string | null;
}

const PatientListPage: React.FC = () => {
    const [state, setState] = useState<PatientListState>({
        patients: [],
        loading: true,
        error: null,
    });
    const [searchTerm, setSearchTerm] = useState('');

    // --- 1. Data Fetching Effect ---
    useEffect(() => {
        const loadPatients = async () => {
            setState(prev => ({ ...prev, loading: true, error: null }));
            try {
                const data = await fetchPatients();
                setState({ patients: data, loading: false, error: null });
            } catch (err: any) {
                console.error('Failed to load patients:', err);
                setState({ patients: [], loading: false, error: err.message || 'Failed to load patient data.' });
            }
        };

        loadPatients();
    }, []); // Empty dependency array ensures this runs only once on mount

    // --- 2. Filtering Logic ---
    const filteredPatients = state.patients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    // --- 3. Render Logic ---

    if (state.loading) {
        return <div className="page-container"><h2>Loading Patients...</h2></div>;
    }

    if (state.error) {
        return <div className="page-container" style={{ color: 'red' }}>
            <h2>Error Loading Data</h2>
            <p>{state.error}</p>
        </div>;
    }

    // Function to render each patient row
    const renderPatientRow = (patient: Patient) => (
        <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.lastName}, {patient.firstName}</td>
            <td>{patient.dateOfBirth}</td>
            <td>
                {/* Link to the specific patient's detail page */}
                <Link to={`/patients/${patient.id}`}>
                    <CommonButton variant="secondary" style={{ padding: '5px 10px' }}>
                        View Details
                    </CommonButton>
                </Link>
            </td>
        </tr>
    );

    return (
        <div className="page-container">
            <div className="page-header-row">
                <h1>Patient Directory</h1>
                <Link to="/patients/new">
                    <CommonButton variant="primary">
                        + Add New Patient
                    </CommonButton>
                </Link>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="patient-list-table-wrapper">
                {filteredPatients.length === 0 && !searchTerm ? (
                    <p>No patients found in the system.</p>
                ) : filteredPatients.length === 0 && searchTerm ? (
                    <p>No patients match the search term: **{searchTerm}**</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map(renderPatientRow)}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Example basic styling for a page component */}
            <style jsx>{`
                .page-container {
                    padding: 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .page-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .search-bar input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: white;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                }
                th, td {
                    text-align: left;
                    padding: 12px 15px;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f4f7f9;
                    font-weight: 600;
                    color: #333;
                }
                tr:hover {
                    background-color: #f9f9f9;
                }
            `}</style>
        </div>
    );
};

export default PatientListPage;