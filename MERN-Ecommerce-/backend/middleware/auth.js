const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModal"); 



exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
if(!token){
    return next(new ErrorHander("Please login to access to this resource",401))
}

const decodedData = jwt.verify(token,process.env.JWT_SECRET);
req.user = await User.findById(decodedData.id);
next();
})



//authorizeRoles 

exports.authorizeRoles = (...roles) =>{
     return (req,res,next)=>{
       
        if(!roles.includes(req.user.role)){
         return next(new ErrorHander(
            `Role ${req.user.role} is not allowed to access to this resource`,
            403 
            )
            );
        }

        next()

       
     };
     
}

