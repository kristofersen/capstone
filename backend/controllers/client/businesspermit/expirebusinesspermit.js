const { BusinessPermit } = require('../../../index/models');

const expirebusinesspermit = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the business permit to be updated
      const permit = await BusinessPermit.findById(id);
  
      if (!permit) {
        return res.status(404).json({ message: 'Business permit not found' });
      }
  
      // Update the businesses array: transfer capitalInvestment to lastYearGross and set businessType to 'Renew'
      const updatedBusinesses = permit.businesses.map((business) => {
        if (business.capitalInvestment) {
          business.lastYearGross = business.capitalInvestment; // Move value
          business.capitalInvestment = null; // Clear capitalInvestment
        }
        business.businessType = 'Renew'; // Update the businessType to 'Renew' for all businesses
        return business;
      });
  
      // Update the permit's businesses array
      permit.businesses = updatedBusinesses;
  
      // Update the permit status to 'Expired'
      permit.businesspermitstatus = 'Expired';
      permit.businessstatus = 'Expired';
  
      // Save the updated permit
      const updatedPermit = await permit.save();
  
      res.status(200).json({
        message: 'Business permit updated successfully',
        updatedPermit,
      });
    } catch (error) {
      console.error('Error updating business permit:', error);
      res.status(500).json({ message: 'Error updating business permit' });
    }
  };

module.exports = {expirebusinesspermit};