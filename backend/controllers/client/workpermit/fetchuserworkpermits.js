const jwt = require('jsonwebtoken');
const { User } = require('../../../index/models');
const JWT_SECRET = 'your_jwt_secret'; 

const fetchuserworkpermits = async (req, res) => {
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
  };

module.exports = { fetchuserworkpermits };