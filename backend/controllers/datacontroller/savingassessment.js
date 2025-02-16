const { User, BusinessPermit } = require('../../index/models');
const jwt = require('jsonwebtoken');
const { generateStatementofAccount } = require('../../index/utils'); 
const JWT_SECRET = 'your_jwt_secret'; 


const savingassessment = async (req, res) => {
    const { id } = req.params;
    const updatedStatement = req.body; // The `updatedData` object sent from the frontend
  
    try {
      // Extract the token from the request cookies
      const token = req.cookies.authToken;
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      // Decode the token to get the user ID
      const decoded = jwt.verify(token, JWT_SECRET); // Assuming JWT_SECRET is in your environment variables
      const user = await User.findById(decoded.userId);
      const BusinessPermitContent = await BusinessPermit.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const statementofaccountfile = await generateStatementofAccount(updatedStatement, BusinessPermitContent);
      const updatedPermit = await BusinessPermit.findByIdAndUpdate(
        id,
        {
          $set: {
            // Compute the total amount to pay
            'amountToPay': updatedStatement.paymentmethodtotal,
            'totaltax': updatedStatement.total,
            'transaction': `${updatedStatement.paymentmethod} Payment`,
            'business.paymentmethod': updatedStatement.paymentmethod,
            'businesspermitstatus': 'Assessed',
            'statementofaccount.permitassessed': decoded.userId, // Update permitassessed with the userId
            'statementofaccount.dateassessed': updatedStatement.dateassessed,
            'statementofaccount.mayorspermit': updatedStatement.mayorspermit,
            'statementofaccount.sanitary': updatedStatement.sanitary,
            'statementofaccount.health': updatedStatement.health,
            'statementofaccount.businessplate': updatedStatement.businessplate,
            'statementofaccount.zoningclearance': updatedStatement.zoningclearance,
            'statementofaccount.annualInspection': updatedStatement.annualInspection,
            'statementofaccount.environmental': updatedStatement.environmental,
            'statementofaccount.miscfee': updatedStatement.miscfee,
            'statementofaccount.liquortobaco': updatedStatement.liquortobaco,
            'statementofaccount.liquorplate': updatedStatement.liquorplate,
            'statementofaccount.statementofaccountfile': statementofaccountfile
          }
        },
        { new: true } // Return the updated document
      );
      
      if (!updatedPermit) {
        return res.status(404).json({ message: 'BusinessPermit not found' });
      }
  
      res.status(200).json({ message: 'Update successful', updatedPermit });
    } catch (error) {
      console.error('Error updating statement of account:', error);
      res.status(500).json({ message: 'Update failed', error });
    }
  };

  module.exports = {savingassessment};