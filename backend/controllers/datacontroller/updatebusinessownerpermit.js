const { BusinessPermit } = require('../../index/models');

const updatebusinessownerpermit = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // Updated fields from frontend
  
    try {
      const updatedPermit = await BusinessPermit.findByIdAndUpdate(
        id,
        { $set: updatedData }, // Use $set to update only specified fields
        { new: true, runValidators: true } // Return updated document and validate schema
      );
  
      if (!updatedPermit) {
        return res.status(404).json({ error: 'Permit not found' });
      }
  
      res.status(200).json(updatedPermit);
    } catch (error) {
      console.error('Error updating permit:', error);
      res.status(500).json({ error: 'Failed to update permit' });
    }
  };

  module.exports = {updatebusinessownerpermit};