const { BusinessPermit } = require('../index/models');

const generateBusinessPermitNumber = async (year) => {
    // Get the count of paid permits for the current year
    const paidPermitsThisYear = await BusinessPermit.find({
      createdAt: { 
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
      paymentStatus: 'Paid',  // Filter by payment status
    }).countDocuments(); // Get the count of paid permits only
  
    // Permit number is the count of paid permits + 1
    return paidPermitsThisYear + 1;
  };

  module.exports ={generateBusinessPermitNumber}