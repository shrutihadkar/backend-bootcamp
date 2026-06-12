const express = require('express');
const bookingRoutes = require('./routes/bookings.routes');
const classesRoutes = require('./routes/classes.routes');
const studentRoutes = require('./routes/student.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
app.use(errorHandler);

module.exports = app;