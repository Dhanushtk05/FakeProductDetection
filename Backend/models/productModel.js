const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    productid : {
        type: Number,
        required: [true, "Please enter Product ID"],
        unique : true
    },
    brandname :{
        type:String,
        required:[true,"Enter the Brand name"]
    },
    memory :{
        type:Number,
        
    },
    storage :{
        type :Number
    },
    processor :{
        type:Number,
    },
    graphics :{
        type:Number
    },
    battery :{
        type:Number
    },
    verified:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref : 'User'
            },
            user:{
                type:String
            },
            role:{
                type:String
            }
        }
    ]
})


let schema = mongoose.model('products', bookSchema)

module.exports = schema
