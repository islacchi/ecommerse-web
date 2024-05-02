const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userManagementController');



router.post('/',usersController.handleForgotPassQuery);

module.exports = router;