const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "can't exceed 3- cha..."],
        minLength: [4, "name should have more then 4 chr..."]

    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]

    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "pass should be more then 8char"],
        select: false,


    },
    avatar:
    {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }

    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,




})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


// jwt token

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}


// compare password

// comparePassword

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
module.exports = mongoose.model("User", userSchema)