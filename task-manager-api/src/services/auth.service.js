const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const register = async (name, email, password) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  if (existingUser) {
    return { error: 'Email already registered', code: 409 };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  // Don't return password!
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const login = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    return { error: 'Invalid email or password', code: 401 };
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: 'Invalid email or password', code: 401 };
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
};

module.exports = { register, login };