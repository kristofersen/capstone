const mongoose = require('mongoose');

// Define User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  userrole: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean },
  firstName: String,
  middleName: String,
  lastName: String,
  contactNumber: String,
  address: String,
  lastLoginDate: { type: Date },
  lastLogoutDate: { type: Date },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  isOnline: { type: Boolean, default: false },
  region: String,
  district: String,
  otpcontent: {
    otp: { type: String },
    otpExpires: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    lastOtpSentAt: { type: Date, default: null }
  },
  workPermits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkPermit' }],
  businessPermits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessPermit' }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };