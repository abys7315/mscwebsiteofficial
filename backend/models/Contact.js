import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot be more than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  category: {
    type: String,
    enum: ['general', 'support', 'partnership', 'feedback', 'bug-report', 'feature-request', 'other'],
    default: 'general'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  }],
  responses: [{
    from: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    attachments: [{
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      url: String
    }],
    sentAt: {
      type: Date,
      default: Date.now
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  metadata: {
    userAgent: String,
    ipAddress: String,
    referrer: String,
    source: {
      type: String,
      enum: ['website', 'mobile', 'api'],
      default: 'website'
    }
  },
  resolvedAt: Date,
  closedAt: Date,
  satisfactionRating: {
    type: Number,
    min: 1,
    max: 5
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date
}, {
  timestamps: true
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ category: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ assignedTo: 1 });

// Virtual for checking if contact is overdue
contactSchema.virtual('isOverdue').get(function() {
  const daysSinceCreation = (new Date() - this.createdAt) / (1000 * 60 * 60 * 24);
  const priorityDays = {
    'low': 7,
    'medium': 3,
    'high': 1,
    'urgent': 0.5
  };

  return daysSinceCreation > priorityDays[this.priority];
});

// Pre-save middleware to set resolved/closed dates
contactSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'resolved' && !this.resolvedAt) {
      this.resolvedAt = new Date();
    }
    if (this.status === 'closed' && !this.closedAt) {
      this.closedAt = new Date();
    }
  }
  next();
});

export default mongoose.model('Contact', contactSchema);
