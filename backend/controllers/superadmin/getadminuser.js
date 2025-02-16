
const { User } = require('../../index/models');

const getadminuser = async (req, res) => {
    try {
      const users = await User.find({ userrole: 'Admin' });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {getadminuser};