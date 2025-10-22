import express from 'express';
import { body } from 'express-validator';
import {
  getDashboardStats,
  getUsers,
  updateUserRole,
  deleteUser,
  getSettings,
  updateSettings
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const updateUserRoleValidation = [
  body('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin')
];

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRoleValidation, updateUserRole);
router.delete('/users/:id', deleteUser);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;
