const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) =>  {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

// wrong MongoDb id Error

if(err.name === "CastError"){
    const message = `resource not found invalide ${err.path}`;
    err = new ErrorHandler(message,400);
}


    res.status(err.statusCode).json({
        success:false,
        message:err.message

        // err.stack : for find correct error
    })
}