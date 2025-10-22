import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  assignContact,
  addResponse,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const submitContactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Subject must be 5-200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  body('category').optional().isIn(['general', 'support', 'partnership', 'feedback', 'bug-report', 'feature-request', 'other']).withMessage('Invalid category')
];

const updateStatusValidation = [
  body('status').isIn(['new', 'in-progress', 'resolved', 'closed']).withMessage('Invalid status')
];

const assignContactValidation = [
  body('assignedTo').isMongoId().withMessage('Invalid user ID')
];

const addResponseValidation = [
  body('message').trim().isLength({ min: 1 }).withMessage('Response message is required')
];

// Public routes
router.post('/', submitContactValidation, submitContact);

// Protected routes (Admin)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/stats', protect, authorize('admin'), getContactStats);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id/status', protect, authorize('admin'), updateStatusValidation, updateContactStatus);
router.put('/:id/assign', protect, authorize('admin'), assignContactValidation, assignContact);
router.post('/:id/response', protect, authorize('admin'), addResponseValidation, addResponse);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;
