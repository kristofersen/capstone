const { WorkPermit } = require('../../index/models');

const workpermitreject = async (req, res) => {
    console.log('Request body:', req.body); // Log incoming request body
    const { id } = req.params;
    const { status, comments } = req.body;
  
    try {
      const updatedPermit = await WorkPermit.findByIdAndUpdate(
        id,
        { 
          $set: {
            workpermitstatus: status,
            routerlicationComments: comments,
          }
        },
        { new: true } // Option to return the updated document
      );
  
      if (!updatedPermit) {
        return res.status(404).json({ message: 'Work permit not found' });
      }
  
      res.json(updatedPermit);
      console.log(new Date(Date.now() + 31536000000)); // Correct syntax)
    } catch (error) {
      console.error('Error updating work permit:', error); // Log error
      res.status(500).json({ error: 'Error updating work permit' });
    }
  };

  module.exports = {workpermitreject};