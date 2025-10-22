import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: [true, 'Certificate ID is required'],
    unique: true,
    uppercase: true,
    match: [/^[A-Z0-9]{8,12}$/, 'Certificate ID must be 8-12 alphanumeric characters']
  },
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  recipient: {
    name: {
      type: String,
      required: [true, 'Recipient name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Recipient email is required'],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
      ]
    },
    rollNumber: String,
    department: String,
    year: String
  },
  issuer: {
    name: {
      type: String,
      required: [true, 'Issuer name is required']
    },
    designation: String,
    organization: {
      type: String,
      required: [true, 'Organization is required']
    },
    signature: String // URL to signature image
  },
  event: {
    title: String,
    date: Date,
    type: {
      type: String,
      enum: ['workshop', 'competition', 'course', 'achievement', 'participation', 'other']
    }
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required'],
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  template: {
    type: String,
    enum: ['achievement', 'participation', 'completion', 'appreciation', 'custom'],
    default: 'achievement'
  },
  skills: [{
    type: String,
    trim: true
  }],
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F', 'Pass', 'Merit', 'Distinction'],
    uppercase: true
  },
  credits: {
    type: Number,
    min: 0
  },
  verificationCode: {
    type: String,
    unique: true,
    sparse: true // Allow null values but ensure uniqueness when present
  },
  qrCode: {
    type: String // URL to QR code image
  },
  status: {
    type: String,
    enum: ['active', 'revoked', 'expired'],
    default: 'active'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  metadata: {
    fontFamily: {
      type: String,
      default: 'Arial'
    },
    primaryColor: {
      type: String,
      default: '#1a365d'
    },
    secondaryColor: {
      type: String,
      default: '#2d3748'
    },
    backgroundImage: String,
    logo: String
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  revokedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  revokeReason: String,
  revokeDate: Date,
  verificationHistory: [{
    verifiedBy: String, // IP address or user info
    verifiedAt: {
      type: Date,
      default: Date.now
    },
    userAgent: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
certificateSchema.index({ certificateId: 1 });
certificateSchema.index({ 'recipient.email': 1 });
certificateSchema.index({ verificationCode: 1 });
certificateSchema.index({ status: 1 });
certificateSchema.index({ issueDate: -1 });
certificateSchema.index({ issuedBy: 1 });

// Virtual for checking if certificate is valid
certificateSchema.virtual('isValid').get(function() {
  return this.status === 'active' &&
         (!this.expiryDate || this.expiryDate > new Date());
});

// Pre-save middleware to generate verification code
certificateSchema.pre('save', function(next) {
  if (!this.verificationCode) {
    this.verificationCode = Math.random().toString(36).substring(2, 15) +
                           Math.random().toString(36).substring(2, 15);
  }
  next();
});

// Static method to find certificate by ID or verification code
certificateSchema.statics.findByIdentifier = function(identifier) {
  return this.findOne({
    $or: [
      { certificateId: identifier.toUpperCase() },
      { verificationCode: identifier }
    ]
  });
};

export default mongoose.model('Certificate', certificateSchema);
