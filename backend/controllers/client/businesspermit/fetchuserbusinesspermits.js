const jwt = require('jsonwebtoken');
const { User } = require('../../../index/models');
const JWT_SECRET = 'your_jwt_secret'; 

  // Fetch and group user's business permits by 'id'
  const fetchuserbusinesspermits = async (req, res) => {
    const token = req.cookies.authToken; // Extract token from the cookie
  
    try {
      // Decode the JWT token to get the user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.userId;
  
      // Fetch all business permits associated with the user
      const user = await User.findById(userId).populate('businessPermits');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userBusinessPermits = user.businessPermits;
  
      // Group business permits by 'id' field (not _id)
      const groupedBusinessPermits = userBusinessPermits.reduce((acc, permit) => {
        const permitId = permit.id; // Use the `id` field for grouping
        if (!acc[permitId]) {
          acc[permitId] = [];
        }
        acc[permitId].push(permit);
        return acc;
      }, {});
  
      // Convert grouped data to an array for frontend consumption
      const groupedArray = Object.entries(groupedBusinessPermits).map(([id, permits]) => ({
        id,
        permits,
      }));
  
      // Respond with grouped permits
      res.json(groupedArray);
    } catch (error) {
      console.error('Error fetching or grouping business permits:', error);
      res.status(500).json({ message: 'Error retrieving business permits', error });
    }
  };

  module.exports = {fetchuserbusinesspermits};
  