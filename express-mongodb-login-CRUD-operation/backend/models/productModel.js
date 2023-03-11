const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter Product Decription"]
    },
    price: {
        type: Number,
        required: [true, "Please enter Product Price"],
        maxLength: [8, "Price can't exceed 8 char...."]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }

        }
    ],
    catagory: {
        type: String,
        required: [true,"Please enter product catagoty"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product length"],
        maxLength:[4,"Stock can't excedd 4 char...."],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviewS:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('Product',productSchema);