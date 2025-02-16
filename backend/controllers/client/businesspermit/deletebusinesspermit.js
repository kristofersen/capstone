const { BusinessPermit } = require('../../../index/models');

const deletebusinesspermit = async (req, res) => {
    const { permitId } = req.params;
  
    try {
      const result = await BusinessPermit.deleteOne({ _id: permitId });
  
      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "Permit deleted successfully" });
      } else {
        return res.status(404).json({ message: "Permit not found" });
      }
    } catch (error) {
      console.error("Error deleting permit:", error);
      return res.status(500).json({ message: "Error deleting permit", error });
    }
  };

module.exports = {deletebusinesspermit};