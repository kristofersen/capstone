const { BusinessPermit } = require('../../index/models');
  
  // Route to update business permit documents
const updatebusinessattachment = async (req, res) => {
    try {
      const permitId = req.params.id;
     
      const { remarksdoc1, remarksdoc2, remarksdoc3, remarksdoc4, remarksdoc5, remarksdoc6} = req.body; // Extract remarks from the request body
  
      if (!permitId) {
        return res.status(400).json({ message: 'Permit ID is required' });
      }
  
      const updates = {};
      const files = req.files;
      console.log("Processed files:", files);
      console.log(files.document1?.[0]?.path);
      console.log(files.document2?.[0]?.path);
      console.log(files.document3?.[0]?.path);
      console.log(files.document4?.[0]?.path);
  
      // Update each document field if a new file is uploaded
      if (files.document1) updates['files.document1'] = files.document1[0].path;
      if (files.document2) updates['files.document2'] = files.document2[0].path;
      if (files.document3) updates['files.document3'] = files.document3[0].path;
      if (files.document4) updates['files.document4'] = files.document4[0].path;
      if (files.document5) updates['files.document5'] = files.document5[0].path;
      if (files.document6) updates['files.document6'] = files.document6[0].path;
  
      if (remarksdoc1) updates['files.remarksdoc1'] = remarksdoc1;
      if (remarksdoc2) updates['files.remarksdoc2'] = remarksdoc2;
      if (remarksdoc3) updates['files.remarksdoc3'] = remarksdoc3;
      if (remarksdoc4) updates['files.remarksdoc4'] = remarksdoc4;
      if (remarksdoc5) updates['files.remarksdoc5'] = remarksdoc5;
      if (remarksdoc6) updates['files.remarksdoc6'] = remarksdoc6;
  
      // Update the MongoDB document
      const updatedPermit = await BusinessPermit.findByIdAndUpdate(
        permitId,
        { $set: updates },
        { new: true } // Return the updated document
      );
  
      res.status(200).json({
        message: 'Business permit updated successfully',
        updatedPermit,
      });
    } catch (error) {
      console.error('Error updating permit:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {updatebusinessattachment};