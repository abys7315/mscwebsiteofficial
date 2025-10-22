import Certificate from '../models/Certificate.js';
import User from '../models/User.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public (for public certificates)
export const getCertificates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let query = { isPublic: true };

    // If user is authenticated, show their private certificates too
    if (req.user) {
      query = {
        $or: [
          { isPublic: true },
          { 'recipient.email': req.user.email }
        ]
      };
    }

    // Filter by recipient email
    if (req.query.email) {
      query['recipient.email'] = req.query.email;
    }

    // Search by title or recipient name
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { 'recipient.name': { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const certificates = await Certificate.find(query)
      .populate('issuedBy', 'name email')
      .sort({ issueDate: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Certificate.countDocuments(query);

    res.json({
      success: true,
      count: certificates.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Public/Private
export const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('issuedBy', 'name email');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if user can view this certificate
    const canView = certificate.isPublic ||
                   (req.user && req.user.email === certificate.recipient.email) ||
                   (req.user && req.user.role === 'admin');

    if (!canView) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this certificate'
      });
    }

    res.json({
      success: true,
      data: certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Verify certificate
// @route   GET /api/certificates/verify/:identifier
// @access  Public
export const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdentifier(req.params.identifier)
      .populate('issuedBy', 'name email');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if certificate is valid
    if (!certificate.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Certificate is not valid',
        data: {
          certificate,
          isValid: false,
          reason: certificate.status === 'revoked' ? 'Certificate has been revoked' :
                  certificate.status === 'expired' ? 'Certificate has expired' : 'Unknown'
        }
      });
    }

    // Log verification attempt
    certificate.verificationHistory.push({
      verifiedBy: req.ip,
      userAgent: req.get('User-Agent')
    });
    await certificate.save();

    res.json({
      success: true,
      message: 'Certificate verified successfully',
      data: {
        certificate,
        isValid: true
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

// @desc    Create certificate
// @route   POST /api/certificates
// @access  Private (Admin)
export const createCertificate = async (req, res) => {
  try {
    req.body.issuedBy = req.user._id;

    const certificate = await Certificate.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin/Issuer)
export const updateCertificate = async (req, res) => {
  try {
    let certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check permissions
    if (certificate.issuedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this certificate'
      });
    }

    certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      data: certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Revoke certificate
// @route   PUT /api/certificates/:id/revoke
// @access  Private (Admin/Issuer)
export const revokeCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check permissions
    if (certificate.issuedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to revoke this certificate'
      });
    }

    certificate.status = 'revoked';
    certificate.revokedBy = req.user._id;
    certificate.revokeReason = req.body.reason;
    certificate.revokeDate = new Date();

    await certificate.save();

    res.json({
      success: true,
      message: 'Certificate revoked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin)
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Only admin can delete certificates
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete certificates'
      });
    }

    await Certificate.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's certificates
// @route   GET /api/certificates/user/:email
// @access  Private (Owner/Admin)
export const getUserCertificates = async (req, res) => {
  try {
    const email = req.params.email;

    // Check if user can view these certificates
    if (req.user.email !== email && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these certificates'
      });
    }

    const certificates = await Certificate.find({ 'recipient.email': email })
      .populate('issuedBy', 'name email')
      .sort({ issueDate: -1 });

    res.json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
