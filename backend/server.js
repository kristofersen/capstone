const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/obpwlsdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schemas and models
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
    const {firstName, middleName, lastName, contactNumber, address, email, password} = req.body;
    
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
  
      // Create new user
      const newUser = new User({ email, password });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error); // Log detailed error
      res.status(500).json({ error: 'Error creating user' });
    }
  });

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));