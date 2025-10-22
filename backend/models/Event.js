import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot be more than 300 characters']
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['workshop', 'seminar', 'competition', 'hackathon', 'networking', 'cultural', 'technical', 'other'],
    default: 'other'
  },
  type: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    default: 'offline'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'Registration deadline is required']
  },
  venue: {
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  onlineLink: {
    type: String,
    match: [
      /^https?:\/\/.+/,
      'Please enter a valid URL'
    ]
  },
  capacity: {
    type: Number,
    min: [1, 'Capacity must be at least 1']
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  organizers: [{
    name: {
      type: String,
      required: true
    },
    email: String,
    role: String,
    avatar: String
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  agenda: [{
    time: String,
    activity: {
      type: String,
      required: true
    },
    description: String,
    speaker: String
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['document', 'video', 'link', 'code']
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  allowRegistration: {
    type: Boolean,
    default: true
  },
  registrationFields: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['text', 'email', 'number', 'select', 'checkbox', 'textarea'],
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    options: [String], // For select fields
    placeholder: String
  }],
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    registrationData: mongoose.Schema.Types.Mixed,
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered'
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
eventSchema.index({ startDate: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ featured: 1 });
eventSchema.index({ 'venue.city': 1 });
eventSchema.index({ tags: 1 });
eventSchema.index({ createdBy: 1 });

// Virtual for checking if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return this.startDate > new Date();
});

// Virtual for checking if registration is open
eventSchema.virtual('isRegistrationOpen').get(function() {
  return this.allowRegistration &&
         this.status === 'published' &&
         this.registrationDeadline > new Date() &&
         (!this.capacity || this.registeredCount < this.capacity);
});

// Pre-save middleware to update registeredCount
eventSchema.pre('save', function(next) {
  if (this.participants) {
    this.registeredCount = this.participants.filter(p => p.status === 'registered').length;
  }
  next();
});

export default mongoose.model('Event', eventSchema);
