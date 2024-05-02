const express = require('express');
const router = express.Router();
const prodQueryController = require('../controllers/productsController');
const verifyJWT = require('../middleware/verifyJWT');


router.get('/', verifyJWT,prodQueryController.handleProdQuery);

module.exports = router;