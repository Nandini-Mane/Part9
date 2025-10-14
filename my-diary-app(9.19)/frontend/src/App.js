import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    // Fetch initial diary entries from the backend when the component mounts
    axios.get('http://localhost:3000/api/diaries')
      .then(response => {
        setDiaryEntries(response.data);
      })
      .catch(error => {
        console.error("Error fetching diary entries:", error);
      });
  }, []);

  const handleAddEntry = async (event) => {
    event.preventDefault();

    const newEntry = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      const response = await axios.post('http://localhost:3000/api/diaries', newEntry);
      setDiaryEntries(diaryEntries.concat(response.data));
      setErrorMessage(null); // Clear any previous error on success

      // Reset form fields
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');

    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        // The error message is available in error.response.data
        setErrorMessage(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('Network Error: No response received from server.');
      } else {
        // Something else happened in setting up the request
        setErrorMessage('An unexpected error occurred: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
      <form onSubmit={handleAddEntry}>
        <div>
          <label>date</label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label>visibility</label>
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          <label>weather</label>
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          <label>comment</label>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaryEntries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          <p>comment: {entry.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;