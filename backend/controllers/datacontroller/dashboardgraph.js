const { WorkPermit, BusinessPermit } = require('../../index/models');


// Endpoint for fetching the count of new working permits 
    const newWorkingpermits = async (req, res) => {
    try {
      const newPermitsCount = await WorkPermit.countDocuments({ classification: 'New' });
      const month = new Date().toLocaleString('default', { month: 'long' });
      res.json({ count: newPermitsCount });
    } catch (error) {
      console.error('Error fetching new working permits data:', error);
      res.status(500).json({ message: 'Error fetching new working permits data' });
    }
  };
  
  // Endpoint for fetching the count of renewal working permits 
    const renewalWorkingpermits = async (req, res) => {
    try {
      const renewalPermitsCount = await WorkPermit.countDocuments({ classification: 'Renewal' });
      const month = new Date().toLocaleString('default', { month: 'long' });
      res.json({ count: renewalPermitsCount });
    } catch (error) {
      console.error('Error fetching renewal working permits data:', error);
      res.status(500).json({ message: 'Error fetching renewal working permits data' });
    }
  };
  
  // Endpoint for fetching the count of new business permits
   const newBusinesspermits = async (req, res) => {
    try {
      const newBusinessPermitsCount = await BusinessPermit.countDocuments({ classification: 'New' });
      const month = new Date().toLocaleString('default', { month: 'long' });
      res.json({ count: newBusinessPermitsCount });
    } catch (error) {
      console.error('Error fetching new business permits data:', error);
      res.status(500).json({ message: 'Error fetching new business permits data' });
    }
  };
  
  // Endpoint for fetching the count of renewal business permits
    const renewalBusinesspermits = async (req, res) => {
    try {
      const renewalBusinessPermitsCount = await BusinessPermit.countDocuments({ classification: 'Renewal' });
      const month = new Date().toLocaleString('default', { month: 'long' });
      res.json({ count: renewalBusinessPermitsCount });
    } catch (error) {
      console.error('Error fetching renewal business permits data:', error);
      res.status(500).json({ message: 'Error fetching renewal business permits data' });
    }
  };
  
  
  // Endpoint for fetching the count of working permits
   const workingpermitsChart = async (req, res) => {
    try {
      const workingPermits = await WorkPermit.countDocuments();
      const month = new Date().toLocaleString('default', { month: 'long' });
      res.json({ label: 'Working Permit', count: workingPermits });
    } catch (error) {
      console.error('Error fetching working permit data:', error);
      res.status(500).json({ message: 'Error fetching working permit data' });
    }
  };
  
  // Endpoint for fetching the count of business permits
    const businesspermitsChart = async (req, res) => {
    try {
      const businessPermits = await BusinessPermit.countDocuments();
      const month = new Date().toLocaleString('default', { month: 'long' });
      res.json({ label: 'Business Permit', count: businessPermits });
    } catch (error) {
      console.error('Error fetching business permit data:', error);
      res.status(500).json({ message: 'Error fetching business permit data' });
    }
  };
  
  // For the Dashboard
   const workpermitdatastats = async (req, res) => {
    try {
      const totalPermitApplications = await WorkPermit.countDocuments();
      const totalRenewalApplications = await WorkPermit.countDocuments({ classification: 'Renewal' });
      const totalCollections = await WorkPermit.aggregate([
        { $group: { _id: null, total: { $sum: "$amountPaid" } } }
      ]);
      const totalReleased = await WorkPermit.countDocuments({ workpermitstatus: 'Released' });
  
      res.json({
        totalPermitApplications,
        totalRenewalApplications,
        totalCollections: totalCollections[0]?.total || 0,
        totalReleased
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
  };
  
  // Endpoint to fetch dashboard data
     const dashboardData = async (req, res) => {
    try {
      const totalWorkPermitApplications = await WorkPermit.countDocuments();
      const totalWorkRenewalApplications = await WorkPermit.countDocuments({ classification: 'Renewal' });
      const totalWorkCollections = await WorkPermit.aggregate([
        { $group: { _id: null, total: { $sum: "$amountPaid" } } }
      ]);
      const totalWorkReleased = await WorkPermit.countDocuments({ workpermitstatus: 'Released' });
  
      const totalBusinessPermitApplications = await BusinessPermit.countDocuments();
      const totalBusinessRenewalApplications = await BusinessPermit.countDocuments({ classification: 'Renewal' });
      const totalBusinessCollections = await BusinessPermit.aggregate([
        { $group: { _id: null, total: { $sum: "$amountPaid" } } }
      ]);
      const totalBusinessReleased = await BusinessPermit.countDocuments({ businesspermitstatus: 'Released' });
  
      res.json({
        totalWorkPermitApplications,
        totalWorkRenewalApplications,
        totalWorkCollections: totalWorkCollections[0]?.total || 0,
        totalWorkReleased,
        totalBusinessPermitApplications,
        totalBusinessRenewalApplications,
        totalBusinessCollections: totalBusinessCollections[0]?.total || 0,
        totalBusinessReleased
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  };
  
  // Endpoint to fetch permit applications by category
     const permitApplicationsByCategory = async (req, res) => {
    try {
      const workPermitCategories = await WorkPermit.aggregate([
        { $group: { _id: "$classification", count: { $sum: 1 } } }
      ]);
  
      const businessPermitCategories = await BusinessPermit.aggregate([
        { $group: { _id: "$classification", count: { $sum: 1 } } }
      ]);
  
      res.json({
        workPermitCategories,
        businessPermitCategories
      });
    } catch (error) {
      console.error('Error fetching permit applications by category:', error);
      res.status(500).json({ message: 'Error fetching permit applications by category' });
    }
  };


const businesspermitmonthlyappication =  async (req, res) => {
    try {
      const monthlyData = await BusinessPermit.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            count: { $sum: 1 }
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
            count: 1
          }
        }
      ]);
  
      res.json(monthlyData);
    } catch (error) {
      console.error('Error fetching monthly business permit applications:', error);
      res.status(500).json({ message: 'Error fetching monthly business permit applications' });
    }
  };

  module.exports = {newWorkingpermits, renewalWorkingpermits, newBusinesspermits, renewalBusinesspermits, workingpermitsChart, businesspermitsChart, workpermitdatastats, dashboardData, permitApplicationsByCategory, businesspermitmonthlyappication}
  