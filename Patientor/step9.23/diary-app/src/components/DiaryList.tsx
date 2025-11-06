import React, { useEffect, useState } from "react";
import DiaryEntry from "./DiaryEntry";
import AddDiaryEntry from "./AddDiaryEntry";
import type { DiaryEntry as DiaryEntryType } from "../types";


const DiaryList: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntryType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/diaries")
      .then(res => res.json())
      .then(data => setDiaries(data))
      .catch(() => setError("Failed to fetch diaries"));
  }, []);

  const handleAdded = (newEntry: DiaryEntryType) => setDiaries(prev => [...prev, newEntry]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <AddDiaryEntry onAdded={handleAdded} />
      {diaries.length === 0 ? <p>No diary entries available</p> : diaries.map(d => <DiaryEntry key={d.id} entry={d} />)}
    </div>
  );
};

export default DiaryList;
