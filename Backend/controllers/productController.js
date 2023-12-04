const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/userModel');


exports.newProduct = catchAsyncError(async (req,res,next)=>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

exports.getProduct = catchAsyncError(async(req,res,mext)=>{
    const productid = req.params.id;
    const product = await Product.findOne({productid:productid});
    /*if(!product){
        return next(new ErrorHandler('Product not found'));
    }*/
    res.status(201).json({
        success : true,
        product
    })  
})

exports.createverify=catchAsyncError(async(req,res,next)=>{
    const {pid,uid,status} = req.body;
    const user = await User.findById(uid);
    const product = await Product.findById(pid)
    const isReviewed = product.verified.find(review => {
        return review.id.toString() == req.user.id.toString()
    })

    if (!isReviewed){
        product.verified.push({
            id : uid,
            user:user.name,
            role:user.role,
        });
    }
   
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true
    })
})

