const validateStudentData = (req, res, next) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and phone are required'
      });
    }
    next();
  };
  
  // 2. Yoga Class Data Validation Middleware
const validateClassData = (req, res, next) => {
  const { className, instructor, duration } = req.body;

  if (!className || !instructor || !duration) {
    return res.status(400).json({
      success: false,
      message: 'Class name, instructor, and duration are required for a yoga class.'
    });
  }

  // Optional: You can also enforce specific data types or constraints here
  if (req.body.capacity && (typeof req.body.capacity !== 'number' || req.body.capacity <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Capacity must be a positive number.'
    });
  }

  next();
};

const validateBookingData = (req, res, next) => {
  const { studentId, classId } = req.body;
  if (!studentId || !classId) {
    return res.status(400).json({
      success: false,
      message: 'studentId and classId are required'
    });
  }
  next();
};


// Export both middlewares so they can be used in their respective route files
module.exports = { 
  validateStudentData, 
  validateClassData,
  validateBookingData 
};