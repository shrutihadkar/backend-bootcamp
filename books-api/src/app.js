const express = require('express');
const booksRoutes = require('./routes/books.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
app.use(errorHandler);

// Add at bottom of booksModel.js:
module.exports = app;