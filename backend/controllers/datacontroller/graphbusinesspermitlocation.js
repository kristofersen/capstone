const { BusinessPermit } = require('../../index/models');

const graphbusinesspermitlocation = async (req, res) => {
    try {
      const locations = await BusinessPermit.aggregate([
        { $group: { _id: "$business.businessbarangay", count: { $sum: 1 } } }
      ]);
      res.json(locations);
    } catch (error) {
      console.error('Error fetching business permit locations:', error);
      res.status(500).json({ message: 'Error fetching business permit locations' });
    }
  };

  module.exports = {graphbusinesspermitlocation};