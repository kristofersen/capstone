const express = require('express');
const { updatebusinesspermitstatus } = require('../index/admin');


const router = express.Router();

router.put('/updatebusinesspermitstatus/:permitId', updatebusinesspermitstatus);

module.exports = router;