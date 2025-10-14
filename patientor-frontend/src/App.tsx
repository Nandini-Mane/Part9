import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import EntryForm from "./Components/EntryForm.tsx";
function App() {
  return (
    <Container>
      <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
        Patientor Frontend
      </Typography>

      {/* For now, we render the form directly */}
      <Typography variant="h4" style={{ marginTop: "1em", marginBottom: "0.5em" }}>
        New Health Entry
      </Typography>

      <EntryForm />

      {/* You would eventually replace EntryForm with a <Routes> setup */}
    </Container>
  );
}

export default App;