// Import the data service methods
// Adjust the path '../services/yogaClasses.service' to match where your array data file lives
const yogaClassService = require('../services/classes.service');

// 1. Get all yoga classes
const getAllClasses = (req, res) => {
  try {
    const classes = yogaClassService.getAllYogaClasses();
    return res.status(200).json({
      success: true,
      data: classes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get a single yoga class by ID
const getClassById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const yogaClass = yogaClassService.getYogaClassById(id);

    if (!yogaClass) {
      return res.status(404).json({
        success: false,
        message: `Yoga class with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: yogaClass
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Create a new yoga class
const createClass = (req, res) => {
  try {
    // Basic body validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Class data cannot be empty"
      });
    }

    const newClass = yogaClassService.createYogaClass(req.body);
    return res.status(201).json({
      success: true,
      message: "Yoga class created successfully",
      data: newClass
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update an existing yoga class
const updateClass = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Update data cannot be empty"
      });
    }

    const updatedClass = yogaClassService.updateYogaClass(id, req.body);

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: `Yoga class with ID ${id} not found to update`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Yoga class updated successfully",
      data: updatedClass
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete a yoga class
const deleteClass = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedClass = yogaClassService.deleteYogaClass(id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: `Yoga class with ID ${id} not found to delete`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Yoga class deleted successfully",
      data: deletedClass
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};