const { BusinessPermit } = require('../../index/models');

const getbusinesspermitforassessment = async (req, res) => {
    try {
     
      const { type } = req.params;  // Extract the work permit ID from the route parameters
  console.log(type);
      // Define filters for "Pending" or "Assessed" status
      let filters = { businesspermitstatus: { $in: ['Pending', 'Assessed'] } };
  
      if (type === 'new') {
        filters.classification = 'NewBusiness'; // Filter for New Business classification
      } else if (type === 'renew') {
        filters.classification = 'RenewBusiness'; // Filter for Renew Business classification
      } else {
        // Clear classification filter if "all" is selected
        delete filters.classification; // Show all classifications
      }
      console.log('Filters being applied:', filters);
  
      const permits = await BusinessPermit.find(filters);
  
      res.json(permits);
    } catch (error) {
      console.error('Error fetching business permits:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {getbusinesspermitforassessment};