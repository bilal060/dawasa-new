const express = require('express');
const router = express.Router();
// const { verifyToken } = require("../middleware/auth");
const prepaidController = require("../controllers/prepaidController");

router.post('/customer/prepiad', prepaidController.prepaidList);
// router.post('/prepaid/customerDetails', verifyToken, prepaidMeterControl.getCustomerData)


module.exports = router
