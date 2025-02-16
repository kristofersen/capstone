
const { BusinessPermit } = require('../../../index/models');

const retirebusinessapplication = async (req, res) => {
    const token = req.cookies.authToken; // Extract token from the cookie
    const { id } = req.params;
    const files = req.files;
    
    // Check if the user is authorized
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    console.log('Incoming data:', req.body);
    console.log('Uploaded files:', req.files);
  
    try {
  
  
      // Find the business permit by ID
      const permit = await BusinessPermit.findById(id);
  
      const updatedPermit = await BusinessPermit.findByIdAndUpdate(
        id,
        {
          $set: {
            // Compute the total amount to pay
            'forretirement': 'ForRetire',
            'files.document11': files.document1 ? files.document1[0].filename : null,
            'files.document12': files.document2 ? files.document2[0].filename : null,
          }
        },
        { new: true } // Return the updated document
      );
      
      if (!updatedPermit) {
        return res.status(404).json({ message: 'BusinessPermit not found' });
      }
  
      res.status(200).json({ message: 'Update successful', updatedPermit });
  
    } catch (error) {
      console.error('Error retiring business application:', error);
      res.status(500).json({ error: 'Error retiring business application' });
    }
  };

module.exports = {retirebusinessapplication};
  