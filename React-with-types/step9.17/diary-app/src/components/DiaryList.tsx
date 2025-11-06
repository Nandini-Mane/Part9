import React, { useEffect, useState } from "react";
import DiaryEntry from "./DiaryEntry";
import type { DiaryEntry as DiaryEntryType } from "../types";

const DiaryList: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntryType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/diaries")
      .then(res => res.json())
      .then(data => setDiaries(data))
      .catch(err => setError("Failed to fetch diaries"));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {diaries.length === 0 ? (
        <p>No diary entries available</p>
      ) : (
        diaries.map(d => <DiaryEntry key={d.id} entry={d} />)
      )}
    </div>
  );
};

export default DiaryList;
