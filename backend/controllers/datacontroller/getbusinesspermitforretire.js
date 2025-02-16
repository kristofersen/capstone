const { BusinessPermit } = require('../../index/models');


const getbusinesspermitforretire = async (req, res) => {
    try {
     
  

      // Define filters for "Pending" or "Assessed" status
      let filters = { forretirement: { $in: ['ForRetire', 'RetiredBusiness'] } };
  
      console.log('Filters being applied:', filters);
  
      const permits = await BusinessPermit.find(filters);
  
      res.json(permits);
    } catch (error) {
      console.error('Error fetching business permits:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {getbusinesspermitforretire};