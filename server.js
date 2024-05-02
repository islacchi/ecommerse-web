require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const bodyParser = require('body-parser');

// initialize object 
const PORT = process.env.PORT || 3500;

//connect mongodb
connectDB();

// custom middleware logger
app.use(logger);
//middleware for form-data *content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
//middleware for json data
app.use(bodyParser.json());
//serve static files 
app.use(express.static(path.join(__dirname, './public')));

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//middleware for cookies
app.use(cookieParser());



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// routes

//app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/forgotpass', require('./routes/forgottenPass'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/products', require('./routes/prod'));

app.use('/', require('./routes/admin'));

//app.use(verifyJWT);
app.use('/products', require('./routes/prod'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.ejs'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`));
});
