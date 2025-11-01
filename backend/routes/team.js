import express from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  bulkCreateTeamMembers,
  updateTeamMember,
  deleteTeamMember,
  getTeamMembersByDesignation,
  getTeamMembersByTeam
} from '../controllers/teamController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeamMembers);
router.get('/designation/:designation', getTeamMembersByDesignation);
router.get('/team/:team', getTeamMembersByTeam);
router.get('/:id', getTeamMemberById);

// Admin only routes
router.post('/', protect, authorize('admin'), createTeamMember);
router.post('/bulk', protect, authorize('admin'), bulkCreateTeamMembers);
router.put('/:id', protect, authorize('admin'), updateTeamMember);
router.delete('/:id', protect, authorize('admin'), deleteTeamMember);

export default router;
