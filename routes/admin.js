const express = require('express');
const router = express.Router();
const adminQueryController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const prodController = require('../controllers/productsController');
const usersController = require('../controllers/userManagementController');
const verifyJWT = require('../middleware/verifyJWT');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function( req,file, cb) {
        cb(null, path.join(__dirname,'../public/img/product/'));
    },
    filename: function( req,file, cb ){
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });





router.get('/admin', (req, res) => {
    res.render("login.ejs");
});
router.get('/logout', (req, res) => {
    res.render("login.ejs");
});

    router.post('/admin/login', authController.handleLoginAdmin);
    router.get('/admin.ejs', adminQueryController.handleHomeQuery);
    router.get('/home', verifyJWT ,adminQueryController.handleHomeQuery);
    router.get('/prods', verifyJWT ,adminQueryController.handleProdQuery);
    router.get('/products.ejs',adminQueryController.handleProdQuery);
    router.get('/productadd', verifyJWT ,adminQueryController.handleAddProdQuery);
    router.get('/add-product.ejs',adminQueryController.handleAddProdQuery);
    
 
    router.post('/createprod',verifyJWT ,adminQueryController.handleCreateProdQuery ,upload.single('proad'),(req,res) => {
        console.log('file',req.file);
        res.status(200).json({resultData: req.file.filename,message: "Product Added Successfully!"});
    });
    router.post('/writeData',verifyJWT ,prodController.handleUploadProdQuery);
    router.get('/edit-product.ejs',prodController.handleEditProdQuery);
    router.post('/getproddata',verifyJWT ,prodController.handleGetProdQuery);
    router.post('/updateproddata',verifyJWT ,prodController.handleUpdateProdQuery);


    router.get('/accounts.ejs',adminQueryController.handleAccountDetailsQuery);
    router.get('/userslist',verifyJWT ,usersController.handleUserListQuery);

    router.post('/updateUser',verifyJWT ,usersController.handleUpdateUserQuery);
    router.post('/deleteUser',verifyJWT ,usersController.handleDeleteUserQuery);


module.exports = router;