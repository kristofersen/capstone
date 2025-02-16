const { workpermitapplication } = require('../../controllers/client/workpermit/workpermitapplication');
const {fetchuserworkpermits } = require('../../controllers/client/workpermit/fetchuserworkpermits');
const { fetchworkpermitdetails } = require('../../controllers/client/workpermit/fetchworkpermitdetails');
const { workpermithandlepayment } = require('../../controllers/client/workpermit/workpermithandlepayment'); 
const { checkpermitlatest } = require('../../controllers/client/workpermit/checkpermitlatest'); 
const { expireworkpermit } = require('../../controllers/client/workpermit/expireworkpermit');
const { deleteworkpermit } = require('../../controllers/client/workpermit/deleteworkpermit');

module.exports = { 
    workpermitapplication,
    fetchuserworkpermits, 
    fetchworkpermitdetails,
    workpermithandlepayment,
    checkpermitlatest,
    expireworkpermit,
    deleteworkpermit};