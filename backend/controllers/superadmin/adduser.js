
const { User } = require('../../index/models');
const generateUserId = require('../../utils/generateUserId');

const adduser = async (req, res) => {
    const { firstName, middleName, lastName, contactNumber, email, address, password, userrole } = req.body;
  
    console.log('Incoming data:', req.body);
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      let userRole;
      let userID;
  
      if (userrole === 'ADM') {
        userRole = 'Admin';
      } else if (userrole === 'CL') {
        userRole = 'Client';
      } else if (userrole === 'DC') {
        userRole = 'Data Controller';
      } else {
        return res.status(400).json({ message: 'Invalid user role' });
      }
  
      userID = await generateUserId(userrole);
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        contactNumber,
        email,
        address,
        userId: userID,
        password: hashedPassword,
        userrole: userRole,
        isVerified: true,
        accountOpenedDate: new Date().toISOString(),
      });
  
      await newUser.save();
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


module.exports = {adduser};