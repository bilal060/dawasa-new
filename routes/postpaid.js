const express = require('express');
const router = express.Router();
// const { verifyToken } = require("../middleware/auth");
const postpaidController = require("../controllers/postpaidController");

router.post('/customer/postpiad', postpaidController.postpaidList);
// router.post('/prepaid/customerDetails', verifyToken, prepaidMeterControl.getCustomerData)


module.exports = router
