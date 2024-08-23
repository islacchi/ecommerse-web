const express = require('express');
const router = express.Router();
const orderQueryController = require('../controllers/ordersController');
const verifyJWT = require('../middleware/verifyJWT');


router.post('/', verifyJWT,orderQueryController.handleAddtoCart);

module.exports = router;