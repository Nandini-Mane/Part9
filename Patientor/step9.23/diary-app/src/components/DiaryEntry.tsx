import React from "react";
import type { DiaryEntry } from "../types";  // use type import

interface Props {
  entry: DiaryEntryType;
}

const DiaryEntry: React.FC<Props> = ({ entry }) => (
  <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
    <p><strong>Date:</strong> {entry.date}</p>
    <p><strong>Weather:</strong> {entry.weather}</p>
    <p><strong>Visibility:</strong> {entry.visibility}</p>
    {entry.comment && <p><strong>Comment:</strong> {entry.comment}</p>}
  </div>
);

export default DiaryEntry;
