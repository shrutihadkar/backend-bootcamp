const express = require('express');
const router = express.Router();

// Import controller first
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
} = require('../controller/classes.controller');

// Import middleware
const { validateClassData } = require('../middleware/validate');

// Define routes
router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', validateClassData, createClass);
router.put('/:id', validateClassData, updateClass);
router.delete('/:id', deleteClass);

module.exports = router;