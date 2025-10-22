import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required')
];

const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('socialLinks.github').optional().isURL().withMessage('GitHub must be a valid URL'),
  body('socialLinks.linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('socialLinks.twitter').optional().isURL().withMessage('Twitter must be a valid URL'),
  body('socialLinks.portfolio').optional().isURL().withMessage('Portfolio must be a valid URL')
];

const changePasswordValidation = [
  body('currentPassword').exists().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfileValidation, updateProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);

export default router;
