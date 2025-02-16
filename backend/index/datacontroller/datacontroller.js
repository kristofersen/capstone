const { changepassword } = require('../../controllers/datacontroller/changepassword');
const { businesspermitdetails } = require('../../controllers/datacontroller/businesspermitdetails');
const { getassessedperson } = require('../../controllers/datacontroller/getassessedperson');
const { savingassessment } = require('../../controllers/datacontroller/savingassessment');
const {
    newWorkingpermits, 
    renewalWorkingpermits, 
    newBusinesspermits, 
    renewalBusinesspermits, 
    workingpermitsChart, 
    businesspermitsChart, 
    workpermitdatastats, 
    dashboardData, 
    permitApplicationsByCategory,
    businesspermitmonthlyappication} = require('../../controllers/datacontroller/dashboardgraph');
const { updatebusinessnature } = require('../../controllers/datacontroller/updatebusinessnature');
const { updatebusinessattachment } = require('../../controllers/datacontroller/updatebusinessattachment');
const { updatebusinessinfopermit } = require('../../controllers/datacontroller/updatebusinessinfopermit');
const { getbusinesspermitforassessment } = require('../../controllers/datacontroller/getbusinesspermitforassessment');
const { updatebusinessownerpermit } = require('../../controllers/datacontroller/updatebusinessownerpermit');
const { rejectbusinesspermit } = require('../../controllers/datacontroller/rejectbusinesspermit');
const { getworkpermitforassessment } = require('../../controllers/datacontroller/getworkpermitforassessment');
const { updateworkpermit } = require('../../controllers/datacontroller/updateworkpermit');
const { updateworkpermitattachment } = require('../../controllers/datacontroller/updateworkpermitattachment');
const { getbusinesspermitforpayment } = require('../../controllers/datacontroller/getbusinesspermitforpayment');
const { getworkpermitforpayment } = require('../../controllers/datacontroller/getworkpermitforpayment');
const { getbusinesspermitrelease } = require('../../controllers/datacontroller/getbusinesspermitrelease');
const { getworkpermitrelease } = require('../../controllers/datacontroller/getworkpermitrelease');
const { graphbusinesspermitlocation } = require('../../controllers/datacontroller/graphbusinesspermitlocation');
const { graphmonthlypaymentstatus } = require('../../controllers/datacontroller/graphmonthlypaymentstatus');
const { graphpermitapplicationcategory } = require('../../controllers/datacontroller/graphpermitapplicationcategory');
const { getbusinesspermitforretire } = require('../../controllers/datacontroller/getbusinesspermitforretire');
const { retirebusinesspermit } = require('../../controllers/datacontroller/retirebusinesspermit');
const { workpermithandleupdate } = require('../../controllers/datacontroller/workpermithandleupdate');
const { workpermitdetails } = require('../../controllers/datacontroller/workpermitdetails');
const { workpermitreject } = require('../../controllers/datacontroller/workpermitreject');


module.exports = {
    changepassword,
    businesspermitdetails,

    getassessedperson,
    getbusinesspermitforassessment,
    getworkpermitforassessment,
    getbusinesspermitforpayment,
    getworkpermitforpayment,
    getbusinesspermitrelease,
    getworkpermitrelease,
    getbusinesspermitforretire,


    savingassessment,
    updatebusinessnature,
    updatebusinessattachment,
    updatebusinessinfopermit,
    updatebusinessownerpermit,

    updateworkpermit,
    updateworkpermitattachment,

    rejectbusinesspermit,
    retirebusinesspermit,

    workpermithandleupdate,
    workpermitdetails,
    workpermitreject,
    
    


//Graphs
    newWorkingpermits, 
    renewalWorkingpermits, 
    newBusinesspermits, 
    renewalBusinesspermits, 
    workingpermitsChart, 
    businesspermitsChart, 
    workpermitdatastats, 
    dashboardData, 
    permitApplicationsByCategory,

    graphbusinesspermitlocation,
    graphmonthlypaymentstatus,
    graphpermitapplicationcategory,

    businesspermitmonthlyappication

};