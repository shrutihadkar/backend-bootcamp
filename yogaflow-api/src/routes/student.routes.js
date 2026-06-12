const express = require('express');
const router = express.Router();

// 1. Import your controller functions
const {handleGetAllStudents,
  handleGetStudentById,
  handleCreateStudent,
  handleUpdateStudent,
  handleDeleteStudent
    
} = require('../controller/students.controller');


const { validateStudentData } = require('../middleware/validate');

router.get('/', handleGetAllStudents);


router.get('/:id', handleGetStudentById);


router.post('/', validateStudentData, handleCreateStudent);

router.put('/:id', validateStudentData, handleUpdateStudent);



router.delete('/:id', handleDeleteStudent);


module.exports = router;