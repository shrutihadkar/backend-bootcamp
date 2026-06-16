const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  setupTOTPHandler, 
  verifyTOTPHandler,
  getMe
} = require('../controller/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

// Protected routes - need to be logged in
router.get('/me', protect, getMe);
router.post('/totp/setup', protect, setupTOTPHandler);
router.post('/totp/verify', protect, verifyTOTPHandler);

module.exports = router;