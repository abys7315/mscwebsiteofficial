import express from 'express';
import { body } from 'express-validator';
import {
  getCertificates,
  getCertificate,
  verifyCertificate,
  createCertificate,
  updateCertificate,
  revokeCertificate,
  deleteCertificate,
  getUserCertificates
} from '../controllers/certificateController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const createCertificateValidation = [
  body('certificateId').matches(/^[A-Z0-9]{8,12}$/).withMessage('Certificate ID must be 8-12 alphanumeric characters'),
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('recipient.name').trim().isLength({ min: 2 }).withMessage('Recipient name is required'),
  body('recipient.email').isEmail().normalizeEmail().withMessage('Valid recipient email is required'),
  body('issuer.name').trim().isLength({ min: 2 }).withMessage('Issuer name is required'),
  body('issuer.organization').trim().isLength({ min: 2 }).withMessage('Issuer organization is required'),
  body('issueDate').isISO8601().withMessage('Valid issue date is required'),
  body('expiryDate').optional().isISO8601().withMessage('Invalid expiry date')
];

const updateCertificateValidation = [
  body('title').optional().trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('recipient.name').optional().trim().isLength({ min: 2 }).withMessage('Recipient name must be at least 2 characters'),
  body('recipient.email').optional().isEmail().normalizeEmail().withMessage('Valid recipient email is required'),
  body('issuer.name').optional().trim().isLength({ min: 2 }).withMessage('Issuer name must be at least 2 characters'),
  body('issuer.organization').optional().trim().isLength({ min: 2 }).withMessage('Issuer organization must be at least 2 characters'),
  body('issueDate').optional().isISO8601().withMessage('Invalid issue date'),
  body('expiryDate').optional().isISO8601().withMessage('Invalid expiry date')
];

// Public routes
router.get('/', getCertificates);
router.get('/verify/:identifier', verifyCertificate);
router.get('/user/:email', protect, getUserCertificates);

// Protected routes
router.get('/:id', protect, getCertificate);
router.post('/', protect, authorize('admin'), createCertificateValidation, createCertificate);
router.put('/:id', protect, authorize('admin'), updateCertificateValidation, updateCertificate);
router.put('/:id/revoke', protect, authorize('admin'), [
  body('reason').optional().trim().isLength({ min: 10 }).withMessage('Revocation reason must be at least 10 characters')
], revokeCertificate);
router.delete('/:id', protect, authorize('admin'), deleteCertificate);

export default router;
