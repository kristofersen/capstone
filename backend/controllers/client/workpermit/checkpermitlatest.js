const jwt = require('jsonwebtoken');
const { User } = require('../../../index/models');
const JWT_SECRET = 'your_jwt_secret'; 

const checkpermitlatest = async (req, res) => {
    try {
      const token = req.cookies.authToken;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;
  
      // Fetch user and populate work permits
      const user = await User.findById(userId).populate('workPermits');
  
      // 🚨 Handle no work permits available
      if (!user || !user.workPermits.length) {
        return res.status(200).json({ status: 'No Permit' });
      }
  
      // Sort work permits by creation date (assuming `createdAt` exists)
      const latestPermit = user.workPermits.sort((a, b) => b.createdAt - a.createdAt)[0];
  
      // Return the latest permit status
      return res.status(200).json({ status: latestPermit.workpermitstatus });
  
    } catch (error) {
      console.error('Error retrieving work permits:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {checkpermitlatest};
  