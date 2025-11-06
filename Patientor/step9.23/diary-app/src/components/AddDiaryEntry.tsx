import React, { useState } from "react";
import type { DiaryEntry, Weather, Visibility } from "../types";
import axios from "axios";

interface Props {
  onAdded: (entry: DiaryEntry) => void;
}

const AddDiaryEntry: React.FC<Props> = ({ onAdded }) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/diaries", {
        date,
        weather,
        visibility,
        comment
      });
      onAdded(response.data);
      setDate("");
      setWeather("sunny");
      setVisibility("great");
      setComment("");
      setErrorMessage("");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || "Failed to add entry");
      } else {
        setErrorMessage("Unexpected error occurred");
      }
    }
  };

  const weatherOptions: Weather[] = ["sunny", "rainy", "cloudy", "stormy", "windy"];
  const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"];

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add New Diary Entry</h3>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </label>
      </div>

      <div>
        <p>Weather:</p>
        {weatherOptions.map(option => (
          <label key={option} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="weather"
              value={option}
              checked={weather === option}
              onChange={() => setWeather(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <p>Visibility:</p>
        {visibilityOptions.map(option => (
          <label key={option} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="visibility"
              value={option}
              checked={visibility === option}
              onChange={() => setVisibility(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <label>
          Comment:
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        </label>
      </div>

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddDiaryEntry;
