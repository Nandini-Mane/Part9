import express, { Request, Response } from 'express';

// Initialize the Express application
const app = express();

// Define the HTTP GET endpoint /hello
// We use '_req' instead of 'req' for the unused Request object
// to satisfy the 'noUnusedParameters' rule in tsconfig.
app.get('/hello', (_req: Request, res: Response) => {
  // Respond with the required string
  res.send('Hello Full Stack!');
});

// Define the port for the server
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the hello endpoint at: http://localhost:${PORT}/hello`);
});
