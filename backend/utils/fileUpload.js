import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_PATH || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${uniqueSuffix}${extension}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;

  // Check extension
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime type
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
  }
};

// Upload middleware
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
  },
  fileFilter: fileFilter
});

// Single file upload
export const uploadSingle = (fieldName) => upload.single(fieldName);

// Multiple files upload
export const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);

// Mixed file upload (for different fields)
export const uploadFields = (fields) => upload.fields(fields);

// Certificate specific upload (images and PDFs)
export const uploadCertificate = upload.fields([
  { name: 'certificateImage', maxCount: 1 },
  { name: 'signatureImage', maxCount: 1 },
  { name: 'logoImage', maxCount: 1 }
]);

// General file upload for attachments
export const uploadAttachments = upload.array('attachments', 10);

// Error handler for multer
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size allowed is 5MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files uploaded.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }

  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  next(error);
};

// Delete file utility
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Get file info
export const getFileInfo = (file) => {
  if (!file) return null;

  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
    url: `/uploads/${file.filename}` // Assuming static file serving
  };
};
