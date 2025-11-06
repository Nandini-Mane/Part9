import axios from 'axios';
import React, { useState } from 'react';

// NOTE: In a real Patientor project, you should import the types 
// from your shared types.ts file. For simplicity, we define the 
// payload type here.
interface HealthCheckEntryPayload {
  description: string;
  date: string;
  specialist: string;
  type: 'HealthCheck'; // CRITICAL: Must be specified for the backend
  healthCheckRating: number; // CRITICAL: Must be a number (0-3)
  diagnosisCodes?: string[]; // Array of strings, optional
}

interface Props {
  patientId: string;
  onSuccess: () => void; // Function to refresh patient data on success
  onError: (error: string) => void; // Function to display error message
}

const AddEntryForm: React.FC<Props> = ({ patientId, onSuccess, onError }) => {
  // State for form fields (all start as strings from text inputs)
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(''); // Comma-separated string
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    onError(''); // Clear previous errors

    try {
        // 1. Validate and Prepare the data for the backend
        const rating = parseInt(healthCheckRating, 10);
        
        // Basic frontend validation for HealthCheckRating (optional but good practice)
        if (isNaN(rating) || rating < 0 || rating > 3) {
            throw new Error("Healthcheck rating must be a number between 0 and 3.");
        }

        const codesArray = diagnosisCodes
            ? diagnosisCodes.split(',').map(s => s.trim()).filter(s => s.length > 0)
            : undefined;

        // The final payload with correct types
        const newEntryData: HealthCheckEntryPayload = {
            description,
            date,
            specialist,
            type: 'HealthCheck', // Hardcoded type
            healthCheckRating: rating,
            diagnosisCodes: codesArray
        };

        // 2. Send the data to the backend
        const { data: newEntry } = await axios.post(
            `/api/patients/${patientId}/entries`,
            newEntryData
        );

        // 3. Handle success
        console.log('Entry added successfully:', newEntry);
        onSuccess();

        // Clear the form on success
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes('');

    } catch (error: unknown) {
        // 4. Handle errors
        let errorMessage = "An unknown error occurred during submission.";
        
        if (error instanceof Error) {
            // Handle local validation error
            errorMessage = error.message;
        } else if (axios.isAxiosError(error)) {
            // Handle backend validation error (400 Bad Request)
            // Error response from backend is often in error.response.data
            errorMessage = error.response?.data || 'Failed to add entry via API.';
        }
        
        onError(String(errorMessage));
        console.error("Submission failed:", errorMessage);
        
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Specialist:</label>
          <input value={specialist} onChange={(e) => setSpecialist(e.target.value)} required />
        </div>
        <div>
          <label>Healthcheck rating:</label>
          <input 
            type="number" // Use type number for better mobile/browser experience
            value={healthCheckRating} 
            onChange={(e) => setHealthCheckRating(e.target.value)} 
            placeholder="0, 1, 2, or 3" 
            min="0" // Set min/max limits
            max="3"
            required 
          />
        </div>
        <div>
          <label>Diagnosis codes (comma-separated):</label>
          <input value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />
        </div>
        
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          {/* Note: In a real app, CANCEL would typically hide the form */}
          <button type="button" onClick={() => { console.log('Cancel clicked'); }}>CANCEL</button>
          <button type="submit" disabled={loading || !description || !date || !specialist || healthCheckRating === ''}>
            {loading ? 'Adding...' : 'ADD'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;