import express from 'express';

const app = express();

// Define a simple ping route
app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged here');
  res.send('pong');
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
