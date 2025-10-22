import mongoose from 'mongoose';

const joinRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
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
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    minlength: [10, 'Phone number must be exactly 10 digits'],
    maxlength: [10, 'Phone number must be exactly 10 digits']
  },
  regNo: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true,
    trim: true
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: ['CSE', 'ECE', 'MECH', 'CIVIL']
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    enum: ['1', '2', '3', '4']
  },
  interests: [{
    type: String,
    required: [true, 'At least one interest team is required'],
    enum: [
      "Technical",
      "Hi Tech",
      "Creative/Design",
      "Marketing",
      "Documentation",
      "Event Management",
      "Public Relations",
      "Outreach",
      "Social Media",
      "Research and Development"
    ]
  }],
  motivation: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  joinReason: {
    type: String,
    required: [true, 'Join reason is required'],
    minlength: [10, 'Join reason must be at least 10 characters'],
    maxlength: [500, 'Join reason cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  reviewNotes: String,
  metadata: {
    userAgent: String,
    ipAddress: String,
    referrer: String,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
joinRequestSchema.index({ email: 1 });
joinRequestSchema.index({ phone: 1 });
joinRequestSchema.index({ regNo: 1 });
joinRequestSchema.index({ status: 1 });
joinRequestSchema.index({ createdAt: -1 });
joinRequestSchema.index({ branch: 1 });
joinRequestSchema.index({ year: 1 });

// Virtual for full year name
joinRequestSchema.virtual('yearName').get(function() {
  const yearMap = {
    '1': 'First Year',
    '2': 'Second Year',
    '3': 'Third Year',
    '4': 'Fourth Year'
  };
  return yearMap[this.year] || this.year;
});

// Virtual for branch full name
joinRequestSchema.virtual('branchName').get(function() {
  const branchMap = {
    'CSE': 'Computer Science',
    'ECE': 'Electronics',
    'MECH': 'Mechanical',
    'CIVIL': 'Civil'
  };
  return branchMap[this.branch] || this.branch;
});

export default mongoose.model('JoinRequest', joinRequestSchema);
