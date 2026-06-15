const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTopTasks,
  getDashboard,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controller/tasks.controller');
const { protect } = require('../middleware/auth');
// All routes below require authentication
router.use(protect);


const { validateTaskData } = require('../middleware/validate');

router.post('/', validateTaskData, createTask);
router.put('/:id', updateTask);

router.get('/', getAllTasks);
router.get('/top', getTopTasks);
router.get('/dashboard', getDashboard);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;