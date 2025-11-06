import React, { useState } from "react";
import type { DiaryEntry } from "../types";
import axios from "axios";

interface Props {
  onAdded: (entry: DiaryEntry) => void;
}

const AddDiaryEntry: React.FC<Props> = ({ onAdded }) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry = { date, weather, visibility, comment };

    try {
      const response = await axios.post("http://localhost:3001/api/diaries", newEntry);
      onAdded(response.data); // update frontend list
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setErrorMessage(""); // clear any previous errors
    } catch (error: any) {
      // Axios error handling
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Backend returned an error
          setErrorMessage(`Failed to add diary entry: ${error.response.data.error || error.response.statusText}`);
        } else if (error.request) {
          // Request was made but no response
          setErrorMessage("No response from backend");
        } else {
          // Something happened in setting up the request
          setErrorMessage(`Error: ${error.message}`);
        }
      } else {
        setErrorMessage(`Unexpected error: ${error}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add New Diary Entry</h3>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <label>Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} required /></label>
      </div>
      <div>
        <label>Weather: <input type="text" value={weather} onChange={e => setWeather(e.target.value)} required /></label>
      </div>
      <div>
        <label>Visibility: <input type="text" value={visibility} onChange={e => setVisibility(e.target.value)} required /></label>
      </div>
      <div>
        <label>Comment: <input type="text" value={comment} onChange={e => setComment(e.target.value)} /></label>
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddDiaryEntry;
