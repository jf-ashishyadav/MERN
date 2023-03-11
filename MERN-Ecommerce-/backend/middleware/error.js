const ErrorHandler = require("../utils/errorHander");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

// cast error handling if id format wrong 

if(err.name === "CastError"){
    const message = `Resource not found or object id format wrong ${err.path}`;
    err = new ErrorHandler(message,400);
}


// mongoose dublicate key error
if(err.code === 11000){
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message,400);

}

// json webtoken error

if(err.name === "JsonWebTokenError"){
    const message = `Json  web token is invalid,try again`;
    err = new ErrorHandler(message,400);
}


// JWT exptre error

if(err.name === "TokenExpiredError"){
    const message = `Json  web token is Expired,try again`;
    err = new ErrorHandler(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        // error:err.stack,
        message:err.message,
    })
}