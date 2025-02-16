const { User } = require('../../index/models');
const bcrypt = require('bcryptjs');

// Route to update user password
const changepassword = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
         user.password = hashedPassword;
         await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = {changepassword};