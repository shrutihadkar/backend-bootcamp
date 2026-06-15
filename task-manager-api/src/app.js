const express = require('express');
const morgan = require('morgan');
const tasksRoutes = require('./routes/tasks.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/tasks', tasksRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);

module.exports = app;