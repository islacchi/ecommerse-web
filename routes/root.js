const express = require('express');
const router = express.Router();
const path = require('path');

//add routes in api

router.get('^/$|/index(.ejs)?|/index(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    res.render("index.ejs",{username:""});
});
 
router.get('/shop-details(.ejs)?|/shop-details(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop-details.html'));
    res.render("shop-details.ejs");
});
router.get('/sign-in(.ejs)?|/sign-in(.ejs)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'sign-in.html'));
    res.render("sign-in.ejs");
});
router.get('/shop-grid(.ejs)?|/shop-grid(.ejs)?', (req, res) => {
    res.render("shop-grid.ejs");
});

router.get('^/$|/forgotPass(.ejs)?|/forgotPass(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    res.render("forgotPass.ejs");
});

router.get('^/$|/reset_pass(.ejs)?|/reset_pass(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    res.render("reset_pass.ejs");
});

router.get('^/$|/confirm_otp(.ejs)?|/confirm_otp(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    res.render("reset_pass.ejs");
});

router.get('/shoping-cart(.ejs)?|/shoping-cart(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop-details.html'));
    res.render("shoping-cart.ejs");
});

router.get('/checkout(.ejs)?|/checkout(.html)?', (req, res) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop-details.html'));
    res.render("checkout.ejs");
});

module.exports = router;