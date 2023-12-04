const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')



app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*");
    next();
})


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )


const auth = require('./routes/auth')
const product = require('./routes/product')



app.use('/api/v1/',auth);
app.use('/api/v1/',product);


app.use(errorMiddleware)

module.exports = app;
