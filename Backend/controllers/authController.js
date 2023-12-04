const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')


exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password,role} = req.body
    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar,
        role
    });
    sendToken(user, 201, res)
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} =  req.body
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    const  user = await User.findOne({email:email}).select('+password');
    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})

exports.getSingleUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler('User not found', 400));
    }

    res.status(201).json({
        success: true,
        user
    })
});

exports.getSingleManufacturer = catchAsyncError(async(req, res, next) => {
    const user = await Manufacturer.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler('User not found', 400));
    }

    res.status(201).json({
        success: true,
        user
    })
});

exports.getManufacturer = catchAsyncError(async(req, res, next) => {
    const loginid = req.params.id
    const user = await Manufacturer.findOne({loginid});
    if(!user) {
        return next(new ErrorHandler('User not found', 400));
    }
    res.status(201).json({
        success: true,
        user
    })
});
exports.loginManufacturer = catchAsyncError(async (req, res, next) => {
    const {loginid, password} =  req.body
    
    if(!loginid || !password) {
        return next(new ErrorHandler('Please enter LoginID & password', 400))
    }

    //finding the user database
    const user = await Manufacturer.findOne({loginid}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})



exports.logoutUser = (req, res, next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })

}


//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
const user =  await User.findOne({email: req.body.email});

if(!user) {
    return next(new ErrorHandler('User not found with this email', 404))
}

const resetToken = user.getResetToken();
await user.save({validateBeforeSave: false})

//Create reset url
const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

const message = `Your password reset url is as follows \n\n 
${resetUrl} \n\n If you have not requested this email, then ignore it.`;

try{
    sendEmail({
        email: user.email,
        subject: "CSE Library Password Recovery",
        message
    })

    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`
    })

}catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false});
    return next(new ErrorHandler(error.message), 500)
}

})  

exports.resetPassword = catchAsyncError( async (req, res, next) => {
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 
 
     const user = await User.findOne( {
         resetPasswordToken,
         resetPasswordTokenExpire: {
             $gt : Date.now()
         }
     } )
 
     if(!user) {
         return next(new ErrorHandler('Password reset token is invalid or expired'));
     }
 
     if( req.body.password !== req.body.confirmPassword) {
         return next(new ErrorHandler('Password does not match'));
     }
 
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordTokenExpire = undefined;
     await user.save({validateBeforeSave: false})
     sendToken(user, 201, res)
 
 })

 exports.changePassword  = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    //assigning new password
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
    })
 })

 exports.sendSuggestion = catchAsyncError( async (req, res, next)=>{
    const {name,email,phonenumber,company,industry} = req.body;
    const password ='123456';
    const role = 'Manufacturer'
    console.log(name,email,phonenumber,company,industry);
    const user = await User.create({
        name,
        email,
        password,
        phonenumber,
        company,
        industry,
        role
    });
    console.log(user);
    const message = `Your LoginID : ${email}\nPassword : ${password}\nOnce you Login change your password.`
    const manf = await User.findOne({email:email});
    
    try{
        sendEmail({
            email:manf.email,
            subject:"Login Credentials",
            message
        })

        res.status(200).json({
            success:true,
            message :`Email sent`
        })
    }catch(error){
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

    //sendToken(user,201,res);

})  


