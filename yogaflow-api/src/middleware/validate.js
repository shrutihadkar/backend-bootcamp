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
  
  module.exports = { validateStudentData };