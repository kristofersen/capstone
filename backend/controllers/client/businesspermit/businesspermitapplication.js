const jwt = require('jsonwebtoken');
const { User, BusinessPermit } = require('../../../index/models');
const { generateBusinessPermitID, computeTax } = require('../../../index/utils'); 
const JWT_SECRET = 'your_jwt_secret'; 

const businesspermitapplication = async (req, res) => {
    const token = req.cookies.authToken; // Extract token from the cookie
    // console.log('Received token:', token);
     
     if (!token) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
     const files = req.files;
     console.log("Processed files:", files);
     console.log(files.document1?.[0]?.path);
     console.log(files.document2?.[0]?.path);
     console.log(files.document3?.[0]?.path);
     console.log(files.document4?.[0]?.path);

     const {
      //Step 1
       corporation,
       lastname,
       firstname,
       middleinitial,
       civilstatus,
       companyname,
       gender,
       citizenship,
       tinnumber,
       representative,
       repfullname,
       repdesignation,
       repmobilenumber,
       houseandlot,
       buildingstreetname,
       subdivision,
       region,
       province,
       municipality,
       barangay,
       telephonenumber,
       mobilenumber,
       email,
  
      //Step 2
      businessname,
      businessscale,
      paymentmethod,
      businessbuildingblocklot,
      businessbuildingname,
      businesssubcompname,
      businessregion,
      businessprovince,
      businessmunicipality,
      businessbarangay,
      businesszip,
      businesscontactnumber,
      ownershiptype,
      agencyregistered,
      dtiregistrationnum,
      dtiregistrationdate,
      dtiregistrationexpdate,
      secregistrationnum,
      birregistrationnum,
      industrysector,
      businessoperation,
      typeofbusiness,
  
      //Step 3
      dateestablished,
      startdate,
      occupancy,
      otherbusinesstype,
      businessemail,
      businessarea,
      businesslotarea,
      numofworkermale,
      numofworkerfemale,
      numofworkertotal,
      numofworkerlgu,
      lessorfullname,
      lessormobilenumber,
      monthlyrent,
      lessorfulladdress,
      lessoremailaddress,
      
  
      //Step 4
      lat,
      lng,
   
      //Step 5
      businesses,
  
  
     } = req.body;
     console.log('Incoming data:', req.body);
     console.log(req.files);
  
  
     try {
       const decoded = jwt.verify(token, JWT_SECRET); // Decode the JWT to get the userId
       console.log('Decoded token:', decoded);
  
       const parsedBusinesses = JSON.parse(businesses);
       const userId = decoded.userId;
       const permitID = await generateBusinessPermitID('BP');
       const status = "Pending";
  
     // Iterate over parsed businesses and compute tax for each
     const updatedBusinesses = parsedBusinesses.map((business) => {
      const tax = computeTax(business.businessNature, business.capitalInvestment, business.businessType);
      return {
        ...business,
        tax: tax, // Add computed tax to the business object
      };
    });
  
    const totalCapitalInvestment = updatedBusinesses.reduce((total, business) => total + parseFloat(business.capitalInvestment || 0), 0);
  
  const totalTax = updatedBusinesses.reduce((total, business) => total + parseFloat(business.tax || 0), 0);
  
       const newBusinessPermit = new BusinessPermit({
         id: permitID,
         userId,
         businesspermitstatus: status,
         businessstatus: 'On Process',
         classification: 'NewBusiness',
         totalgrosssales: totalCapitalInvestment,
         totaltax: totalTax,
         transaction: null,
         amountToPay: null,
         paymentStatus: null,
         permitnumber: null,
         permitFile: null,
         permitDateIssued: null,
         permitExpiryDate: null,
         expiryDate: null,
         applicationdateIssued: new Date(Date.now()).toISOString(),
         applicationComments: null,
         owner:{
          corporation,
       lastname,
       firstname,
       middleinitial,
       civilstatus,
       companyname,
       gender,
       citizenship,
       tinnumber,
       representative,
       houseandlot,
       buildingstreetname,
       subdivision,
       region,
       province,
       municipality,
       barangay,
       telephonenumber,
       mobilenumber,
       email,
          representativedetails: {
            repfullname,
            repdesignation,
            repmobilenumber,
          },
         },
         business: {
          businessname,
          businessscale,
          paymentmethod,
          businessbuildingblocklot,
          businessbuildingname,
          businesssubcompname,
          businessregion,
          businessprovince,
          businessmunicipality,
          businessbarangay,
          businesszip,
          businesscontactnumber,
          ownershiptype,
          agencyregistered,
          dtiregistrationnum,
          dtiregistrationdate,
          dtiregistrationexpdate,
          secregistrationnum,
          birregistrationnum,
          industrysector,
          businessoperation,
          typeofbusiness,
        },
        otherbusinessinfo:{
          dateestablished,
      startdate,
      occupancy,
      otherbusinesstype,
      businessemail,
      businessarea,
      businesslotarea,
      numofworkermale,
      numofworkerfemale,
      numofworkertotal,
      numofworkerlgu,
      lessorfullname,
      lessormobilenumber,
      monthlyrent,
      lessorfulladdress,
      lessoremailaddress,
        },
        mapview:{
        lat,
        lng,
        },
        businesses: updatedBusinesses, // Save businesses as an array
        files: {
          document1: files.document1 ? files.document1[0].path : null,
          document2: files.document2 ? files.document2[0].path : null,
          document3: files.document3 ? files.document3[0].path : null,
          document4: files.document4 ? files.document4[0].path : null,
          document5: files.document5 ? files.document5[0].path : null,
          document6: files.document6 ? files.document6[0].path : null,
          document7: files.document7 ? files.document7[0].path : null,
          document8: files.document8 ? files.document8[0].path : null,
          document9: files.document9 ? files.document9[0].path : null,
          document10: files.document10 ? files.document10[0].path : null,
          remarksdoc1: null,
          remarksdoc2: null,
          remarksdoc3: null,
          remarksdoc4: null,
          remarksdoc5: null,
          remarksdoc6: null,
          remarksdoc7: null,
          remarksdoc8: null,
          remarksdoc9: null,
          remarksdoc10: null,
        },
        statementofaccount:{
          permitassessed: null,
          dateassessed: null,
          mayorspermit: null,
          sanitary: null,
          health: null,
          businessplate: null,
          zoningclearance: null,
          annualInspection: null,
          environmental: null,
          miscfee: null,
          liquortobaco: null,
          liquorplate: null,
          statementofaccountfile: null
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
       const savedBusinessPermit = await newBusinessPermit.save();
       console.log('Saved BusinessPermit ID:', savedBusinessPermit._id); // Log the saved ID
       
       await User.findByIdAndUpdate(userId, { $push: { businessPermits: savedBusinessPermit._id } });
       
       res.status(200).json({ message: 'Application submitted successfully' });
     } catch (error) {
       console.error('Error saving application:', error.message); // Log the error message
       res.status(500).json({ message: 'Error submitting application', error: error.message });
     }
   };

   module.exports = { businesspermitapplication };