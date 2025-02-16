
const { WorkPermit, BusinessPermit } = require('../../index/models');

// Endpoint to fetch permit applications by category
const graphpermitapplicationcategory = async (req, res) => {
    try {
      const workPermitCategories = await WorkPermit.aggregate([
        { $group: { _id: "$classification", count: { $sum: 1 } } }
      ]);
  
      const businessPermitCategories = await BusinessPermit.aggregate([
        { $group: { _id: "$classification", count: { $sum: 1 } } }
      ]);
  
      res.json({
        workPermitCategories,
        businessPermitCategories
      });
    } catch (error) {
      console.error('Error fetching permit applications by category:', error);
      res.status(500).json({ message: 'Error fetching permit applications by category' });
    }
  };

  module.exports = {graphpermitapplicationcategory};