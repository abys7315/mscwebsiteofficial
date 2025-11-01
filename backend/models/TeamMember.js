import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: [true, 'Timestamp is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot be more than 100 characters']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  teamMember: {
    type: String,
    required: [true, 'Team member role is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  skills: [{
    type: String,
    trim: true
  }],
  driveLink: {
    type: String,
    match: [
      /^https?:\/\/.+/,
      'Please enter a valid URL'
    ]
  },
  linkedIn: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
teamMemberSchema.index({ email: 1 });
teamMemberSchema.index({ designation: 1 });
teamMemberSchema.index({ teamMember: 1 });
teamMemberSchema.index({ status: 1 });
teamMemberSchema.index({ createdAt: -1 });

// Virtual for display name
teamMemberSchema.virtual('displayName').get(function() {
  return this.fullName;
});

// Virtual for team role
teamMemberSchema.virtual('teamRole').get(function() {
  return `${this.designation} - ${this.teamMember}`;
});

export default mongoose.model('TeamMember', teamMemberSchema);
