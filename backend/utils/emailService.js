import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"MSC Web" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments || []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  welcome: (user) => ({
    subject: 'Welcome to MSC Web!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Microsoft Student Community!</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for joining MSC Web! We're excited to have you as part of our community.</p>
        <p>You can now:</p>
        <ul>
          <li>Register for events and workshops</li>
          <li>Access exclusive resources</li>
          <li>Connect with fellow students</li>
          <li>Participate in competitions</li>
        </ul>
        <p>Best regards,<br>MSC Web Team</p>
      </div>
    `
  }),

  eventRegistration: (user, event) => ({
    subject: `Registration Confirmed: ${event.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Event Registration Confirmed</h2>
        <p>Hi ${user.name},</p>
        <p>Your registration for <strong>${event.title}</strong> has been confirmed!</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Event Details:</strong></p>
          <p><strong>Date:</strong> ${new Date(event.startDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date(event.startDate).toLocaleTimeString()}</p>
          <p><strong>Venue:</strong> ${event.venue?.name || 'TBA'}</p>
        </div>
        <p>Please arrive 15 minutes early. Don't forget to bring your student ID.</p>
        <p>Best regards,<br>MSC Web Team</p>
      </div>
    `
  }),

  certificateIssued: (certificate) => ({
    subject: 'Certificate Issued',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Certificate Issued</h2>
        <p>Hi ${certificate.recipient.name},</p>
        <p>Congratulations! A new certificate has been issued for you.</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Certificate Details:</strong></p>
          <p><strong>Title:</strong> ${certificate.title}</p>
          <p><strong>Certificate ID:</strong> ${certificate.certificateId}</p>
          <p><strong>Issued Date:</strong> ${new Date(certificate.issueDate).toLocaleDateString()}</p>
          <p><strong>Issuer:</strong> ${certificate.issuer.organization}</p>
        </div>
        <p>You can verify your certificate at: <a href="${process.env.FRONTEND_URL}/certificate">Certificate Verification</a></p>
        <p>Best regards,<br>MSC Web Team</p>
      </div>
    `
  }),

  contactResponse: (contact, response) => ({
    subject: `Re: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Response to Your Inquiry</h2>
        <p>Hi ${contact.name},</p>
        <p>Thank you for contacting MSC Web. Here's our response to your inquiry:</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Your Original Message:</strong></p>
          <p>${contact.message}</p>
        </div>
        <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Our Response:</strong></p>
          <p>${response.message}</p>
        </div>
        <p>If you have any further questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>MSC Web Team</p>
      </div>
    `
  }),

  passwordReset: (user, resetToken) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${user.name},</p>
        <p>You requested a password reset for your MSC Web account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>MSC Web Team</p>
      </div>
    `
  })
};
