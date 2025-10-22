import User from '../models/User.js';
import Event from '../models/Event.js';
import Certificate from '../models/Certificate.js';
import Contact from '../models/Contact.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const [
      totalUsers,
      totalEvents,
      totalCertificates,
      totalContacts,
      newContacts,
      upcomingEvents
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Certificate.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Event.countDocuments({
        startDate: { $gte: new Date() },
        status: 'published'
      })
    ]);

    // Get recent activity
    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentEvents = await Event.find()
      .select('title startDate status createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find()
      .select('name email subject status createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get monthly stats for the last 12 months
    const monthlyStats = await getMonthlyStats();

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalEvents,
          totalCertificates,
          totalContacts,
          newContacts,
          upcomingEvents
        },
        recentActivity: {
          users: recentUsers,
          events: recentEvents,
          contacts: recentContacts
        },
        monthlyStats
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

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }

    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      count: users.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin)
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.role = req.body.role;
    await user.save();

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get system settings
// @route   GET /api/admin/settings
// @access  Private (Admin)
export const getSettings = async (req, res) => {
  try {
    // This would typically come from a settings collection
    // For now, return default settings
    const settings = {
      siteName: 'MSC Web',
      siteDescription: 'Microsoft Student Community',
      contactEmail: 'contact@msc.com',
      allowRegistration: true,
      requireEmailVerification: false,
      maxFileSize: 5242880, // 5MB
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
      smtpEnabled: false,
      maintenanceMode: false
    };

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update system settings
// @route   PUT /api/admin/settings
// @access  Private (Admin)
export const updateSettings = async (req, res) => {
  try {
    // This would typically update a settings collection
    // For now, just return success
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: req.body
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Helper function to get monthly stats
const getMonthlyStats = async () => {
  const currentDate = new Date();
  const last12Months = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);

    const [users, events, certificates, contacts] = await Promise.all([
      User.countDocuments({
        createdAt: { $gte: date, $lt: nextMonth }
      }),
      Event.countDocuments({
        createdAt: { $gte: date, $lt: nextMonth }
      }),
      Certificate.countDocuments({
        createdAt: { $gte: date, $lt: nextMonth }
      }),
      Contact.countDocuments({
        createdAt: { $gte: date, $lt: nextMonth }
      })
    ]);

    last12Months.push({
      month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
      users,
      events,
      certificates,
      contacts
    });
  }

  return last12Months;
};
