const adminAuthService = require('../services/adminAuthService');
const adminsRepo = require('../db/adminsRepo');
const activityLogService = require('../services/activityLogService');
const AppError = require('../utils/AppError');
const { success, created } = require('../utils/responseShape');
const { toInt, requireString, toBool } = require('../utils/validators');

async function login(req, res) {
  const username = requireString(req.body.username, 'username', { maxLength: 100 });
  const password = requireString(req.body.password, 'password', { maxLength: 255 });
  const result = await adminAuthService.login(username, password);
  return success(res, result);
}

async function verify(req, res) {
  const admin = await adminsRepo.findById(req.admin.id);
  if (!admin || !admin.is_active) throw new AppError('Session no longer valid', 401);
  return success(res, admin);
}

async function changePassword(req, res) {
  const current = requireString(req.body.current_password, 'current_password', { maxLength: 255 });
  const next = requireString(req.body.new_password, 'new_password', { maxLength: 255, minLength: 8 });
  await adminAuthService.changePassword(req.admin.id, current, next);
  await activityLogService.log(req, 'admin.change_password', { entityType: 'admin', entityId: req.admin.id });
  return success(res, { ok: true });
}

async function list(req, res) {
  const admins = await adminsRepo.findAll();
  return success(res, admins);
}

async function create(req, res) {
  const username = requireString(req.body.username, 'username', { maxLength: 100 });
  const password = requireString(req.body.password, 'password', { maxLength: 255, minLength: 8 });
  const fullName = req.body.full_name ? requireString(req.body.full_name, 'full_name', { maxLength: 150 }) : null;
  const role = req.body.role === 'super_admin' ? 'super_admin' : 'admin';

  const admin = await adminAuthService.createAdmin({ username, password, role, fullName });
  await activityLogService.log(req, 'admin.create', { entityType: 'admin', entityId: admin.id });
  return created(res, admin);
}

async function update(req, res) {
  const id = toInt(req.params.id, 'id');
  const existing = await adminsRepo.findById(id);
  if (!existing) throw new AppError('Admin not found', 404);

  const data = {};
  if (req.body.full_name !== undefined) data.full_name = req.body.full_name;
  if (req.body.role !== undefined) data.role = req.body.role === 'super_admin' ? 'super_admin' : 'admin';
  if (req.body.is_active !== undefined) {
    if (existing.role === 'super_admin' && !toBool(req.body.is_active)) {
      const count = await adminsRepo.countSuperAdmins();
      if (count <= 1) throw new AppError('Cannot deactivate the last active super_admin', 409);
    }
    data.is_active = toBool(req.body.is_active) ? 1 : 0;
  }

  const admin = await adminsRepo.update(id, data);
  await activityLogService.log(req, 'admin.update', { entityType: 'admin', entityId: id });
  return success(res, admin);
}

async function remove(req, res) {
  const id = toInt(req.params.id, 'id');
  if (id === req.admin.id) throw new AppError('You cannot delete your own admin account', 400);

  const existing = await adminsRepo.findById(id);
  if (!existing) throw new AppError('Admin not found', 404);

  if (existing.role === 'super_admin') {
    const count = await adminsRepo.countSuperAdmins();
    if (count <= 1) throw new AppError('Cannot delete the last super_admin', 409);
  }

  await adminsRepo.remove(id);
  await activityLogService.log(req, 'admin.delete', { entityType: 'admin', entityId: id });
  return res.status(204).send();
}

module.exports = { login, verify, changePassword, list, create, update, remove };
