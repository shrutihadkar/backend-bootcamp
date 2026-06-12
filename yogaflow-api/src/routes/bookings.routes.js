const express = require('express');
const router = express.Router();

// Bookings routes coming soon!
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bookings API coming soon!'
  });
});

module.exports = router;