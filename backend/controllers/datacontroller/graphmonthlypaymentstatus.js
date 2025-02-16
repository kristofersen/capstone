
const { WorkPermit } = require('../../index/models');

const graphmonthlypaymentstatus = async (req, res) => {
    try {
      const monthlyData = await WorkPermit.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            paid: {
              $sum: {
                $cond: [{ $eq: ["$workpermitstatus", "Paid"] }, 1, 0]
              }
            },
            unpaid: {
              $sum: {
                $cond: [{ $eq: ["$workpermitstatus", "Unpaid"] }, 1, 0]
              }
            }
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        },
        {
          $project: {
            _id: 0,
            month: {
              $concat: [
                { $arrayElemAt: [["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "$_id.month"] },
                " ",
                { $toString: "$_id.year" }
              ]
            },
            paid: 1,
            unpaid: 1
          }
        }
      ]);
  
      res.json(monthlyData);
    } catch (error) {
      console.error('Error fetching monthly payment status:', error);
      res.status(500).json({ message: 'Error fetching monthly payment status' });
    }
  };

  module.exports = {graphmonthlypaymentstatus};