const { json } = require('body-parser');
const Product = require('../model/Products.js');
const User = require('../model/User.js');
const jwt = require('jsonwebtoken');

const handleProdQuery = async (req, res) => {
    
   const cookies = req.cookies;
   
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    const products = await Product.find();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            res.send({ products });
        }
    );
 
}

const handleUploadProdQuery = async  (req, res) => {

    const cookies = req.cookies;
     if (!cookies?.jwt) return res.sendStatus(401);
     const refreshToken = cookies.jwt;
     let verified=false; 
        const name = req.body.prodname;
        const id = req.body.id;
        const category = req.body.category;
        const desc = req.body.desc;
        const stock = req.body.stock;
        const price = req.body.price;
        const status = req.body.status;
        const url = req.body.url;

       console.log(name,id,category,desc,stock,price,status,url);
 
        const duplicate = await Product.findOne({ productName : name }).exec();
         console.log(duplicate);
         if(duplicate!==null){
           if (duplicate) return res.sendStatus(409); //Conflict 
         }
                try {
                    console.log("NULL "+duplicate);
                    //create and store the new user
                    const result = await Product.create({
                        "productId": id,
                        "productName": name,
                        "category": category,
                        "hearts": 5,
                        "price": 10,
                        "imageUrl": url,
                        "description": desc,
                        "status": status,
                        "stock": stock
                         
                    });
                    
                    console.log("RESULT "+result);

                    verified = true;
                    
                    //res.status(201).render('sign-in.ejs');

                } catch (err) {
                    res.status(500).json({ 'message': err.message });
                }
 

     const foundUser = await User.findOne({ refreshToken }).exec();
     if(foundUser == null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
     if (!foundUser) return res.sendStatus(403); //Forbidden 
     // evaluate jwt
     
     jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
             if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
             //console.log("AWIT"+req.body);
             if(verified){
       
                res.status(201).json({ 'message': `Successfully added product!`,'success' : true });
             }

             
             
         }
     );

     

}


const handleEditProdQuery = async (req, res) => {
    
    const cookies = req.cookies;
     if (!cookies?.jwt) return res.sendStatus(401);
     const refreshToken = cookies.jwt;
  
     const foundUser = await User.findOne({ refreshToken }).exec();
     console.log(foundUser);
     if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
     if (!foundUser) return res.sendStatus(403); //Forbidden 
     // evaluate jwt 
     jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
             if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 
 
             res.render("edit-product.ejs");
         }
     );
  
 }


 const handleGetProdQuery = async (req, res) => {
    console.log(req.body);
    const prodN = req.body.productName;
    console.log(prodN);
    const cookies = req.cookies;
     if (!cookies?.jwt) return res.sendStatus(401);
     const refreshToken = cookies.jwt;
  
     const foundUser = await User.findOne({ refreshToken }).exec();
     if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
     if (!foundUser) return res.sendStatus(403); //Forbidden 
     //console.log(req.body);
     const getProd = await Product.findOne({ productName : prodN });
     if (!getProd) return res.sendStatus(404);
      // evaluate jwt 
     jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
             if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 
                console.log(getProd);
                res.send(getProd);
         }
     );
  
 }
 

 const handleUpdateProdQuery = async (req, res) => {
    /*console.log(req.body);
    const prodN = req.body.productName;
    console.log(prodN);*/

    const cookies = req.cookies;
     if (!cookies?.jwt) return res.sendStatus(401);
     const refreshToken = cookies.jwt;
  
     const foundUser = await User.findOne({ refreshToken }).exec();

     if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
     if (!foundUser) return res.sendStatus(403); //Forbidden 
     //console.log(req.body);
      // evaluate jwt 
     jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
             if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 
                
                res.send(updateCommand(req));
         }
     );
  
 }


 // 

 const updateCommand = async (data) => {
    
    let key = data.body.key;
    let prodn= data.body.prodname;
    let id  = data.body.id;
    let category = data.body.category;
    let desc = data.body.desc;
    let stock = data.body.stock;
    let price = data.body.price;
    let status = data.body.status;
    

    let body=null;
if(data.url !== undefined){
    let url = data.body.url;
    body = JSON.stringify(
        {
            productId: id, 
            productName: prodn,
            category: category,
            hearts: 10,
            price: price,
            imageUrl: url,
            status: status,
            description: desc,
            stock: stock,
          },
        );
 }else{
    body = JSON.stringify(
        {
            productId: id,
            productName: prodn,
            category: category,
            hearts: 10,
            price: price,
            status: status,
            description: desc,
            stock: stock,
          },
    );
}
    console.log(typeof body + body+" "+key);

 const updateProd = await Product.updateOne( { productName: key },
      { 
        $set: JSON.parse(body) 
    });
        console.log(updateProd); 
        return updateProd;
        
        }


module.exports = { handleProdQuery, handleUploadProdQuery, handleEditProdQuery, handleGetProdQuery, handleUpdateProdQuery }