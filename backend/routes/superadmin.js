const express = require('express');
const { getadminuser, getdatacontrolleruser, handleremoveuser, getuser, updateuser, adduser } = require('../index/superadmin');



const router = express.Router();

router.get('/getadminuser', getadminuser);

router.get('/getdatacontrolleruser', getdatacontrolleruser);

router.delete('/handleremoveuser/:id', handleremoveuser);

router.get('/getuser/:id', getuser);

router.put('/updateuser/:id', updateuser);

router.post('/adduser', adduser);

module.exports = router;