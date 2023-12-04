const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email:{
        type : String,
        validate : [validator.isEmail,'Please Enter the Valid Email'],

    },
    password: {
        type: String,
        minlength: [6, 'Password cannot exceed 6 characters'],
        select: false
    },
    phonenumber:{
        type : String,
        minlength:[10,'Enter the Valid Phone Number'],
    },
    company : {
        type : String,
    },
    industry : {String},
    avatar: {
        type: String
    },
    role :{
        type: String,
        default: 'Consumer'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    joinedAt :{
        type: Date,
        default: Date.now
    },
    msg :{
        type: String,
    },

})

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password  = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function(){
    //Generate Token
    const token = crypto.randomBytes(20).toString('hex');

    //Generate Hash and set to resetPasswordToken
   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

   //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}
let model =  mongoose.model('User', userSchema);


module.exports = model;