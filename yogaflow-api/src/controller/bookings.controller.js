const {
    getAllBookings,
    getBookingsById,
    createBookings,
    cancelBookings
  } = require('../services/bookings.service');
  
  // GET all bookings
  const handleGetAllBookings = (req, res) => {
    const bookings = getAllBookings();
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  };
  
  // GET single booking by ID
  const handleGetBookingById = (req, res) => {
    const id = parseInt(req.params.id);
    const booking = getBookingsById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: booking
    });
  };
  
  // POST create booking
  const handleCreateBooking = (req, res) => {
    const { studentId, classId } = req.body;
  
    // Validate required fields
    if (!studentId || !classId) {
      return res.status(400).json({
        success: false,
        message: 'studentId and classId are required'
      });
    }
  
    // Call service — it handles all business logic
    const result = createBookings(
      parseInt(studentId),
      parseInt(classId)
    );
  
    // Service returns error object if something went wrong
    if (result.error) {
      return res.status(result.code).json({
        success: false,
        message: result.error
      });
    }
  
    return res.status(201).json({
      success: true,
      data: result
    });
  };
  
  // DELETE cancel booking
  const handleCancelBooking = (req, res) => {
    const id = parseInt(req.params.id);
    const booking = cancelBookings(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found`
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  };
  
  module.exports = {
    handleGetAllBookings,
    handleGetBookingById,
    handleCreateBooking,
    handleCancelBooking
  };