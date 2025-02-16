const { User } = require('../../index/models');

const updateuser = async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Log the request body
      const user = await User.findOneAndUpdate(
        { userId: req.params.id },
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(404).send('User not found');
      }
      console.log('Updated User:', user); // Log the updated user
      res.send(user);
    } catch (error) {
      console.error('Error updating user:', error); // Log the error
      res.status(500).send(error);
    }
  };

  module.exports = {updateuser};
  