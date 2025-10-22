import { validationResult } from 'express-validator';
import JoinRequest from '../models/JoinRequest.js';

// @desc    Submit join request
// @route   POST /api/join
// @access  Public
export const submitJoinRequest = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, regNo, branch, year, interests, motivation, joinReason } = req.body;

    // Check if email already exists
    const existingRequest = await JoinRequest.findOne({ email });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'A join request with this email already exists'
      });
    }

    // Create join request
    const joinRequest = await JoinRequest.create({
      name,
      email,
      phone,
      regNo,
      branch,
      year,
      interests,
      motivation,
      joinReason,
      metadata: {
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip,
        referrer: req.get('Referrer'),
        submittedAt: new Date()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Join request submitted successfully! We will review your application and contact you soon.',
      data: joinRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all join requests (Admin only)
// @route   GET /api/join
// @access  Private (Admin)
export const getJoinRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by branch
    if (req.query.branch) {
      query.branch = req.query.branch;
    }

    // Filter by year
    if (req.query.year) {
      query.year = req.query.year;
    }

    // Search by name, email, or regNo
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { regNo: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const joinRequests = await JoinRequest.find(query)
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await JoinRequest.countDocuments(query);

    res.json({
      success: true,
      count: joinRequests.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: joinRequests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single join request
// @route   GET /api/join/:id
// @access  Private (Admin)
export const getJoinRequest = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findById(req.params.id)
      .populate('reviewedBy', 'name email');

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: 'Join request not found'
      });
    }

    res.json({
      success: true,
      data: joinRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update join request status
// @route   PUT /api/join/:id/status
// @access  Private (Admin)
export const updateJoinRequestStatus = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findById(req.params.id);

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: 'Join request not found'
      });
    }

    const { status, reviewNotes } = req.body;

    joinRequest.status = status;
    if (status !== 'pending') {
      joinRequest.reviewedBy = req.user._id;
      joinRequest.reviewedAt = new Date();
      if (reviewNotes) {
        joinRequest.reviewNotes = reviewNotes;
      }
    }

    await joinRequest.save();

    const updatedRequest = await JoinRequest.findById(req.params.id)
      .populate('reviewedBy', 'name email');

    res.json({
      success: true,
      message: 'Join request status updated successfully',
      data: updatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete join request
// @route   DELETE /api/join/:id
// @access  Private (Admin)
export const deleteJoinRequest = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findById(req.params.id);

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: 'Join request not found'
      });
    }

    await JoinRequest.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Join request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get join request statistics
// @route   GET /api/join/stats
// @access  Private (Admin)
export const getJoinRequestStats = async (req, res) => {
  try {
    const stats = await JoinRequest.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] } }
        }
      }
    ]);

    const branchStats = await JoinRequest.aggregate([
      {
        $group: {
          _id: '$branch',
          count: { $sum: 1 }
        }
      }
    ]);

    const yearStats = await JoinRequest.aggregate([
      {
        $group: {
          _id: '$year',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || { total: 0, pending: 0, approved: 0, rejected: 0 },
        branches: branchStats,
        years: yearStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
