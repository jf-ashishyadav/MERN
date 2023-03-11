const mongoose = require("mongoose");
const validator = require("validator");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// crypto is builin moduleso not need to install
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "Name can't exceed 30 char.."],
        minLength: [4, "Name should have more then 4 char.."],
    },
    email: {
        type: String,
        required: [true, "please enter  email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minLength: [8, "password should have more then 8 char.."],
        // here select means when call usermodal for access data so password will not go 
        select: false

    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})
// when userSchema save soo before save a event , we here can't give arrow function because we need this keyword 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptJs.hash(this.password, 10)

})


// JWT token : we generate a token and store in cookies so server understand if user can eligble for login so 
//can login ,means login power provide

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE 
    })
}

// comapre passwod

userSchema.methods.comaparePassword = async function(enteredPassword){
    // we comapre password by bcrypt comapre method on databse because password bcrypted
    console.log(this.password)
    return await bcryptJs.compare(enteredPassword,this.password)

}


// 

// Generating Password Reset Token

userSchema.methods.getResetPasswordToken = function(){
// generate token
const resetToken = crypto.randomBytes(20).toString("hex");
// hashing and adding to userSchima
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
return resetToken;
}
module.exports = mongoose.model("User", userSchema)
