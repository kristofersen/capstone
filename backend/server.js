const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret key in production

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
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define schemas and models
const userSchema = new mongoose.Schema({
firstName: String,
middleName: String,
lastName: String,
contactNumber: String,
address: String,
email: String,
password: String,
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
    }
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
        applicationType: [String] // Array to store multiple types of applications
    },
    emergencyContact: {
        name: String,
        mobileTel: String,
        address: String
    }
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
const newUser = new User({ firstName, middleName, lastName, contactNumber, address, email, password: hashedPassword });
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

// Route to handle business permit form submission
app.post('/businesspermitpage', async (req, res) => {
    const { owner, businessReference } = req.body;

    try {
      // Create a new business permit application
        const newBusinessPermit = new BusinessPermit({
        owner,
        businessReference
        });

      // Save the new application to the database
        await newBusinessPermit.save();

        res.status(201).json({ message: 'Business Permit Application submitted successfully!' });
    } catch (error) {
        console.error('Error saving business permit application:', error);
        res.status(500).json({ error: 'An error occurred while saving the application.' });
    }
});

// Route to handle work permit form submission
app.post('/workpermitpage', async (req, res) => {
    const { personalInformation, emergencyContact } = req.body;

    try {
        // Create a new work permit application
        const newWorkPermit = new WorkPermit({
            personalInformation,
            emergencyContact
        });

        // Save the new application to the database
        await newWorkPermit.save();

        res.status(201).json({ message: 'Work Permit Application submitted successfully!' });
    } catch (error) {
        console.error('Error saving work permit application:', error);
        res.status(500).json({ error: 'An error occurred while saving the work permit application.' });
    }
});
