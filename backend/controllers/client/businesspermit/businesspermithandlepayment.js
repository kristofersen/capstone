
const { BusinessPermit } = require('../../../index/models');
const { generateBusinessPermitNumber, generateBusinessPermitPDF, generateBusinessPaymentReceipt} = require('../../../index/utils')


const businesspermithandlepayment = async (req, res) => {
    const { id } = req.params; // Get the permit ID from the URL
    const { paymentStatus, businesspermitstatus } = req.body; // Get the payment status from the request body
  
    try {
      // Get the current year and calculate next year's January 1st
      const nextYear = new Date().getFullYear() + 1;
      const nextYearJan1 = new Date(nextYear, 0, 1); // January 1st of the next year
  
      // Generate the permit number
      const permitNumber = await generateBusinessPermitNumber(nextYear);
      const businessPermitFile = await generateBusinessPermitPDF(id, permitNumber);
      const receiptfile = await generateBusinessPaymentReceipt(id);
  
      // Find the permit by ID and update it
      const permit = await BusinessPermit.findByIdAndUpdate(
        id,
        {
          paymentStatus,
          businesspermitstatus,
          permitnumber: permitNumber, // Assign the generated permit number
          permitDateIssued: new Date().toISOString(), // Current date
          permitExpiryDate: nextYearJan1.toISOString(), // Set to Jan 1st of next year
          expiryDate: nextYearJan1.toISOString(), // Set to Jan 1st of next year
          permitFile: businessPermitFile,
          businessstatus: 'Active',
  
          receipt: {
            receiptDate: new Date().toISOString(),
            amountPaid: 200, // To change
            receiptFile: receiptfile,
          }
        },
        { new: true }
      );
  
      // Check if permit was found and updated
      if (!permit) {
        return res.status(404).json({ message: 'Permit not found' });
      }
  
      res.status(200).json({ message: 'Payment status and permit number updated', permit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating payment status' });
    }
  };

module.exports = {businesspermithandlepayment};
  