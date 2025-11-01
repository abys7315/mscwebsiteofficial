import TeamMember from '../models/TeamMember.js';

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ status: 'active' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message
    });
  }
};

// Get team member by ID
export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: error.message
    });
  }
};

// Create team member
export const createTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body);

    res.status(201).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating team member',
      error: error.message
    });
  }
};

// Bulk create team members
export const bulkCreateTeamMembers = async (req, res) => {
  try {
    const teamMembers = req.body;

    if (!Array.isArray(teamMembers)) {
      return res.status(400).json({
        success: false,
        message: 'Request body must be an array of team members'
      });
    }

    const createdMembers = await TeamMember.insertMany(teamMembers, {
      ordered: false // Continue inserting even if some fail
    });

    res.status(201).json({
      success: true,
      count: createdMembers.length,
      data: createdMembers
    });
  } catch (error) {
    if (error.writeErrors) {
      // Handle bulk write errors
      const failedInserts = error.writeErrors.map(err => ({
        index: err.index,
        error: err.errmsg
      }));

      return res.status(207).json({
        success: true,
        message: 'Some team members were inserted successfully',
        insertedCount: error.insertedCount || 0,
        failedInserts
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error bulk creating team members',
      error: error.message
    });
  }
};

// Update team member
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating team member',
      error: error.message
    });
  }
};

// Delete team member
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
      error: error.message
    });
  }
};

// Get team members by designation
export const getTeamMembersByDesignation = async (req, res) => {
  try {
    const { designation } = req.params;

    const teamMembers = await TeamMember.find({
      designation: new RegExp(designation, 'i'),
      status: 'active'
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members by designation',
      error: error.message
    });
  }
};

// Get team members by team role
export const getTeamMembersByTeam = async (req, res) => {
  try {
    const { team } = req.params;

    const teamMembers = await TeamMember.find({
      teamMember: new RegExp(team, 'i'),
      status: 'active'
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members by team',
      error: error.message
    });
  }
};
