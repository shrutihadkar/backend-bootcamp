require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;
let notes = [
    { id: 1, title: 'First note', body: 'This is my first note', createdAt: new Date().toISOString() },
    { id: 2, title: 'Meeting notes', body: 'Discuss project timeline', createdAt: new Date().toISOString() },
  ];
  let nextId = 3;
  
  app.get('/notes', (req, res) => {
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  });
  
  app.listen(PORT, () => {
    console.log(`${APP_NAME} running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });