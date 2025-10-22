import express from 'express';
import { body } from 'express-validator';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventParticipants
} from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const createEventValidation = [
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['workshop', 'seminar', 'competition', 'hackathon', 'networking', 'cultural', 'technical', 'other']).withMessage('Invalid category'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date'),
  body('registrationDeadline').isISO8601().withMessage('Invalid registration deadline'),
  body('venue.name').optional().trim().isLength({ min: 2 }).withMessage('Venue name must be at least 2 characters'),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price cannot be negative')
];

const updateEventValidation = [
  body('title').optional().trim().isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').optional().isIn(['workshop', 'seminar', 'competition', 'hackathon', 'networking', 'cultural', 'technical', 'other']).withMessage('Invalid category'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
  body('registrationDeadline').optional().isISO8601().withMessage('Invalid registration deadline'),
  body('venue.name').optional().trim().isLength({ min: 2 }).withMessage('Venue name must be at least 2 characters'),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price cannot be negative')
];

// Public routes
router.get('/', getEvents);
router.get('/:id', getEvent);

// Protected routes
router.post('/', protect, authorize('admin'), createEventValidation, createEvent);
router.put('/:id', protect, authorize('admin'), updateEventValidation, updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

// Event registration
router.post('/:id/register', protect, registerForEvent);

// Admin routes
router.get('/:id/participants', protect, authorize('admin'), getEventParticipants);

export default router;
