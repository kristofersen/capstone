const { BusinessPermit } = require('../../index/models');

const getassessedperson = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the BusinessPermit by ID and populate the permitassessed field with user details (firstName, lastName)
      const permit = await BusinessPermit.findById(id)
        .populate('statementofaccount.permitassessed', 'firstName lastName'); // Populate firstName, lastName of the user
  
      if (!permit) {
        return res.status(404).json({
          firstName: 'none',
          lastName: 'none'
        });
      }
  
      // Check if permitassessed exists and is populated
      const permitAssessed = permit.statementofaccount?.permitassessed;
  
      if (!permitAssessed) {
        return res.status(200).json({
          firstName: 'none',
          lastName: 'none'
        });
      }
  
      // Access the user details from permitassessed
      const firstName = permitAssessed.firstName;
      const lastName = permitAssessed.lastName;
  
      // Return the firstName and lastName as 'none' if missing
      res.status(200).json({
        firstName,
        lastName
      });
  
    } catch (error) {
      console.error('Error fetching permit:', error);
      res.status(500).json({
        firstName: 'none',
        lastName: 'none'
      });
    }
  };

  module.exports = {getassessedperson};
