import express from 'express';
import { body } from 'express-validator';
import {
  submitJoinRequest,
  getJoinRequests,
  getJoinRequest,
  updateJoinRequestStatus,
  deleteJoinRequest,
  getJoinRequestStats
} from '../controllers/joinController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const submitJoinRequestValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').trim().isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits'),
  body('regNo').trim().isLength({ min: 1 }).withMessage('Registration number is required'),
  body('branch').isIn(['CSE', 'ECE', 'MECH', 'CIVIL']).withMessage('Invalid branch'),
  body('year').isIn(['1', '2', '3', '4']).withMessage('Invalid year'),
  body('interests').isArray({ min: 1 }).withMessage('At least one interest team must be selected'),
  body('motivation').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be 10-1000 characters'),
  body('joinReason').trim().isLength({ min: 10, max: 500 }).withMessage('Join reason must be 10-500 characters')
];

const updateStatusValidation = [
  body('status').isIn(['pending', 'approved', 'rejected']).withMessage('Invalid status'),
  body('reviewNotes').optional().trim().isLength({ max: 500 }).withMessage('Review notes cannot exceed 500 characters')
];

// Public routes
router.post('/', submitJoinRequestValidation, submitJoinRequest);

// Protected routes (Admin)
router.get('/', protect, authorize('admin'), getJoinRequests);
router.get('/stats', protect, authorize('admin'), getJoinRequestStats);
router.get('/:id', protect, authorize('admin'), getJoinRequest);
router.put('/:id/status', protect, authorize('admin'), updateStatusValidation, updateJoinRequestStatus);
router.delete('/:id', protect, authorize('admin'), deleteJoinRequest);

export default router;
