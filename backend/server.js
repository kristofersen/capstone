//#region imports
require('dotenv').config();
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
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret key in production
const server = http.createServer(app);
const io = socketIo(server);
const { User, BusinessPermit, WorkPermit, Person } = require('./Modals');

//#endregion imports

//#region middleware
// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, 
  },
});


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update to your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

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
  checkExpired();
}).catch(err => console.log(err));

//#endregion middleware


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

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body; // Assuming you want to keep using email

  try {
    const user = await User.findOne({ email });
    // Check if the email is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email is not verified' });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (['data controller', 'admin'].includes(user.userrole) && (!user.accountOpenedDate || user.accountOpenedDate > new Date())) {
      return res.status(400).json({ error: 'Account is not opened' });
    }

    user.isOnline = true;
    user.lastLoginDate = new Date(); // Set the last login date
    await user.save();
    // Generate JWT
    const token = jwt.sign({ userId: user._id, userrole: user.userrole }, JWT_SECRET, { expiresIn: '3h' });

    // Set JWT in cookie
    res.cookie('authToken', token, { 
      httpOnly: true, 
      secure: false, // Set to true in production
      maxAge: 10800000 // 3 hours in milliseconds
    });

    res.status(200).json({ 
      message: 'Login successful!', 
      token, 
      role: user.userrole // Assuming the field is named `userrole`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log('Token decoded:', req.user); // Check if the decoded token contains the expected data
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


app.get('/check-auth-client', authenticateToken, (req, res) => {
  // Assuming the user role is stored in req.user after token verification
  const userRole = req.user.userrole; // Adjust this if the role key is different
  console.log(userRole);
  if (userRole === 'Client') {
    // If the user's role is 'client', respond with a 204 No Content status
    return res.sendStatus(204);
  } else {
    console.log('Access denied: user is not a client');
    // If the user's role is not 'client', respond with a 401 Unauthorized status
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/check-auth-datacontroller', authenticateToken, (req, res) => {
  // Assuming the user role is stored in req.user after token verification
  const userRole = req.user.userrole; // Adjust this if the role key is different
  console.log(userRole);
  if (userRole === 'Data Controller') {
    // If the user's role is 'client', respond with a 204 No Content status
    return res.sendStatus(204);
  } else {
    console.log('Access denied: user is not a Data Controller');
    // If the user's role is not 'client', respond with a 401 Unauthorized status
    return res.status(401).json({ message: 'Unauthorized' });
  }
});


app.post('/logout', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isOnline = false;
    user.lastLogoutDate = new Date(); // Set the last logout date
    await user.save();


    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' });
  }
});


app.get('/profile', async (req, res) => {
  const token = req.cookies.authToken; // Extract token from 'Bearer <token>'
  //console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
   // console.log('Decoded token:', decoded);
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
app.post('/businesspermitpage', upload.fields([
  { name: 'document1', maxCount: 1 },
  { name: 'document2', maxCount: 1 },
  { name: 'document3', maxCount: 1 },
  { name: 'document4', maxCount: 1 }
]), async (req, res) => {
  const token = req.cookies.authToken; // Extract token from the cookie
  // console.log('Received token:', token);
   
   if (!token) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
 
   const files = req.files;
   const {
     lastName,
     firstName,
     middleInitial,
     civilstatus,
     gender,
     citizenship,
     tinnumber,
     representative,
     repfullname,
     repdesignation,
     repmobilenumber,
     businessname,
     businessscale,
     paymentmethod,
     buildingblocklot,
     buldingname,
     subcompname,
     region,
     province,
     municipality,
     barangay,
     businessstreet,
     zone,
     zip,
     contactnumber,
   } = req.body;
   console.log('Incoming data:', req.body);
   console.log(req.files)
   try {
     const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
     console.log('Decoded token:', decoded);
     
     const userId = decoded.userId;
     const permitID = await generateBusinessPermitID('BP');
     const status = "Pending";

     const newBusinessPermit = new BusinessPermit({
       id: permitID,
       userId,
       businesspermitstatus: status,
       classification: null,
       transaction: null,
       amountToPay: null,
       permitFile: null,
       permitDateIssued: null,
       permitExpiryDate: null,
       expiryDate: null,
       applicationdateIssued: new Date(Date.now()).toISOString(),
       applicationComments: null,
       owner:{
        lastName,
        firstName,
        middleInitial,
        civilstatus,
        gender,
        citizenship,
        tinnumber,
        representative,
        representativedetails: {
          repfullname,
          repdesignation,
          repmobilenumber,
        },
       },
       businessReference: {
        businessname,
        businessscale,
        paymentmethod,
        buildingblocklot,
        buldingname,
        subcompname,
        region,
        province,
        municipality,
        barangay,
        businessstreet,
        zone,
        zip,
        contactnumber,
      },
      files: {
        document1: files.document1 ? files.document1[0].path : null,
        document2: files.document2 ? files.document2[0].path : null,
        document3: files.document3 ? files.document3[0].path : null,
        document4: files.document4 ? files.document4[0].path : null,
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
     const savedBusinessPermit = await newBusinessPermit.save();
     console.log('Saved BusinessPermit ID:', savedBusinessPermit._id); // Log the saved ID
     
     await User.findByIdAndUpdate(userId, { $push: { workPermits: savedBusinessPermit._id } });
     
     res.status(200).json({ message: 'Application submitted successfully' });
   } catch (error) {
     console.error('Error saving application:', error.message); // Log the error message
     res.status(500).json({ message: 'Error submitting application', error: error.message });
   }
 });

app.post('/workpermitpage', upload.fields([
  { name: 'document1', maxCount: 1 },
  { name: 'document2', maxCount: 1 },
  { name: 'document3', maxCount: 1 },
  { name: 'document4', maxCount: 1 }
]), async (req, res) => {
  const token = req.cookies.authToken; // Extract token from the cookie
 // console.log('Received token:', token);
  
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
    } else if (classification === "Renewal") {
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
      permitDateIssued: null,
      permitExpiryDate: null,
      expiryDate: null,
      applicationdateIssued: new Date(Date.now()).toISOString(),
      applicationComments: null,
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

async function generateBusinessPermitID(permitType) {
  const today = new Date();
  
  // Get the current date in DDMMYYYY format
  const year = today.getFullYear(); 
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${day}${month}${year}`;

  try {
      // Fetch the latest permit ID for the given permit type where the ID matches today's date exactly
      const latestPermit = await BusinessPermit.findOne({
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



app.get('/fetchuserworkpermits', async (req, res) => {
  const token = req.cookies.authToken; // Extract token from the cookie
// console.log('Received token:', token);
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
  const token = req.cookies.authToken; // Extract token from the cookie
  
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

app.post('/apptesting', upload.fields([
  { name: 'document1', maxCount: 1 },
  { name: 'document2', maxCount: 1 },
  { name: 'document3', maxCount: 1 },
]), async (req, res) => {
  const { name, email, age, address, phoneNumber, isActive, newBusiness, businesses } = req.body;
  const files = req.files;

  try {
    // Parse businesses JSON
    const parsedNewBusiness = JSON.parse(newBusiness);
    const parsedBusinesses = JSON.parse(businesses);

    // Create a new person document with the businesses
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
      businesses: parsedBusinesses, // Save businesses as an array
    });

    // Save the person to the database
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
  //console.log('Received token:', token);
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
   // console.log('Decoded token:', decoded);
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


//#endregion Client


//#region Superadmin

// API for superadmin login
app.post('/superadmin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email is not verified' });
    }

    if (user.userrole !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, userrole: user.userrole }, JWT_SECRET, { expiresIn: '3h' });

    res.cookie('authToken', token, { 
      httpOnly: true, 
      secure: false, // Set to true in production
      maxAge: 10800000 // 3 hours in milliseconds
    });

    res.status(200).json({ 
      message: 'Login successful!', 
      token, 
      role: user.userrole
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});


const authenticateSuperAdmin = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log('Token decoded:', req.user); // Check if the decoded token contains the expected data

    if (req.user.userrole !== 'superadmin') {
      console.error('Access denied: user is not a superadmin');
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

app.get('/superadmin/authentication', authenticateSuperAdmin, (req, res) => {
    // Assuming the user role is stored in req.user after token verification
    const userRole = req.user.userrole; // Adjust this if the role key is different
    console.log(userRole);
    if (userRole === 'superadmin') {
      // If the user's role is 'SuperAdmin', respond with a 204 No Content status
      return res.sendStatus(204);
    } else {
      console.log('Access denied: user is not a SuperAdmin');
      // If the user's role is not 'SuperAdmin', respond with a 401 Unauthorized status
      return res.status(401).json({ message: 'Unauthorized' });
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
      accountOpenedDate: new Date().toISOString(),
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
  const SuperAdmin_Email = process.env.SUPERADMIN_EMAIL;
  const SuperAdmin_Password = process.env.SUPERADMIN_PASSWORD; 

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



app.get('/accounts/:id', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// API endpoint to fetch user data by ID
app.delete('/api/accounts/:id', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send({ message: 'Account deleted successfully' });
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



io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('userOnline', async (userId) => {
    await User.findByIdAndUpdate(userId, { isOnline: true });
    io.emit('statusUpdate', { userId, isOnline: true });
  });

  socket.on('userOffline', async (userId) => {
    await User.findByIdAndUpdate(userId, { isOnline: false });
    io.emit('statusUpdate', { userId, isOnline: false });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

//#endregion Superadmin

//#region Data Controller

app.get('/getworkpermitsforassessment', async (req, res) => {
  try {
    // Query to find only work permits where workpermitstatus is 'pending'
    const pendingWorkPermits = await WorkPermit.find({ workpermitstatus: 'Pending' });

    // Send the filtered result as a JSON response
    res.json(pendingWorkPermits);
  } catch (error) {
    console.error('Error fetching work permits:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/getworkpermitsforpayments', async (req, res) => {
  try {
    // Query to find only work permits where workpermitstatus is 'pending'
    const pendingWorkPermits = await WorkPermit.find({ workpermitstatus: 'Waiting for Payment' });

    // Send the filtered result as a JSON response
    res.json(pendingWorkPermits);
  } catch (error) {
    console.error('Error fetching work permits:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getworkpermitsforrelease', async (req, res) => {
  try {
    // Query to find work permits where workpermitstatus is 'Released' or 'Expired'
    const pendingWorkPermits = await WorkPermit.find({ workpermitstatus: { $in: ['Released', 'Expired'] } });

    // Send the filtered result as a JSON response
    res.json(pendingWorkPermits);
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

//Handle Update
app.put('/work-permits/:id', async (req, res) => {
  console.log('Request body:', req.body); // Log incoming request body
  const { id } = req.params;
  const { status } = req.body; // Get relevant fields from request body
  const ContentData = {
    id: id,
  };
  try {
      let updateFields = {};
      
      // Check the status and set appropriate fields
      if (status === 'Released') {
        const workpermitFileName = await generateWorkPermitPDF(ContentData);
          updateFields = {
              permitFile: workpermitFileName,
              transaction: 'First Time Job Seeker',
              permitDateIssued: new Date().toISOString(),
              workpermitstatus: status,
              permitExpiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
              expiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now

          };
      } else if (status === 'Waiting for Payment') {
          updateFields = {
              workpermitstatus: status,
              permitExpiryDate: null, // No expiry date for this status
              expiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
          };
      } else {
          return res.status(400).json({ message: 'Invalid status' });
      }

      // Update the work permit
      const updatedPermit = await WorkPermit.findByIdAndUpdate(
          id,
          { $set: updateFields },
          { new: true } // Option to return the updated document
      );

      if (!updatedPermit) {
          return res.status(404).json({ message: 'Work permit not found' });
      }

      res.json(updatedPermit);
      console.log('Updated Permit:', updatedPermit); // Log updated permit for debugging
  } catch (error) {
      console.error('Error updating work permit:', error); // Log error
      res.status(500).json({ error: 'Error updating work permit' });
  }
});



app.put('/work-permitsreject/:id', async (req, res) => {
  console.log('Request body:', req.body); // Log incoming request body
  const { id } = req.params;
  const { status, comments } = req.body;




  try {
    const updatedPermit = await WorkPermit.findByIdAndUpdate(
      id,
      { 
        $set: {
          workpermitstatus: status,
          applicationComments: comments,
        }
      },
      { new: true } // Option to return the updated document
    );

    if (!updatedPermit) {
      return res.status(404).json({ message: 'Work permit not found' });
    }

    res.json(updatedPermit);
    console.log(new Date(Date.now() + 31536000000)); // Correct syntax)
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
        permitDateIssued: new Date().toISOString(),
        permitExpiryDate: new Date(Date.now() + 31536000000).toISOString(),
        expiryDate: new Date(Date.now() + 31536000000).toISOString(),


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
      doc.text(`Classification: ${workPermit.classification}`);
      doc.text(`Permit Status: Released`);
      doc.text(`Issue Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Expiration Date: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleString()}`);

      doc.end();

      console.log(`Work Permit PDF created at ${workPermitFileName}`);

      return workPermitFileName;  // Return the path to the generated PDF
  } catch (error) {
      console.error('Error generating work permit PDF:', error);
      throw error;
  }
};


// Delete permit route
app.delete('/deletePermit/:permitId', async (req, res) => {
  const { permitId } = req.params;

  try {
    const result = await WorkPermit.deleteOne({ _id: permitId });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Permit deleted successfully" });
    } else {
      return res.status(404).json({ message: "Permit not found" });
    }
  } catch (error) {
    console.error("Error deleting permit:", error);
    return res.status(500).json({ message: "Error deleting permit", error });
  }
});

const checkExpired = async () => {
  // Get current date in UTC
  const currentDate = new Date(Date.now()).toISOString(); // Current date in UTC
  console.log(`Current Date (UTC): ${currentDate}`);

  try {
    // Find permits that should be marked as expired
    const permits = await WorkPermit.find({
      permitExpiryDate: { $lte: currentDate }, // Compare expiryDate with currentDate in UTC
      workpermitstatus: { $ne: 'Expired' }     // Exclude already expired permits
    });

    permits.forEach(permit => {
      console.log(`Checking Permit: ${permit._id}`);
      console.log(`Permit Expiry Date (UTC): ${permit.permitExpiryDate}, Current Date (UTC): ${currentDate}`);
    });

    const result = await WorkPermit.updateMany(
      {
        permitExpiryDate: { $lte: currentDate }, // Compare full date and time in UTC
        workpermitstatus: { $ne: 'Expired' }     // Exclude already expired permits
      },
      { $set: { workpermitstatus: 'Expired' } } // Mark as expired
    );

    console.log(`${result.modifiedCount} work permits have been updated to expired.`);
  } catch (error) {
    console.error('Error updating expired work permits:', error);
  }
};




// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled job to check for expired work permits.');
  await checkExpired(); // Call the function to check for expired permits
});


app.get('/chart/working-permits', async (req, res) => {
  try {
    const workingPermits = await WorkPermit.countDocuments();
    res.json({ label: 'Working Permit', count: workingPermits });
  } catch (error) {
    console.error('Error fetching working permit data:', error);
    res.status(500).json({ message: 'Error fetching working permit data' });
  }
});

// Endpoint for fetching the count of business permits
app.get('/chart/business-permits', async (req, res) => {
  try {
    const businessPermits = await BusinessPermit.countDocuments();
    res.json({ label: 'Business Permit', count: businessPermits });
  } catch (error) {
    console.error('Error fetching business permit data:', error);
    res.status(500).json({ message: 'Error fetching business permit data' });
  }
});

// #endregion Data Controller
