const express = require('express');
const router = express.Router();

const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
} = require('../controller/classes.controller');

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;