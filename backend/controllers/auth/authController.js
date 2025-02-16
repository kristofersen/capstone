const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../index/models');
const generateUserId = require('../../index/utils');
const nodemailer = require('nodemailer');
const JWT_SECRET = 'your_jwt_secret'; 

// Homepage
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      console.log("User not found!");
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 60000); // In minutes
      return res.status(403).json({ 
        error: `Too many attempts! Account is locked. Try again in ${remainingTime} minutes.` 
      });
    }

    // Reset lock if expired
    if (user.lockUntil && user.lockUntil < Date.now()) {
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email is not verified' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
      }

      await user.save();
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Successful login: reset login attempts
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.isOnline = true;
    user.lastLoginDate = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, userrole: user.userrole },
      JWT_SECRET,
      { expiresIn: '3h' }
    );

    // Set JWT in cookie
    res.cookie('authToken', token, { 
      httpOnly: true, 
      secure: false, // Change to `true` in production
      maxAge: 3 * 60 * 60 * 1000 // 3 hours in milliseconds
    });

    res.status(200).json({ 
      message: 'Login successful!', 
      token, 
      role: user.userrole
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

const signup = async (req, res) => {
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
  };


const logout = async (req, res) => {
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
};


    // Authentication
const checkauthclient = async (req, res) => {
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
};

const checkauthdatacontroller = async (req, res) => {
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
};

const checkauthadmin = async (req, res) => {
  // Assuming the user role is stored in req.user after token verification
  const userRole = req.user.userrole; // Adjust this if the role key is different
  console.log(userRole);
  if (userRole === 'Admin') {
    // If the user's role is 'client', respond with a 204 No Content status
    return res.sendStatus(204);
  } else {
    console.log('Access denied: user is not Admin');
    // If the user's role is not 'client', respond with a 401 Unauthorized status
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

const checkauthsuperadmin = async (req, res) => {
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
};

    // Otp Section
//Transporter for Email OTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, 
    },
  });

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
  
// Send OTP Route
const sendOTP = async (req, res) => {
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
  };

// Verify OTP Route
const verifyemailotp = async (req, res) => {
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
  };
    
// Route for updating the password
const updatepassword = async (req, res) => {
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
  };
    
const superadminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

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
    console.error('Error during login:', error); // Log the error

    res.status(500).json({ error: 'Error logging in' });
  }
};


module.exports = { loginUser, superadminlogin, signup, logout, checkauthclient, checkauthdatacontroller, checkauthadmin, checkauthsuperadmin, sendOTP, verifyemailotp, updatepassword };
