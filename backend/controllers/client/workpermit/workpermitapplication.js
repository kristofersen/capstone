const jwt = require('jsonwebtoken');
const { User, WorkPermit } = require('../../../index/models');
const { generateWorkPermitID } = require('../../../index/utils'); 
const JWT_SECRET = 'your_jwt_secret'; 

const workpermitapplication = async (req, res) => {
    const token = req.cookies.authToken; // Extract token from the cookie
   // console.log('Received token:', token);
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const files = req.files;
    const {
      lastName,
      firstName,
      middleInitial,
      permanentAddress,
      currentlyResiding,
      temporaryAddress,
      dateOfBirth,
      age,
      placeOfBirth,
      citizenship,
      civilStatus,
      gender,
      height,
      weight,
      mobileTel,
      email,
      educationalAttainment,
      natureOfWork,
      placeOfWork,
      companyName,
      name2,
      mobileTel2,
      address,
      workpermitclassification,
    } = req.body;
    console.log('Incoming data:', req.body);
    console.log(req.files)
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
      console.log('Decoded token:', decoded);
      
      const userId = decoded.userId;
      const permitID = await generateWorkPermitID('WP');
      const status = "Pending";
      const classification = workpermitclassification;
      let amount; // Declare amountToPay outside the if-else block
  
      if (classification === "New") {
        amount = "0"; // Set amount for New classification
      } else if (classification === "Renewal") {
        amount = "200"; // Set amount for Renew classification
      }
  
      // Create a new WorkPermit instance
      const newWorkPermit = new WorkPermit({
        id: permitID,
        userId,
        workpermitstatus: status,
        classification: classification,
        transaction: null,
        amountToPay: amount,
        permitFile: null,
        permitDateIssued: null,
        permitExpiryDate: null,
        expiryDate: null,
        applicationdateIssued: new Date(Date.now()).toISOString(),
        applicationComments: null,
        formData: {
          personalInformation: {
            lastName,
            firstName,
            middleInitial,
            permanentAddress,
            currentlyResiding: currentlyResiding === 'true',
            temporaryAddress,
            dateOfBirth,
            age,
            placeOfBirth,
            citizenship,
            civilStatus,
            gender,
            height,
            weight,
            mobileTel,
            email,
            educationalAttainment,
            natureOfWork,
            placeOfWork,
            companyName,
            workpermitclassification,
          },
          emergencyContact: {
            name2,
            mobileTel2,
            address,
          },
          files: {
            document1: files.document1 ? files.document1[0].filename : null,
            document2: files.document2 ? files.document2[0].filename : null,
            document3: files.document3 ? files.document3[0].filename : null,
            document4: files.document4 ? files.document4[0].filename : null,
          },
        },
        receipt: {
        receiptId: null, //Generated
        modeOfPayment: null, //online, onsite
        paymentType: null, // gcash, bank payment, onsite
        paymentNumber: null, // gcashnumber, card number
        receiptName: null, //user's name
        receiptDate: null, //date
        amountPaid: null, // amount
        receiptFile: null,
        }
      });
      // Save new work permit and retrieve its _id
      const savedWorkPermit = await newWorkPermit.save();
      console.log('Saved WorkPermit ID:', savedWorkPermit._id); // Log the saved ID
      
      await User.findByIdAndUpdate(userId, { $push: { workPermits: savedWorkPermit._id } });
      
      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error saving application:', error.message); // Log the error message
      res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
  };

  module.exports = {workpermitapplication};