const express = require('express');
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const userController = require("../controllers/userController");

// router.post('/user/list', verifyToken, userController.getList);
// router.get('/user', verifyToken, userController.getUser);
// router.post('/user/update-profile', verifyToken, userController.updateProfile);
// router.post('/user/change-password', verifyToken, userController.changePassword);
// router.post('/user/deactivate', verifyToken, userController.userDeactivate);
router.post('/user/create', userController.createUser);
// router.delete('/user/delete/:id', verifyToken, userController.deleteUser);
// router.post('/user/update', verifyToken, userController.userUpdate);
// router.post('/user/change-status', verifyToken, userController.updateStatus);
// router.post('/user/deactivate-account', verifyToken, userController.updateCurrentStatus);
// router.post('/user/activate-account', userController.activateAccount);
// router.get('/user/profile/:id',verifyToken,userController.viewProfile);


module.exports = router 