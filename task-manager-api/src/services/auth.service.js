const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');


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

const setupTOTP = async (userId) => {
  // Generate secret
  const secret = speakeasy.generateSecret({
    name: `TaskManager (${userId})`,
    length: 20
  });

  // Save secret to user
  await prisma.user.update({
    where: { id: userId },
    data: { totpSecret: secret.base32 }
  });

  // Generate QR code
  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  return {
    secret: secret.base32,
    qrCode // base64 image to scan with Google Authenticator
  };
};

const verifyTOTP = async (userId, token) => {
  // Get user's secret
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.totpSecret) {
    return { error: 'TOTP not set up', code: 400 };
  }

  // Verify token
  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token,
    window: 1 // allow 30 second window
  });

  if (!verified) {
    return { error: 'Invalid TOTP code', code: 401 };
  }

  // Enable TOTP if not already enabled
  await prisma.user.update({
    where: { id: userId },
    data: { totpEnabled: true }
  });

  return { success: true, message: 'TOTP verified and enabled!' };
};
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      totpEnabled: true,
      createdAt: true
    }
  });
  return user;
};

module.exports = { register, login, setupTOTP, verifyTOTP, getUserById };

