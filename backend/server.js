const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();

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
  firstName: String,
  middleName: String,
  lastName: String,
  contactNumber: String,
  address: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'superadmin', 'dataController'], default: 'user' },
  admins: [{ type: Schema.Types.ObjectId, ref: 'Admin' }], // Reference to the Admin model
  isVerified: { type: Boolean },
  otp: { type: String }, // Store OTP
  otpExpires: { type: Date }, // Store OTP expiration
  otpAttempts: {
    type: Number,
    default: 0
  },
  lastOtpSentAt: {
    type: Date,
    default: null
  }
});

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  // Other fields related to the admin
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

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
  },
  emergencyContact: {
    name: String,
    mobileTel: String,
    address: String
  },
  statusWork: { type: String, required: true, default: 'Pending' },
  transaction: { type: String, required: true, default: 'Processing' },
  dateIssued: { type: Date, default: Date.now },
  expiryDate: { type: Date, default: () => Date.now() + 31536000000 }

}, { timestamps: true });

const WorkPermit = mongoose.model('WorkPermit', workPermitSchema);

// Routes
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

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      contactNumber,
      address,
      email,
      password: hashedPassword,
      isVerified: false
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
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email is not verified' });
    }
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful!', token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
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
    const lastOtpSentAt = user.lastOtpSentAt;
    const otpAttempts = user.otpAttempts;

    if (lastOtpSentAt && otpAttempts >= 5 && (now - lastOtpSentAt) < 3 * 60 * 60 * 1000) { // 3 hours
      return res.status(429).json({ error: 'OTP limit reached. Please try again later.' });
    }

    // Generate new OTP
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP for email verification is: ${otp}`,
    });

    // Update OTP attempt and timestamp
    user.otpAttempts = otpAttempts + 1;
    user.lastOtpSentAt = now;
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
    if (user.otp === otp && user.otpExpires > new Date()) {
      user.isVerified = true; // Mark email as verified
      user.otp = null; // Clear OTP
      user.otpExpires = null; // Clear OTP expiration
      user.otpAttempts = null;
      user.lastOtpSentAt = null;
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
    if (user.otp === otp && user.otpExpires > new Date()) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update the user's password
      user.password = hashedPassword;
      user.otp = null; // Clear OTP after use
      user.otpExpires = null; // Clear OTP expiration
      user.otpAttempts = null;
      user.lastOtpSentAt = null;
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

app.post('/workpermitpage', async (req, res) => {

  try {
    // Get the userID from the decoded token
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userID = decoded.userId;

    // Create a new work permit application
    const newWorkPermit = new WorkPermit({
      statusWork,
      transaction,
      dateIssued,
      expiryDate
    });

    

    // Save the new application to the database
    await newWorkPermit.save();
    
       // Retrieve all working permit applications for the user
      const workPermits = await WorkPermit.find({ userID });

    res.status(200).json({ businessPermits });
    res.status(201).json({ message: 'Work Permit Application submitted successfully!' });
  } catch (error) {
    
    console.error('Error saving work permit application:', error);
    res.status(500).json({ error: 'An error occurred while saving the work permit application.' });
  }
});

//#region SuperAdmin

// API fo superadmin login
app.post('/superadmin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: 'superadmin' });
    if (!user) {
      console.log('Superadmin not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Function to seed the superadmin account
const seedSuperadmin = async () => {
  try {
    const existingSuperadmin = await User.findOne({ role: 'superadmin' });
    if (existingSuperadmin) {
      console.log('Superadmin already exists.');
      return;
    }

    
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const superadmin = new User({
      Id: 'S0',
      firstName: 'Super',
      lastName: 'Admin',
      email: 'awildandan@gmail.com',
      password: hashedPassword,
      role: 'superadmin',
      online: false // Superadmin is offline by default
    });

    await superadmin.save();
    console.log('Superadmin account created successfully!');
  } catch (error) {
    console.error('Error creating superadmin:', error);
  }
}; 

// Middleware to check if the user is a superadmin
function isSuperadmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract JWT from Authorization header
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    req.user = decoded; // Attach decoded user info to request object
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Superadmin route to get all users
app.post('/admin/users', isSuperadmin, async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      online: false // Users are offline by default
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Superadmin route to get a user by ID
app.get('/admin/users/:id', isSuperadmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Superadmin route to edit a user
app.put('/admin/users/:id', isSuperadmin, async (req, res) => {
  const { firstName, lastName, email, role } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.get('/admins', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Received token:', token);
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
    console.log('Decoded token:', decoded);
    const userId = decoded.userId;

    // Fetch all users with the role of 'admin'
    const admins = await User.find({ role: 'admin' }).populate('admins');

    if (!admins) {
      return res.status(404).json({ message: 'No admins found' });
    }

    // Send the list of admins to the superadmin
    res.json(admins);
  } catch (error) {
    console.error('Error retrieving admins:', error);
    res.status(500).json({ message: 'Error retrieving admins', error });
  }
});

// Create a new account
app.post('/accounts', async (req, res) => {
  const { firstName, middleName, lastName, contactNumber, address, email, password, role } = req.body;

  // Basic validation
  if (!firstName || !middleName || !lastName || !email || !password || !contactNumber || !address || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      contactNumber,
      address,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Error creating account' });
  }
});

//#endregion