// API endpoint to fetch user data by ID

const { User } = require('../../index/models');


const handleremoveuser = async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ userId: req.params.id });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {handleremoveuser};