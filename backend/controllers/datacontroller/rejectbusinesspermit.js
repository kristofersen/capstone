const { BusinessPermit } = require('../../index/models');

const rejectbusinesspermit = async (req, res) => {
    const { permitId } = req.params; // Extract permit ID from URL params
    const { status, remarks } = req.body; // Get the new status (approved/rejected)
  
    // Validate the status value
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value. It should be "approved" or "rejected".' });
    }
  
    // Define the new status based on approval or rejection
    let updatedStatus;
    if (status === 'approved') {
      updatedStatus = 'Waiting for Payment'; // Set the status to "Waiting for Payment" if approved
    } else if (status === 'rejected') {
      updatedStatus = 'Rejected'; // Set the status to "Rejected" if rejected
    }
  
    try {
      // Find the permit by ID and update the status and remarks
      const updatedPermit = await BusinessPermit.findByIdAndUpdate(
        permitId,
        { 
          businesspermitstatus: updatedStatus, // Update the status
          paymentstatus: 'Pending',
          applicationComments: remarks, // Update the remarks
        },
        { new: true } // Returns the updated document
      );
  
      if (!updatedPermit) {
        return res.status(404).json({ error: 'Permit not found.' });
      }
  
      // Respond with the updated permit data
      res.status(200).json({ message: 'Permit status updated successfully.', permit: updatedPermit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error, please try again later.' });
    }
  };

  module.exports = {rejectbusinesspermit};
  