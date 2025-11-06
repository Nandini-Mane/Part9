import React, { useState } from "react";
import type { DiaryEntry as DiaryEntryType } from "../types";

interface Props {
  onAdded: (entry: DiaryEntryType) => void;
}

const AddDiaryEntry: React.FC<Props> = ({ onAdded }) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = { date, weather, visibility, comment };
    fetch("http://localhost:3001/api/diaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    })
      .then(res => res.json())
      .then(data => { onAdded(data); setDate(""); setWeather(""); setVisibility(""); setComment(""); })
      .catch(err => console.error("Failed to add diary entry", err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add New Diary Entry</h3>
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
