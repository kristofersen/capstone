const express = require('express');
const { profile } = require('../index/client/client');
const { uploadworkpermitfiles, uploadworkpermitreceipt, uploadbusinesspermitfiles } = require('../index/middleware');
const { fetchuserworkpermits, workpermitapplication, fetchworkpermitdetails, workpermithandlepayment, checkpermitlatest, expireworkpermit, deleteworkpermit } = require('../index/client/workpermit');
const { fetchuserbusinesspermits, businesspermitapplication, fetchbusinesspermitdetails, businesspermithandlepayment, deletebusinesspermit, expirebusinesspermit, retirebusinessapplication, businesspermitrenewal } = require('../index/client/businesspermit');






const router = express.Router();

//User
router.get('/profile', profile);

//Work Permits
router.get('/fetchuserworkpermits', fetchuserworkpermits);

router.get('/fetchworkpermitdetails/:id', fetchworkpermitdetails);

router.post('/workpermitapplication', uploadworkpermitfiles, workpermitapplication);

router.post('/workpermithandlepayment/:id', uploadworkpermitreceipt, workpermithandlepayment);

router.get('/checkpermitlatest', checkpermitlatest);

router.put('/expireworkpermit/:id', expireworkpermit);

router.delete('/deleteworkpermit/:permitId', deleteworkpermit);

//Business Permits
router.get('/fetchuserbusinesspermits', fetchuserbusinesspermits);

router.get('/fetchbusinesspermitdetails/:id', fetchbusinesspermitdetails);

router.post('/businesspermitapplication', uploadbusinesspermitfiles, businesspermitapplication);

router.put('/businesspermithandlepayment/:id', uploadbusinesspermitfiles, businesspermithandlepayment );

router.post('/businesspermitrenewal', uploadbusinesspermitfiles, businesspermitrenewal);

router.post('/retirebusinessapplication/:id', uploadbusinesspermitfiles, retirebusinessapplication);

router.put('/expirebusinesspermit/:id', expirebusinesspermit);

router.delete('/deletebusinesspermit/:permitId', deletebusinesspermit);



module.exports = router;
