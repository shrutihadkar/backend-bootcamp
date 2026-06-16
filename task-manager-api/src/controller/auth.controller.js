const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const result = await authService.register(name, email, password);

    if (result.error) {
      return res.status(result.code).json({
        success: false,
        message: result.error
      });
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      data: result
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await authService.login(email, password);

    if (result.error) {
      return res.status(result.code).json({
        success: false,
        message: result.error
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: result
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const setupTOTPHandler = async (req, res) => {
  try {
    const result = await authService.setupTOTP(req.userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyTOTPHandler = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'TOTP token is required'
      });
    }

    const result = await authService.verifyTOTP(req.userId, token);

    if (result.error) {
      return res.status(result.code).json({
        success: false,
        message: result.error
      });
    }

    res.status(200).json({ success: true, data: result });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  setupTOTPHandler,
  verifyTOTPHandler,
  getMe
};