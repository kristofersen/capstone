const { BusinessPermit } = require('../../index/models');

const businesspermitdetails = async (req, res) => {
    const { id } = req.params;  // Extract the work permit ID from the route parameters
  
    try {
      // Find the work permit directly by its ID
      const businessPermit = await BusinessPermit.findById(id);
  
      if (!businessPermit) {
        return res.status(404).json({ message: 'Work permit not found' });
      }
  
      // Return the work permit details
      res.json(businessPermit);
    } catch (error) {
      console.error('Error retrieving work permit:', error);
      res.status(500).json({ message: 'Error retrieving work permit', error });
    }
  };

  module.exports = {businesspermitdetails};