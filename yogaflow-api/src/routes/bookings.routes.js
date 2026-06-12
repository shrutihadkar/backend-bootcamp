const express = require('express');
const router = express.Router();

const {
  handleGetAllBookings,
  handleGetBookingById,
  handleCreateBooking,
  handleCancelBooking
} = require('../controller/bookings.controller');

router.get('/', handleGetAllBookings);
router.get('/:id', handleGetBookingById);
router.post('/', handleCreateBooking);
router.delete('/:id', handleCancelBooking);

module.exports = router;