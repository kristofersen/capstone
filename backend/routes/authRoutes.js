const express = require('express');
const { loginUser, signup, logout, checkauthclient, sendOTP, verifyemailotp, updatepassword, checkauthdatacontroller, checkauthadmin, superadminlogin, checkauthsuperadmin } = require('../index/auth');
const { authenticateToken, authenticatesuperadmin }= require('../index/middleware');

const router = express.Router();

// Homepage routes
router.post('/login', loginUser);

router.post('/signup', signup);

router.post('/logout', authenticateToken, logout);

//superadmin
router.post('/superadminlogin', superadminlogin);


// Authentication Routes
router.get('/check-auth-client', authenticateToken, checkauthclient);

router.get('/check-auth-datacontroller', authenticateToken, checkauthdatacontroller);

router.get('/check-auth-admin', authenticateToken, checkauthadmin);

router.get('/check-auth-superadmin', authenticatesuperadmin, checkauthsuperadmin);

// OTP Routes
router.post('/sendOTP', sendOTP);

router.post('/verifyemailotp', verifyemailotp);

router.post('/updatepassword', updatepassword);


module.exports = router;