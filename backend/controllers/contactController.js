import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      metadata: {
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip,
        referrer: req.get('Referrer'),
        source: 'website'
      }
    };

    const contact = await Contact.create(contactData);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by priority
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Search by name, email, or subject
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { subject: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      count: contacts.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Admin/Assigned User)
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('responses.sentBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && contact.assignedTo?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this contact'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private (Admin/Assigned User)
export const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && contact.assignedTo?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this contact'
      });
    }

    contact.status = req.body.status;
    if (req.body.status === 'resolved') {
      contact.resolvedAt = new Date();
    } else if (req.body.status === 'closed') {
      contact.closedAt = new Date();
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Assign contact to user
// @route   PUT /api/contact/:id/assign
// @access  Private (Admin)
export const assignContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.assignedTo = req.body.assignedTo;
    await contact.save();

    const updatedContact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email');

    res.json({
      success: true,
      message: 'Contact assigned successfully',
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add response to contact
// @route   POST /api/contact/:id/response
// @access  Private (Admin/Assigned User)
export const addResponse = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && contact.assignedTo?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to respond to this contact'
      });
    }

    const response = {
      from: 'admin',
      message: req.body.message,
      sentBy: req.user._id
    };

    // Add attachments if provided
    if (req.body.attachments) {
      response.attachments = req.body.attachments;
    }

    contact.responses.push(response);
    await contact.save();

    const updatedContact = await Contact.findById(req.params.id)
      .populate('responses.sentBy', 'name email');

    res.json({
      success: true,
      message: 'Response added successfully',
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private (Admin)
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
          closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } }
        }
      }
    ]);

    const categoryStats = await Contact.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || { total: 0, new: 0, inProgress: 0, resolved: 0, closed: 0 },
        categories: categoryStats
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
