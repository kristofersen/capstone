const jwt = require('jsonwebtoken');
const { User } = require('../../../index/models');
const JWT_SECRET = 'your_jwt_secret'; 

const fetchbusinesspermitdetails = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.authToken; // Extract token from the cookie
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get userId
      const userId = decoded.userId;
  console.log(userId);
      // Find the user by ID
      const user = await User.findById(userId).populate('businessPermits'); // Populate work permits
  console.log(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has the specified work permit
      const businessPermit = user.businessPermits.find(permit => permit._id.toString() === id);
      console.log(businessPermit);
      if (!businessPermit) {
        return res.status(404).json({ message: 'Work permit not found for this user' });
      }
  
      // Return the specific work permit details
      res.json(businessPermit);
    } catch (error) {
      console.error('Error retrieving work permit:', error);
      res.status(500).json({ message: 'Error retrieving work permit', error });
    }
  };

module.exports = {fetchbusinesspermitdetails};