const { BusinessPermit } = require('../../index/models');
const { computeTax } = require('../../index/utils'); 


const updatebusinessnature = async (req, res) => {
    const { id } = req.params;
    const { businesses, deletedIds, businessesupdates } = req.body;
  
    try {
      const permit = await BusinessPermit.findById(id);
  console
      if (!permit) {
        return res.status(404).json({ message: 'Business permit not found' });
      }
  
      // Remove deleted businesses
      permit.businesses = permit.businesses.filter(
        (business) => !deletedIds.includes(business._id.toString())
      );
  
      // add new ones
      businesses.forEach((business) => {
        const index = permit.businesses.findIndex(
          (b) => b._id.toString() === business._id
        );
              // Add new business and compute tax
              const tax = computeTax(business.businessNature, business.capitalInvestment, business.businessType);
              business.tax = tax;
          // Add new business
          permit.businesses.push(business);
      });
  
         // Update existing businesses
         businessesupdates.forEach((business) => {
          const index = permit.businesses.findIndex(
            (b) => b._id.toString() === business._id
          );
          if (index !== -1) {
                  // Add new business and compute tax
        const tax = computeTax(business.businessNature, business.capitalInvestment, business.businessType);
        business.tax = tax;
            // Update existing business
            permit.businesses[index] = business;
          } 
        });
  
            // Calculate the total capital investment and total tax
      const totalCapitalInvestment = permit.businesses.reduce(
        (total, business) => total + (business.capitalInvestment || 0),
        0
      );
  
      const totalTax = permit.businesses.reduce(
        (total, business) => total + (business.tax || 0),
        0
      );
      permit.totalgrosssales = totalCapitalInvestment;
      permit.totaltax = totalTax;
  
      await permit.save();
  
      res.status(200).json({ message: 'Businesses updated successfully', data: permit });
    } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {updatebusinessnature};