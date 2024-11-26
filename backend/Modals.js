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
  isOnline: { type: Boolean, default: false },
  region: String,
  district: String,
  otpcontent: {
    otp: { type: String },
    otpExpires: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    lastOtpSentAt: { type: Date, default: null }
  },
  workPermits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkPermit' }]
});

const User = mongoose.model('User', userSchema);

// Define schema and model for Business Permit Application
const businessPermitSchema = new mongoose.Schema({
  id: { type: String, required: true,},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permittype: { type: String, required: true, default: 'BP' },
  businesspermitstatus: { type: String, required: true, },
  classification: { type: String },
  transaction: { type: String },
  amountToPay: {type: String },
  permitFile: {type: String},
  permitDateIssued: {type: String},
  permitExpiryDate: {type:String},
  expiryDate: {type: String},
  applicationdateIssued: { type: Date, default: Date.now },
  applicationComments: {type: String},
  owner: {
    lastName: String,
    firstName: String,
    middleInitial: String,
    civilstatus: String,
    gender: String,
    citizenship: String,
    tinnumber: String,
    representative: String,
    representativedetails: {
      repfullname: String,
      repdesignation: String,
      repmobilenumber: String,
    }
  },
  businessReference: {
    businessname: String,
    businessscale: String,
    paymentmethod: String,
    buildingblocklot: String,
    buildingname: String,
    subdivisioncompoundName: String,
    region: String,
    province: String,
    municipality: String,
    barangay: String,
    businessstreet: String,
    zone: String,
    zip: String,
    contactnumber: String,
  },
  files: {
    document1: String,
    document2: String,
    document3: String,
    document4: String,
  },
  receipt: {
    receiptId: String, //Generated
    modeOfPayment: String, //online, onsite
    paymentType: String, // gcash, bank payment, onsite
    paymentNumber: String, // gcashnumber, card number
    receiptName: String, //user's name
    receiptAddress: String, // user's address
    receiptDate: String, //date
    amountPaid: String, // amount
    receiptFile: String,
  },
}, { timestamps: true });

const BusinessPermit = mongoose.model('BusinessPermit', businessPermitSchema);

// Define Work Permit schema and model
const workPermitSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permittype: { type: String, required: true, default: 'WP' },
  workpermitstatus: { type: String, required: true },
  classification: { type: String, required: true },
  transaction: { type: String },
  amountToPay: { type: String },
  permitFile: { type: String },
  permitDateIssued: { type: String },
  permitExpiryDate: { type: String },
  expiryDate: { type: String },
  applicationdateIssued: { type: Date, default: Date.now },
  applicationComments: { type: String },
  formData: {
    personalInformation: {
      lastName: String,
      firstName: String,
      middleInitial: String,
      permanentAddress: String,
      currentlyResiding: Boolean,
      temporaryAddress: String,
      dateOfBirth: Date,
      age: Number,
      placeOfBirth: String,
      citizenship: String,
      civilStatus: String,
      gender: String,
      height: String,
      weight: String,
      mobileTel: String,
      email: String,
      educationalAttainment: String,
      natureOfWork: String,
      placeOfWork: String,
      companyName: String,
      workpermitclassification: String
    },
    emergencyContact: {
      name2: String,
      mobileTel2: String,
      address: String
    },
    files: {
      document1: String,
      document2: String,
      document3: String,
      document4: String
    }
  },
  receipt: {
    receiptId: String,
    modeOfPayment: String,
    paymentType: String,
    paymentNumber: String,
    receiptName: String,
    receiptAddress: String,
    receiptDate: String,
    amountPaid: String,
    receiptFile: String
  }
}, { timestamps: true });

const WorkPermit = mongoose.model('WorkPermit', workPermitSchema);

const PersonSchema = new mongoose.Schema({
  name: String,
  email: String,
  applicationForm: {
    age: Number,
    address: String,
    phoneNumber: String,
    isActive: Boolean,
  },
  files: {
    document1: String,
    document2: String,
    document3: String,
  },
  businesses: [
    {
      businessNature: { type: String,},
      businessType: { type: String,},
      capitalInvestment: { type: Number,},
    },
  ],
});


const Person = mongoose.model('Person', PersonSchema);

module.exports = {
  User,
  BusinessPermit,
  WorkPermit,
  Person
};
