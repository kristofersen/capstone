const { WorkPermit } = require('../../index/models');

const getworkpermitrelease = async (req, res) => {
    try {
      const { type } = req.params;  // Extract the work permit ID from the route parameters
      let filters = { workpermitstatus: { $in: ['Released', 'Expired'] } };
      // Query to find only work permits where workpermitstatus is 'pending'
        
      if (type === 'new') {
        filters.classification = 'New'; // Filter for New Business classification
      } else if (type === 'renew') {
        filters.classification = 'Renew'; // Filter for Renew Business classification
      } else if (type === 'all') {
        // Clear classification filter if "all" is selected
        delete filters.classification; // Show all classifications
      }
      console.log('Filters being applied:', filters);
      const forPaymentsWorkPermits = await WorkPermit.find(filters);
  
      // Send the filtered result as a JSON response
      res.json(forPaymentsWorkPermits);
    } catch (error) {
      console.error('Error fetching work permits:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {getworkpermitrelease};