const express = require('express');
const app = express();
const {
  cors,
  initializeFirestore,
} = require ('./middlewares')

// Define a route for the root endpoint
app.get('/', async (req, res) => {
  if (!cors(req, res)) return
  await initializeFirestore(req, res)
  res.send('Hello, World!');
});

// Define a route for the /users endpoint
app.get('/users', (req, res) => {
  res.send('List of users');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});