const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
  } = require('../services/students.service');
  
  // GET all students
  const handleGetAllStudents = (req, res) => {
    const allStudents = getAllStudents();
    return res.status(200).json({
      success: true,
      count: allStudents.length,
      data: allStudents
    });
  };
  
  // GET single student by ID
  const handleGetStudentById = (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = getStudentById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: student
    });
  };
  
  // POST create new student
  const handleCreateStudent = (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and phone are required'
      });
    }
    const newStudent = createStudent(req.body);
    if (!newStudent) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }
    return res.status(201).json({
      success: true,
      data: newStudent
    });
  };
  
  // PUT update student
  const handleUpdateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const updatedStudent = updateStudent(studentId, req.body);
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedStudent
    });
  };
  
  // DELETE student
  const handleDeleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const deletedStudent = deleteStudent(studentId);
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${studentId} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: deletedStudent
    });
  };
  
  module.exports = {
    handleGetAllStudents,
    handleGetStudentById,
    handleCreateStudent,
    handleUpdateStudent,
    handleDeleteStudent
  };