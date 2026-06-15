const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }

    // Password strength check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const result = await authService.register(name, email, password);

    // Service returns error object if something went wrong
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

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await authService.login(email, password);

    // Service returns error if login failed
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

module.exports = { register, login };