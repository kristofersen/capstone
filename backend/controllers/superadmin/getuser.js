const { User } = require('../../index/models');

const getuser = async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {getuser};