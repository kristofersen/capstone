
const { BusinessPermit } = require('../../index/models');

const retirebusinesspermit = async (req, res) => {
    const { id } = req.params;
    const { classification, businessstatus, forretirement } = req.body;
  
    try {
      // Find and update the business permit
      const updatedPermit = await BusinessPermit.findByIdAndUpdate(
        id,
        {
          classification,
          businessstatus,
          forretirement,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedPermit) {
        return res.status(404).json({ message: 'Business Permit not found' });
      }
  
      res.status(200).json({ message: 'Business Permit updated successfully', updatedPermit });
    } catch (error) {
      console.error('Error updating business permit:', error);
      res.status(500).json({ message: 'Failed to update business permit' });
    }
  };


  module.exports = {retirebusinesspermit};