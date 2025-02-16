const { WorkPermit } = require('../../../index/models');

const expireworkpermit = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the business permit to be updated
      const permit = await WorkPermit.findById(id);
  
      if (!permit) {
        return res.status(404).json({ message: 'Work permit not found' });
      }

      permit.workpermitstatus = 'Expired';
     
      // Save the updated permit
      const updatedPermit = await permit.save();
  
      res.status(200).json({
        message: 'Work permit updated successfully',
        updatedPermit,
      });
    } catch (error) {
      console.error('Error updating business permit:', error);
      res.status(500).json({ message: 'Error updating business permit' });
    }
  };

  module.exports = {expireworkpermit};