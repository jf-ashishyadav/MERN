const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");



exports.isAuthenticationedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to access to resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();
 })


  exports.authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        
        // if (!roles.includes(req.user.role)) {
        //  return next( new ErrorHandler(
        //     `Role: ${req.user.role} is not allowd to access this resource`,
        //     403
        //     )
        //     );
        // }
        // next();

        if(roles.includes("user")){
            console.log("aaaaa",roles)
            return next( new ErrorHandler(
                    `Role: user is not allowd to access this resource`,
                    403
                    )
            );
        }
        else if(roles.includes("admin")){
            console.log("aaaaa",roles)

        next();

        }

    }


}