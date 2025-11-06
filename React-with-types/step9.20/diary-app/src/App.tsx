import React from "react";
import DiaryList from "./components/DiaryList";

const App: React.FC = () => (
  <div style={{ padding: "20px" }}>
    <h1>Diary Entries</h1>
    <DiaryList />
  </div>
);

export default App;
