// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());

// In-memory database for comments
let comments = [];

// Route to get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Route to add a new comment
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: 'Name and comment are required' });
  }
  const newComment = { id: comments.length + 1, name, comment };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});