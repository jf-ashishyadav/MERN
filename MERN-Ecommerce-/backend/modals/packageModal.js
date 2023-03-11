const mongoose = require('mongoose');
const tourPackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Package Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter Package Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter Package Price"],
        maxLength: [8, "Price can'not exceid 8 char..."]
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    catagory: {
        type: String,
        required: [true,"Please enter product catagory"],
        
    },

    stock:{
        type:Number,
        required:[true,"Please enter product stoke"],
        maxLength:[4,"stoke can't 4 char.."],
        default:1
    },
    nomOfReviews: {
        type: Number,
       default:0,
        
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            Comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now 
    }


})
module.exports = mongoose.model("Package",tourPackageSchema);