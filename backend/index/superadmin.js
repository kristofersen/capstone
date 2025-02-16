
const { adduser } = require("../controllers/superadmin/adduser");
const { getadminuser } = require("../controllers/superadmin/getadminuser");
const { getdatacontrolleruser } = require("../controllers/superadmin/getdatacontrolleruser");
const { getuser } = require("../controllers/superadmin/getuser");
const { handleremoveuser } = require("../controllers/superadmin/handleremoveuser");
const { updateuser } = require("../controllers/superadmin/updateuser");

module.exports = {
    getadminuser,
    getdatacontrolleruser,
    getuser,

    adduser,

    handleremoveuser,

    updateuser,

};