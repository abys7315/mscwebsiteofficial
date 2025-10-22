import Event from '../models/Event.js';
import User from '../models/User.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = { status: 'published' };

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by date range
    if (req.query.startDate || req.query.endDate) {
      query.startDate = {};
      if (req.query.startDate) {
        query.startDate.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        query.startDate.$lte = new Date(req.query.endDate);
      }
    }

    // Search by title or description
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortOptions = { startDate: 1 };
    if (req.query.sort === 'newest') {
      sortOptions = { createdAt: -1 };
    } else if (req.query.sort === 'featured') {
      sortOptions = { featured: -1, startDate: 1 };
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .sort(sortOptions)
      .limit(limit)
      .skip(startIndex);

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      count: events.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('participants.user', 'name email avatar');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin/Organizer)
export const createEvent = async (req, res) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user._id;

    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin/Organizer)
export const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Make sure user is event owner or admin
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    req.body.updatedBy = req.user._id;
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin/Organizer)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Make sure user is event owner or admin
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if registration is open
    if (!event.allowRegistration || event.status !== 'published') {
      return res.status(400).json({
        success: false,
        message: 'Registration is not open for this event'
      });
    }

    // Check if registration deadline has passed
    if (event.registrationDeadline < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    // Check capacity
    if (event.capacity && event.registeredCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Check if user is already registered
    const existingRegistration = event.participants.find(
      p => p.user.toString() === req.user._id.toString()
    );

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }

    // Add participant
    event.participants.push({
      user: req.user._id,
      registrationData: req.body.registrationData || {}
    });

    await event.save();

    // Update user's join requests
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        joinRequests: {
          eventId: event._id,
          status: 'approved'
        }
      }
    });

    res.json({
      success: true,
      message: 'Successfully registered for the event'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get event participants
// @route   GET /api/events/:id/participants
// @access  Private (Admin/Organizer)
export const getEventParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('participants.user', 'name email avatar')
      .select('participants');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check permissions
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view participants'
      });
    }

    res.json({
      success: true,
      data: event.participants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
