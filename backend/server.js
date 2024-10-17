const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit'); 


const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret key in production

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'obwpls@gmail.com', // Your email
    pass: 'sbfobqnspuabeyqz',  // Your email password or app password
  },
});


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: 'your_session_secret', // Replace with a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/obpwlsdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  seedSuperadmin(); // Seed superadmin on startup
}).catch(err => console.log(err));

// Define schemas and models
const userSchema = new mongoose.Schema({
  //For All
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
  accountOpenedDate: String,
  //Otp Group
  otpcontent:{
  otp: { type: String }, // Store OTP
  otpExpires: { type: Date }, // Store OTP expiration
  otpAttempts: {
    type: Number,
    default: 0
  },
  lastOtpSentAt: {
    type: Date,
    default: null
  },
  },
  //For Client
  workPermits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkPermit' }],
  timeIn: { type: Date },
  timeOut: { type: Date }
}, {
  timestamps: true
  
});

const User = mongoose.model('User', userSchema);



// Define schema and model for Business Permit Application
const businessPermitSchema = new mongoose.Schema({
  owner: {
    lastName: String,
    firstName: String,
    middleInitial: String,
    civilStatus: String,
    gender: String,
    citizenship: String,
    tinNumber: String,
    isRepresentative: Boolean,
    representative: {
      fullName: String,
      designation: String,
      mobileNumber: String,
    }
  },
  businessReference: {
    businessName: String,
    businessScale: String,
    paymentMethod: String,
    houseBuildingNo: String,
    buildingStreetName: String,
    subdivisionCompoundName: String,
    region: String,
    province: String,
    cityMunicipality: String,
    barangay: String,
    businessStreet: String,
    zone: String,
    zip: String,
    contactNumber: String,
  },
  bui: { type: String, required: true, default: 'Pending' },
  transaction: { type: String, required: true, default: 'Processing' },
  dateIssued: { type: Date, default: Date.now },
  expiryDate: { type: Date, default: () => Date.now() + 31536000000 }
}, { timestamps: true });

const BusinessPermit = mongoose.model('BusinessPermit', businessPermitSchema);

const workPermitSchema = new mongoose.Schema({
  id: { type: String, required: true,},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  permittype: { type: String, required: true, default: 'WP' },
  workpermitstatus: { type: String, required: true, },
  classification: { type: String, required: true, },
  transaction: { type: String },
  amountToPay: {type: String },
  permitFile: {type: String},
  dateIssued: { type: Date, default: Date.now },
  formData:
{
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
    workpermitclassification: String,
  },
  emergencyContact: {
    name2: String,
    mobileTel22: String,
    address: String
  },
  files: {
    document1: String,
    document2: String,
    document3: String,
    document4: String,
  },
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
}, 
{ timestamps: true },
);

const WorkPermit = mongoose.model('WorkPermit', workPermitSchema);



// #region Client
app.post('/signup', async (req, res) => {
  const { firstName, middleName, lastName, contactNumber, address, email, password } = req.body;

  // Basic validation
  if (!firstName || !middleName || !lastName || !email || !password || !contactNumber || !address) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const userID = await generateUserId('CL');
    // Hash the password before saving it to the database 
    const hashedPassword = await bcrypt.hash(password, 10);
    // User is client when registering
    const userRole = "Client"
    // Create new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      contactNumber,
      address,
      email,
      password: hashedPassword,
      isVerified: false,
      userrole: userRole,
      userId: userID,
  
    

    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error); // Log detailed error
  }
});

// /login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    // Check if the email is verified
    if (!user || !user.isVerified) {
      return res.status(400).json({ error: 'Email is not verified' });
    }
    
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '3h' });
      
      // Return the role along with the token
      res.status(200).json({ 
        message: 'Login successful!', 
        token, 
        role: user.userrole // Assuming the field is named `userrole`
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error logging in' });
  }
});



app.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.userId);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP

// Send OTP Route
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if cooldown period has passed
    const now = new Date();
    const lastOtpSentAt = user.otpcontent.lastOtpSentAt;
    const otpAttempts = user.otpcontent.otpAttempts;

    if (lastOtpSentAt && otpAttempts >= 5 && (now - lastOtpSentAt) < 3 * 60 * 60 * 1000) { // 3 hours
      return res.status(429).json({ error: 'OTP limit reached. Please try again later.' });
    }

    // Generate new OTP
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    user.otpcontent.otp = otp;
    user.otpcontent.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP for email verification is: ${otp}`,
    });

    // Update OTP attempt and timestamp
    user.otpcontent.otpAttempts = otpAttempts + 1;
    user.otpcontent.lastOtpSentAt = now;
    await user.save();

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Verify OTP Route
app.post('/verify-emailotp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if OTP matches and is still valid
    if (user.otpcontent.otp === otp && user.otpcontent.otpExpires > new Date()) {
      user.isVerified = true; // Mark email as verified
      user.otpcontent.otp = null; // Clear OTP
      user.otpcontent.otpExpires = null; // Clear OTP expiration
      user.otpcontent.otpAttempts = null;
      user.otpcontent.lastOtpSentAt = null;
      await user.save();
      res.json({ message: 'Email verified successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid or expired OTP.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error verifying OTP. Please try again.' });
  }
});

// Route for updating the password
app.post('/update-password', async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if OTP matches and is still valid
    if (user.otpcontent.otp === otp && user.otpcontent.otpExpires > new Date()) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update the user's password
      user.password = hashedPassword;
      user.otpcontent.otp = null; // Clear OTP after use
      user.otpcontent.otpExpires = null; // Clear OTP expiration
      user.otpcontent.otpAttempts = null;
      user.otpcontent.lastOtpSentAt = null;
      await user.save();

      res.json({ message: 'Password updated successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid or expired OTP.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating password. Please try again.' });
  }
});

// Route to get all business permit applications
app.post('/businesspermitpage', async (req, res) => {

  try {
    // Get the userID from the decoded token
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userID = decoded.userId;
    
    // Create a new business permit application
    const newBusinessPermit = new BusinessPermit({

      statusBusiness,
      transaction,
      dateIssued,
      expiryDate
    });

    // Save the new application to the database
    await newBusinessPermit.save();

       // Retrieve all business permit applications for the user
    const businessPermits = await BusinessPermit.find({ userID });
    
    res.status(200).json({ workPermits });
    res.status(201).json({ message: 'Business Permit Application submitted successfully!' });
  } catch (error) {
    console.error('Error saving business permit application:', error);
    res.status(500).json({ error: 'An error occurred while saving the application.' });
  }
});

app.post('/workpermitpage', upload.fields([
  { name: 'document1', maxCount: 1 },
  { name: 'document2', maxCount: 1 },
  { name: 'document3', maxCount: 1 },
  { name: 'document4', maxCount: 1 }
]), async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Received token:', token);
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const files = req.files;
  const {
    lastName,
    firstName,
    middleInitial,
    permanentAddress,
    currentlyResiding,
    temporaryAddress,
    dateOfBirth,
    age,
    placeOfBirth,
    citizenship,
    civilStatus,
    gender,
    height,
    weight,
    mobileTel,
    email,
    educationalAttainment,
    natureOfWork,
    placeOfWork,
    companyName,
    name2,
    mobileTel2,
    address,
    workpermitclassification,
  } = req.body;
  console.log('Incoming data:', req.body);
  console.log(req.files)
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
    console.log('Decoded token:', decoded);
    
    const userId = decoded.userId;
    const permitID = await generatePermitID('WP');
    const status = "Pending";
    const classification = workpermitclassification;
    let amount; // Declare amountToPay outside the if-else block

    if (classification === "New") {
      amount = "0"; // Set amount for New classification
    } else if (classification === "Renew") {
      amount = "200"; // Set amount for Renew classification
    }

    // Create a new WorkPermit instance
    const newWorkPermit = new WorkPermit({
      id: permitID,
      userId,
      workpermitstatus: status,
      classification: classification,
      transaction: null,
      amountToPay: amount,
      permitFile: null,
      formData: {
        personalInformation: {
          lastName,
          firstName,
          middleInitial,
          permanentAddress,
          currentlyResiding: currentlyResiding === 'true',
          temporaryAddress,
          dateOfBirth,
          age,
          placeOfBirth,
          citizenship,
          civilStatus,
          gender,
          height,
          weight,
          mobileTel,
          email,
          educationalAttainment,
          natureOfWork,
          placeOfWork,
          companyName,
          workpermitclassification,
        },
        emergencyContact: {
          name2,
          mobileTel2,
          address,
        },
        files: {
          document1: files.document1 ? files.document1[0].path : null,
          document2: files.document2 ? files.document2[0].path : null,
          document3: files.document3 ? files.document3[0].path : null,
          document4: files.document4 ? files.document4[0].path : null,
        },
      },
      receipt: {
      receiptId: null, //Generated
      modeOfPayment: null, //online, onsite
      paymentType: null, // gcash, bank payment, onsite
      paymentNumber: null, // gcashnumber, card number
      receiptName: null, //user's name
      receiptDate: null, //date
      amountPaid: null, // amount
      receiptFile: null,
      }
    });

    // Save new work permit and retrieve its _id
    const savedWorkPermit = await newWorkPermit.save();
    console.log('Saved WorkPermit ID:', savedWorkPermit._id); // Log the saved ID
    
    await User.findByIdAndUpdate(userId, { $push: { workPermits: savedWorkPermit._id } });
    
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error saving application:', error.message); // Log the error message
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});


// Function to generate unique permit ID
async function generatePermitID(permitType) {
  const today = new Date();
  
  // Get the current date in DDMMYYYY format
  const year = today.getFullYear(); 
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${day}${month}${year}`;

  try {
      // Fetch the latest permit ID for the given permit type where the ID matches today's date exactly
      const latestPermit = await WorkPermit.findOne({
          permittype: permitType,
          id: { $regex: `^${permitType}\\d{4}${dateString}$` } // Match permits for today
      }).sort({ id: -1 }); // Sort to get the latest permit ID for today

      let sequenceNumber = 1; // Default to 1 if no permits exist for today

      if (latestPermit) {
          // Extract the sequence number from the latest permit ID
          const latestPermitID = latestPermit.id;

          // Use a regex to extract the 4-digit sequence part (assuming format: WP0001DDMMYYYY)
          const match = latestPermitID.match(new RegExp(`^${permitType}(\\d{4})${dateString}$`));

          if (match) {
              sequenceNumber = parseInt(match[1], 10) + 1; // Increment by 1
          }
      }

      // Pad sequence number to ensure it's always 4 digits
      const sequenceString = String(sequenceNumber).padStart(4, '0');

      // Construct the final permit ID
      const permitID = `${permitType}${sequenceString}${dateString}`;

      // Return the constructed permit ID
      return permitID; 
  } catch (error) {
      console.error('Error generating permit ID:', error);
      throw error; // or handle the error as needed
  }
}

async function generateUserId(role) {
  const today = new Date();

  // Get the current date in YYYYMMDD format
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`; // YYYYMMDD format

  try {
      // Fetch the latest user ID for the given role
      const latestUser = await User.findOne({
          userId: { $regex: `^USER${role}\\d{4}${formattedDate}$` } // Match users for today
      }).sort({ userId: -1 }); // Sort to get the latest user ID for today

      let sequenceNumber = 1; // Default to 1 if no users exist for today

      if (latestUser) {
          // Extract the sequence number from the latest user ID
          const latestUserID = latestUser.userId;

          // Use a regex to extract the 4-digit sequence part (assuming format: USER<role><seq><date>)
          const match = latestUserID.match(new RegExp(`^USER${role}(\\d{4})${formattedDate}$`));

          if (match) {
              sequenceNumber = parseInt(match[1], 10) + 1; // Increment by 1
          }
      }

      // Pad sequence number to ensure it's always 4 digits
      const sequenceString = String(sequenceNumber).padStart(4, '0');

      // Construct the final user ID
      const userID = `USER${role}${sequenceString}${formattedDate}`;

      // Return the constructed user ID
      return userID; 
  } catch (error) {
      console.error('Error generating user ID:', error);
      throw error; // or handle the error as needed
  }
}

// Example usage
async function createUser(role) {
  const userId = await generateUserId(role);
  console.log('Generated User ID:', userId);
  // Here you can create the user in your database with the generated user ID
}

// Example calls
//createUser('ADM'); // For Admin
//createUser('DC'); // For Data Controller
//createUser('CL'); // For Client



app.get('/workpermits', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Received token:', token);
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
    console.log('Decoded token:', decoded);
    const userId = decoded.userId;

    // Fetch user and populate work permits
    const user = await User.findById(userId).populate('workPermits');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the populated work permits to the client
    res.json(user.workPermits);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving work permits', error });
  }
});


app.get('/workpermitdetails/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get userId
    const userId = decoded.userId;
console.log(userId);
    // Find the user by ID
    const user = await User.findById(userId).populate('workPermits'); // Populate work permits
console.log(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the specified work permit
    const workPermit = user.workPermits.find(permit => permit._id.toString() === id);
    console.log(workPermit);
    if (!workPermit) {
      return res.status(404).json({ message: 'Work permit not found for this user' });
    }

    // Return the specific work permit details
    res.json(workPermit);
  } catch (error) {
    console.error('Error retrieving work permit:', error);
    res.status(500).json({ message: 'Error retrieving work permit', error });
  }
});


// Apptest Codes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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
});

const Person = mongoose.model('Person', PersonSchema);


app.post('/apptesting', upload.fields([
  { name: 'document1', maxCount: 1 },
  { name: 'document2', maxCount: 1 },
  { name: 'document3', maxCount: 1 },
]), async (req, res) => {
  const { name, email, age, address, phoneNumber, isActive } = req.body;
  const files = req.files;
  try {
    const newPerson = new Person({
      name,
      email,
      applicationForm: {
        age,
        address,
        phoneNumber,
        isActive: isActive === 'true',
      },
     files: {
        document1: files.document1 ? files.document1[0].path : null,
        document2: files.document2 ? files.document2[0].path : null,
       document3: files.document3 ? files.document3[0].path : null,

      },
    });

    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});
// Apptest Codes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get('/workpermits', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Received token:', token);
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
    console.log('Decoded token:', decoded);
    const userId = decoded.userId;

    // Fetch user and populate work permits
    const user = await User.findById(userId).populate('workPermits');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the populated work permits to the client
    res.json(user.workPermits);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving work permits', error });
  }
});

// Apptest Codes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get('/api/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  
  try {
    const users = await Person.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname)));
// Apptest Codes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




//#endregion

// API for superadmin login
app.post('/superadmin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, userrole: 'superadmin' });
    if (!user) {
      console.log('Superadmin not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/adduser', async (req, res) => {
  const { firstName, middleName, lastName, contactNumber, email, address, password, userrole } = req.body;

  console.log('Incoming data:', req.body);
  
  try {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Declare variables for userRole and userID
    let userRole;
    let userID;

    // Assign userRole and userID based on the userrole from the request
    if (userrole === 'ADM') {
      userRole = 'Admin';
      userID = await generateUserId(userrole);
    } else if (userrole === 'CL') {
      userRole = 'Client';
      userID = await generateUserId(userrole);
    } else if (userrole === 'DC') {
      userRole = 'Data Controller';
      userID = await generateUserId(userrole);
    } else {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      contactNumber,
      email,
      address,
      userId: userID,
      password: hashedPassword,
      userrole: userRole, // Correct the variable name
      isVerified: true,
      accountOpenedDate: new Date().toISOString() 
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Function to seed the superadmin account
const seedSuperadmin = async () => {
  const SuperAdmin_Email = 'superadmin@example.com'; // Change to your super admin email
    const SuperAdmin_Password = 'admin123'; // Change to a secure password

    try {
        const superadminExists = await User.findOne({ email: SuperAdmin_Email });
        if (!superadminExists) {

          const hashedPassword = await bcrypt.hash(SuperAdmin_Password, 10);

            const superadminUser = new User({
                email: SuperAdmin_Email,
                password: hashedPassword, // This should be hashed in the User model
                userrole: 'superadmin',
                userId: 'superadmin',
                isVerified: true,
            });

            await superadminUser.save();
            console.log('Superadmin user created!');
        } else {
            console.log('Superadmin user already exists.');
        }
    } catch (error) {
        console.error('Error seeding superadmin user:', error);
    }
}; 

app.get('/adminusers', async (req, res) => {
  try {
    const users = await User.find({ userrole: 'Admin' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/datacontrollers', async (req, res) => {
  try {
    const users = await User.find({ userrole: 'Data Controller' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/account/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to fetch user data by ID
app.get('/accounts/:id', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API endpoint to update user data by ID
app.put('/accounts/:id', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body
    const user = await User.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log('Updated User:', user); // Log the updated user
    res.send(user);
  } catch (error) {
    console.error('Error updating user:', error); // Log the error
    res.status(500).send(error);
  }
});


// API endpoint to fetch online admins
app.get('/api/onlineAdmins', async (req, res) => {
  try {
    const onlineAdmins = await User.find({ role: 'admin', status: 'online' });
    res.json(onlineAdmins);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API endpoint to fetch online data controllers
app.get('/api/onlineDataControllers', async (req, res) => {
  try {
    const onlineDataControllers = await User.find({ role: 'dataController', status: 'online' });
    res.json(onlineDataControllers);
  } catch (error) {
    res.status(500).send(error);
  }
});



//#endregion


//Additional code for client @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Get the latest work permit application ID for a user


//End additional code for client @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// Code for DATA CONTROLLER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.get('/getworkpermits', async (req, res) => {
  try {
    const allWorkPermits = await WorkPermit.find(); // Retrieve all documents
    res.json(allWorkPermits); // Send them as a JSON response
  } catch (error) {
    console.error('Error fetching work permits:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/DCworkpermitdetails/:id', async (req, res) => {
  const { id } = req.params;  // Extract the work permit ID from the route parameters

  try {
    // Find the work permit directly by its ID
    const workPermit = await WorkPermit.findById(id);

    if (!workPermit) {
      return res.status(404).json({ message: 'Work permit not found' });
    }

    // Return the work permit details
    res.json(workPermit);
  } catch (error) {
    console.error('Error retrieving work permit:', error);
    res.status(500).json({ message: 'Error retrieving work permit', error });
  }
});


app.put('/work-permits/:id', async (req, res) => {
  console.log('Request body:', req.body); // Log incoming request body
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedPermit = await WorkPermit.findByIdAndUpdate(
      id,
      { workpermitstatus: status },
    );

    if (!updatedPermit) {
      return res.status(404).json({ message: 'Work permit not found' });
    }

    res.json(updatedPermit);
  } catch (error) {
    console.error('Error updating work permit:', error); // Log error
    res.status(500).json({ error: 'Error updating work permit' });
  }
});



app.put('/handlepayments/:id', async (req, res) => {
  console.log('Request params:', req.params); // Log incoming request body
  console.log('Request body:', req.body); 
  const { id, }= req.params;
  const receiptID = uuidv4();
  const { accountNumber, amount, paymentName, paymentMethod, paymentType } = req.body;
  const ContentData = {
    accountNumber: accountNumber, 
    amount: amount, 
    paymentName: paymentName, 
    paymentMethod: paymentMethod, 
    paymentType: paymentType,
    receiptID: receiptID,
    id: id,
  };

  try {
    const receiptFileName = generateReceiptPDF(ContentData);
    const workpermitFileName = await generateWorkPermitPDF(ContentData);
    console.log(workpermitFileName);
    const updatedPermit = await WorkPermit.findByIdAndUpdate(
      id,
      { $set: {
        workpermitstatus: "Released",
        transaction: paymentMethod,
        permitFile: workpermitFileName,
        receipt: {
        receiptID: receiptID,
        modeOfPayment: paymentMethod,
        paymentType: paymentType,
        paymentNumber: accountNumber,
        receiptName: paymentName,
        receiptDate: new Date().toISOString(),
        amountPaid: amount,
        receiptFile: receiptFileName,
      }
    }
    }
    );

    if (!updatedPermit) {
      return res.status(404).json({ message: 'Work permit not found' });
    }

    res.json(updatedPermit);
  } catch (error) {
    console.error('Error updating work permit:', error); // Log error
    res.status(500).json({ error: 'Error updating work permit' });
  }
});




// Function to generate PDF
const generateReceiptPDF = (ContentData) => {
    const doc = new PDFDocument();
    const receiptFileName = `receipt_${Date.now()}.pdf`;
    const receiptPath = path.join(receiptsDir, receiptFileName);

    const writeStream = fs.createWriteStream(receiptPath);
    doc.pipe(writeStream);
    doc.fontSize(25).text('Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Receipt ID: ${ContentData.receiptID}`);
    doc.text(`Customer: ${ContentData.paymentName}`);
    doc.text(`Account Number: ${ContentData.accountNumber}`);
    doc.text(`Mode of Payment: ${ContentData.paymentMethod}`);
    doc.moveDown();
    doc.text(`Total Amount: ₱${ContentData.amount}`, { bold: true });
    doc.end();

    return receiptFileName;
};


// Ensure the receipts directory exists
const receiptsDir = path.join(__dirname, 'receipts');
if (!fs.existsSync(receiptsDir)) {
    fs.mkdirSync(receiptsDir);
}
// Serve static files from the receipts directory
app.use('/receipts', express.static(receiptsDir));



// Define and create the workPermitsDir
const workPermitsDir = path.join(__dirname, 'permits'); 
if (!fs.existsSync(workPermitsDir)) {
  fs.mkdirSync(workPermitsDir);
}
// Serve the 'workpermits' directory as static files
app.use('/permits', express.static(workPermitsDir));


// Directory for work permit PDFs
const generateWorkPermitPDF = async (ContentData) => {
  const doc = new PDFDocument();
  const workPermitFileName = `workpermit_${ContentData.id}.pdf`;  // File name based on the ID
  const workPermitPath = path.join(workPermitsDir, workPermitFileName);

  try {
      // Fetch the work permit data by ID
      const workPermit = await WorkPermit.findById(ContentData.id);

      if (!workPermit) {
          throw new Error('Work permit not found');
      }


      const writeStream = fs.createWriteStream(workPermitPath);
      doc.pipe(writeStream);
      // Add content to the PDF
      doc.fontSize(20).text('Work Permit', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Work Permit ID: ${workPermit._id}`);
      doc.text(`Issued To: ${workPermit.formData.personalInformation.firstName}`);
      doc.text(`Mode of Payment: ${ContentData.paymentMethod}`);
      doc.text(`Payment Type: ${ContentData.paymentType}`);
      doc.text(`Permit Status: Released`);
      doc.text(`Issue Date: ${new Date(workPermit.receipt.receiptDate).toLocaleString()}`);
      doc.text(`Expiration Date: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleString()}`);

      doc.end();

      console.log(`Work Permit PDF created at ${workPermitFileName}`);

      return workPermitFileName;  // Return the path to the generated PDF
  } catch (error) {
      console.error('Error generating work permit PDF:', error);
      throw error;
  }
};