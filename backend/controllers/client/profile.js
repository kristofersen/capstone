const jwt = require('jsonwebtoken');
const { User } = require('../../index/models');
const JWT_SECRET = 'your_jwt_secret'; 

const profile = async (req, res) => {
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
  };
  
  module.exports = { profile };