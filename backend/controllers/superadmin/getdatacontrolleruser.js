
const { User } = require('../../index/models');

const getdatacontrolleruser = async (req, res) => {
    try {
      const users = await User.find({ userrole: 'Data Controller' });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {getdatacontrolleruser};