const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const adminsRepo = require('../db/adminsRepo');
const AppError = require('../utils/AppError');

function signToken(admin) {
  return jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, env.jwtSecret, {
    expiresIn: '7d',
  });
}

async function login(username, password) {
  const admin = await adminsRepo.findByUsername(username);
  if (!admin || !admin.is_active) {
    throw new AppError('Invalid credentials', 401);
  }
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    throw new AppError('Invalid credentials', 401);
  }
  await adminsRepo.touchLastLogin(admin.id);
  const token = signToken(admin);
  return {
    token,
    admin: { id: admin.id, username: admin.username, role: admin.role, full_name: admin.full_name },
  };
}

async function changePassword(adminId, currentPassword, newPassword) {
  const admin = await adminsRepo.findByUsername((await adminsRepo.findById(adminId)).username);
  const valid = await bcrypt.compare(currentPassword, admin.password_hash);
  if (!valid) {
    throw new AppError('Current password is incorrect', 401);
  }
  if (!newPassword || newPassword.length < 8) {
    throw new AppError('New password must be at least 8 characters', 400);
  }
  const hash = await bcrypt.hash(newPassword, 10);
  await adminsRepo.updatePasswordHash(adminId, hash);
}

async function createAdmin({ username, password, role, fullName }) {
  const existing = await adminsRepo.findByUsername(username);
  if (existing) throw new AppError('An admin with this username already exists', 409);
  const hash = await bcrypt.hash(password, 10);
  return adminsRepo.create({
    username,
    password_hash: hash,
    role: role === 'super_admin' ? 'super_admin' : 'admin',
    full_name: fullName || null,
  });
}

module.exports = { login, changePassword, createAdmin, signToken };
