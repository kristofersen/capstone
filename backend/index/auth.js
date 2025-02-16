const { loginUser, signup, logout, checkauthclient, sendOTP, verifyemailotp, updatepassword, checkauthdatacontroller, checkauthadmin, superadminlogin, checkauthsuperadmin } = require('../controllers/auth/authController');

module.exports = {loginUser,
    superadminlogin,
    signup,
    logout,
    checkauthclient,
    checkauthdatacontroller,
    checkauthadmin,
    checkauthsuperadmin,
    sendOTP,
    verifyemailotp,
    updatepassword };