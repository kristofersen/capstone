const mongoose = require('mongoose');

// Define Business Permit schema and model
const businessPermitSchema = new mongoose.Schema({
  id: { type: String, required: true,},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permittype: { type: String, required: true, default: 'BP' },
  businesspermitstatus: { type: String, required: true, },
  businessstatus: {type: String},
  forretirement: {type: String},
  classification: { type: String },
  totalgrosssales: {type: String},
  totaltax: {type: String},
  transaction: { type: String },
  amountToPay: {type: String },
  paymentStatus: {type: String},
  permitnumber: {type: String},
  permitFile: {type: String},
  permitDateIssued: {type: String},
  permitExpiryDate: {type:String},
  expiryDate: {type: String},
  applicationdateIssued: { type: Date, default: Date.now },
  applicationComments: {type: String},
  owner: {
corporation: Boolean,
lastname: String,
firstname: String,
middleinitial: String,
civilstatus: String,
companyname: String,
gender: String,
citizenship: String,
tinnumber: String,
representative: Boolean,
houseandlot: String,
buildingstreetname: String,
subdivision: String,
region: String,
province: String,
municipality: String,
barangay: String,
telephonenumber: String,
mobilenumber: String,
email: String,
    representativedetails: {
      repfullname: String,
      repdesignation: String,
      repmobilenumber: String,
    }
  },
  business: {
businessname: String,
businessscale: String,
paymentmethod: String,
businessbuildingblocklot: String,
businessbuildingname: String,
businesssubcompname: String,
businessregion: String,
businessprovince: String,
businessmunicipality: String,
businessbarangay: String,
businesszip: String,
businesscontactnumber: String,
ownershiptype: String,
agencyregistered: String,
dtiregistrationnum: String,
dtiregistrationdate: String,
dtiregistrationexpdate: String,
secregistrationnum: String,
birregistrationnum: String,
industrysector: String,
businessoperation: String,
typeofbusiness: String,
  },
  otherbusinessinfo:{
    dateestablished: String,
    startdate: String,
    occupancy: String,
    otherbusinesstype: String,
    businessemail: String,
    businessarea: String,
    businesslotarea: String,
    numofworkermale: String,
    numofworkerfemale: String,
    numofworkertotal: String,
    numofworkerlgu: String,
    lessorfullname: String,
    lessormobilenumber: String,
    monthlyrent: String,
    lessorfulladdress: String,
    lessoremailaddress: String,
    
  },
  mapview:{
    lat: String,
    lng: String,
  },
  businesses: [
    {
      businessNature: { type: String,},
      businessType: { type: String,},
      capitalInvestment: { type: Number,},
      lastYearGross: { type: Number,},
      tax: { type: Number,}
    },
  ],
  files: {
    document1: String,
    document2: String,
    document3: String,
    document4: String,
    document5: String,
    document6: String,
    document7: String,
    document8: String,
    document9: String,
    document10: String,
    document11: String,
    document12: String,
    remarksdoc1: String,
    remarksdoc2: String,
    remarksdoc3: String,
    remarksdoc4: String,
    remarksdoc5: String,
    remarksdoc6: String,
    remarksdoc7: String,
    remarksdoc8: String,
    remarksdoc9: String,
    remarksdoc10: String,
    remarksdoc11: String,
    remarksdoc12: String,
  },
  department:{
    Zoning: String,
    OffBldOfcl: String,
    CtyHlthOff: String,
    BreuFrPrt: String,
  },
  statementofaccount:{
    permitassessed: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Store a single user ID
    dateassessed: { type: String }, // You can change this to Date if you prefer
    mayorspermit: { type: String },
    sanitary: { type: String },
    health: { type: String },
    businessplate: { type: String },
    zoningclearance: { type: String },
    annualInspection: { type: String },
    environmental: { type: String }, // Add this if it's part of the schema
    miscfee: { type: String },
    liquortobaco: { type: String },
    liquorplate: { type: String },
    statementofaccountfile: { type: String }
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

module.exports = { BusinessPermit };