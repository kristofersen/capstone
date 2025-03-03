const { WorkPermit } = require('../../index/models');

const updateworkpermitattachment = async (req, res) => {
    try {
      const permitId = req.params.id;
      const { remarksdoc1, remarksdoc2, remarksdoc3, remarksdoc4 } = req.body; // Extract remarks from the request body
  
      if (!permitId) {
        console.error('Permit ID is required');
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
      if (files.document1) updates['formData.files.document1'] = files.document1[0].path;
      if (files.document2) updates['formData.files.document2'] = files.document2[0].path;
      if (files.document3) updates['formData.files.document3'] = files.document3[0].path;
      if (files.document4) updates['formData.files.document4'] = files.document4[0].path;
  
      if (remarksdoc1) updates['formData.files.remarksdoc1'] = remarksdoc1;
      if (remarksdoc2) updates['formData.files.remarksdoc2'] = remarksdoc2;
      if (remarksdoc3) updates['formData.files.remarksdoc3'] = remarksdoc3;
      if (remarksdoc4) updates['formData.files.remarksdoc4'] = remarksdoc4;
  
      console.log('Permit ID:', permitId); // Log permit ID
      console.log('Files:', files); // Log files
      console.log('Remarks:', { remarksdoc1, remarksdoc2, remarksdoc3, remarksdoc4 }); // Log remarks
      console.log('Updates:', updates); // Log updates for debugging
  
      // Update the MongoDB document
      const updatedPermit = await WorkPermit.findByIdAndUpdate(
        permitId,
        { $set: updates },
        { new: true }
      );
  
      if (!updatedPermit) {
        console.error('Work permit not found');
        return res.status(404).json({ message: 'Work permit not found' });
      }
  
      console.log('Updated Permit:', updatedPermit); // Log the updated permit
  
      res.status(200).json({
        message: 'Work permit updated successfully',
        updatedPermit,
      });
    } catch (error) {
      console.error('Error updating permit:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {updateworkpermitattachment};