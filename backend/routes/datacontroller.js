const express = require('express');
const { 
    changepassword, 
    businesspermitdetails, 
    getassessedperson, 
    savingassessment, 
    newWorkingpermits, 
    renewalWorkingpermits,
    newBusinesspermits,
    renewalBusinesspermits,
    workingpermitsChart,
    businesspermitsChart,
    workpermitdatastats,
    dashboardData,
    permitApplicationsByCategory,
    updatebusinessnature,
    updatebusinessattachment,
    updatebusinessinfopermit,
    getbusinesspermitforassessment,
    updatebusinessownerpermit,
    rejectbusinesspermit,
    getworkpermitforassessment,
    updateworkpermit,
    updateworkpermitattachment,
    getbusinesspermitforpayment,
    getworkpermitforpayment,
    getbusinesspermitrelease,
    getworkpermitrelease,
    graphbusinesspermitlocation,
    graphmonthlypaymentstatus,
    graphpermitapplicationcategory,
    getbusinesspermitforretire,
    retirebusinesspermit,
    workpermithandleupdate,
    workpermitdetails,
    workpermitreject,
    businesspermitmonthlyappication} = require('../index/datacontroller/datacontroller');
const uploadbusinesspermitfiles = require('../middleware/uploadbusinesspermitfiles');
const uploadworkpermitfiles = require('../middleware/uploadworkpermitfiles');


const router = express.Router();

router.post('/changepassword', changepassword);

router.get('/getassessedperson/:id', getassessedperson);

//Fetch Appliactions
router.get('/getbusinesspermitforassessment/:type', getbusinesspermitforassessment);

router.get('/getworkpermitforassessment/:type', getworkpermitforassessment);


router.get('/getbusinesspermitforpayment/:type', getbusinesspermitforpayment);

router.get('/getworkpermitforpayment/:type', getworkpermitforpayment);

router.get('/getbusinesspermitrelease/:type', getbusinesspermitrelease);


router.get('/getworkpermitrelease/:type', getworkpermitrelease);

router.get('/getbusinesspermitforretire', getbusinesspermitforretire)







router.put('/updateworkpermit/:id', updateworkpermit);

router.post('/updateworkpermitattachment/:id', uploadworkpermitfiles, updateworkpermitattachment)


//Business Permit Table
router.get('/businesspermitdetails/:id', businesspermitdetails);

router.put('/savingassessment/:id', savingassessment);

router.post('/updatebusinessnature/:id', updatebusinessnature);

router.post('/updatebusinessattachment/:id', uploadbusinesspermitfiles, updatebusinessattachment);

router.put('/updatebusinessinfopermit/:id', updatebusinessinfopermit);

router.put('/updatebusinessownerpermit/:id', updatebusinessownerpermit);

router.put('/rejectbusinesspermit/:permitId', rejectbusinesspermit);

router.put('/retirebusinesspermit/:id', retirebusinesspermit);



router.put('/workpermithandleupdate/:id', workpermithandleupdate);

router.get('/workpermitdetails/:id', workpermitdetails);

router.put('/workpermitreject/:id', workpermitreject);



//Graphs

router.get('/newWorkingpermits', newWorkingpermits);

router.get('/renewalWorkingpermits', renewalWorkingpermits);

router.get('/newBusinesspermits', newBusinesspermits);

router.get('/renewalBusinesspermits', renewalBusinesspermits);

router.get('/workingpermitsChart', workingpermitsChart);

router.get('/businesspermitsChart', businesspermitsChart);

router.get('/workpermitdatastats', workpermitdatastats);

router.get('/dashboardData', dashboardData);

router.get('/permitApplicationsByCategory', permitApplicationsByCategory);

router.get('/businesspermitmonthlyappication', businesspermitmonthlyappication);



router.get('/graphbusinesspermitlocation', graphbusinesspermitlocation);

router.get('/graphmonthlypaymentstatus', graphmonthlypaymentstatus);

router.get('/graphpermitapplicationcategory', graphpermitapplicationcategory)

module.exports = router;