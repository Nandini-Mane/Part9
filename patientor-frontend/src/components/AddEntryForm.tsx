// components/AddEntryForm.tsx

import React, { useState, FormEvent } from 'react';
import { NewEntry, Entry } from '../src/api/entries'; // Adjust path if necessary
import { createEntry } from '../src/api/entries'; // Import only the creation API function

// Define the component props
interface AddEntryFormProps {
    // ID of the patient this entry belongs to (MANDATORY)
    patientId: number;
    // Function to call on successful creation
    onSuccess: (newEntry: Entry) => void;
    // Function to call on form cancellation (e.g., closing a modal)
    onCancel: () => void;
}

// Define the shape of the form state
interface FormState {
    date: string;
    content: string;
    type: 'note' | 'log' | 'result';
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ patientId, onSuccess, onCancel }) => {

    // --- 1. State Management ---
    const [formData, setFormData] = useState<FormState>({
        date: new Date().toISOString().substring(0, 10), // Default to today's date
        content: '',
        type: 'note',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- 2. Handlers ---
    
    // Generic change handler for form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validation logic
    const validate = () => {
        if (!formData.content.trim()) {
            setError('Entry content cannot be empty.');
            return false;
        }
        if (!formData.date) {
            setError('Date is required.');
            return false;
        }
        setError(null);
        return true;
    };

    // Form submission handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            // Construct the entry data for creation
            const newEntryData: NewEntry = {
                patientId: patientId, // Use the mandatory prop
                date: formData.date,
                content: formData.content.trim(),
                type: formData.type,
            };

            // Call the API function to create the entry
            const resultEntry = await createEntry(newEntryData);

            // Call the success callback with the newly created entry
            onSuccess(resultEntry);

        } catch (err: any) {
            setError(err.message || 'An error occurred while creating the entry.');
            console.error('Creation Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // --- 3. Render ---
    return (
        <form onSubmit={handleSubmit} className="add-entry-form">
            <h3>Add New Entry for Patient ID: {patientId}</h3>
            
            {/* Error Display */}
            {error && <p className="error-message" style={{ color: 'red', padding: '10px', border: '1px solid red' }}>{error}</p>}

            {/* Date Input */}
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().substring(0, 10)} 
                />
            </div>

            {/* Type Select */}
            <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="note">Note</option>
                    <option value="log">Log</option>
                    <option value="result">Result</option>
                </select>
            </div>

            {/* Content Textarea */}
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    rows={5}
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Describe the medical event or observation..."
                    required
                />
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
                <button type="button" onClick={onCancel} disabled={isLoading} className="btn-cancel">
                    Cancel
                </button>
                <button type="submit" disabled={isLoading} className="btn-submit">
                    {isLoading ? 'Adding...' : 'Add Entry'}
                </button>
            </div>
            
            {/* Minimal Styling (often moved to a separate CSS file) */}
            <style jsx>{`
                .add-entry-form {
                    padding: 20px;
                    border: 1px solid #eee;
                    border-radius: 6px;
                }
                .form-group { margin-bottom: 12px; }
                label { display: block; font-weight: 600; margin-bottom: 4px; }
                input, select, textarea { 
                    width: 100%; 
                    padding: 8px; 
                    border: 1px solid #ddd; 
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
                .btn-submit { background-color: #28a745; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
                .btn-cancel { background-color: #6c757d; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
            `}</style>
        </form>
    );
};

export default AddEntryForm;