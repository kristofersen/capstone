const authenticateToken = require ('../middleware/authenticatetoken');
const uploadworkpermitfiles = require ('../middleware/uploadworkpermitfiles');
const uploadworkpermitreceipt = require ('../middleware/uploadworkpermitreceipt');
const uploadbusinesspermitfiles = require ('../middleware/uploadbusinesspermitfiles');
const { authenticatesuperadmin } = require('../middleware/authenticatesuperadmin');

module.exports = { authenticateToken,
    uploadworkpermitfiles,
    uploadworkpermitreceipt,
    uploadbusinesspermitfiles,
    authenticatesuperadmin };