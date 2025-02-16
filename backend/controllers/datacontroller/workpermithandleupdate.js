

const { WorkPermit } = require('../../index/models');
const { generateWorkPermitPDF } = require('../../index/utils')

  //Handle Update
const workpermithandleupdate = async (req, res) => {
    console.log('Request body:', req.body); // Log incoming request body
    const { id } = req.params;
    const { status } = req.body; // Get relevant fields from request body
    try {
        let updateFields = {};
        
        // Check the status and set routerropriate fields
        if (status === 'Released') {
          const workpermitFileName = await generateWorkPermitPDF(id);
            updateFields = {
                permitFile: workpermitFileName,
                transaction: 'First Time Job Seeker',
                permitDateIssued: new Date().toISOString(),
                workpermitstatus: status,
                permitExpiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
                expiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
  
            };
        } else if (status === 'Waiting for Payment') {
            updateFields = {
                workpermitstatus: status,
                transaction: 'Waiting',
                permitExpiryDate: null, // No expiry date for this status
                expiryDate: new Date(Date.now() + 31536000000).toISOString(), // 1 year from now
            };
        } else {
            return res.status(400).json({ message: 'Invalid status' });
        }
  
        // Update the work permit
        const updatedPermit = await WorkPermit.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // Option to return the updated document
        );
  
        if (!updatedPermit) {
            return res.status(404).json({ message: 'Work permit not found' });
        }
  
        res.json(updatedPermit);
        console.log('Updated Permit:', updatedPermit); // Log updated permit for debugging
    } catch (error) {
        console.error('Error updating work permit:', error); // Log error
        res.status(500).json({ error: 'Error updating work permit' });
    }
  };

  module.exports = {workpermithandleupdate};