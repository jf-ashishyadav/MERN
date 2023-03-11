// class first letter captital and extend  means we are extend our class by node default errpr class 
class ErrorHander extends Error{
    // here constructor take message and error code 
    constructor(message,statusCode){
        // super is main node Error class constructor 
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
        // we are using default node error method captureStackTrace, for track exact error 
    }
}

module.exports = ErrorHander;