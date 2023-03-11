# MERN-Ecommerce-
ECOMMERCE WEBSITE REACT, REDUX, EXPRESS, NODE, MONGODB

Run:npm start dev
# # # # # # # # # # # # # # # #
## step 1 Basic setup
# # # # # # # # # # # # # # # #

=> npm inint ( provide details like project name ,entry point : backend/server.js)
=> install needed packages  (npm i express mongoose dotenv)

# server.js
=> use app.js 
=> make a server by using app.listen
        <!-- app.listen(process.env.PORT,()=>{
            console.log(`server is working on http://localhost:${process.env.PORT}`)
        }) -->

 => require dotenv for using config.env     
 => set path of config.env file
 
        <!-- dotenv.config({path:"backend/config/config.env"}) -->
 => call connectdata base function on database file but make sure it will call after set config  

 ## unhandle promise rejection


=> go congigfile and missmatch DB_URL so show a error its called unhandle promise rejection , for this type error server not down but show error so we can down server for this type error 

=>  process gives unhandledRejection  so we handle for show error and shut down server and end this process and consle a message

<!-- process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log('sutting down the server due to unhandledRejection')
    server.close(()=>{
        process.exit(1);
    })
}) -->   




## // unhandle uncaught error 

=> if print console.log(ashish) so error show ashish is not define so this type error   uncaught error so we handle this type error on top of the page because if we handle middle of so we can console on top so how to handle 

  

# app.js 
=> use express()  
=> make routesfiles saprate
        <!-- const Packages = require("./routes/tourPackageRoute");
         app.use("/api/v1/",Packages) 
          -->
=>    for json use 
        <!-- app.use(express.json()) -->
=> use middleware for status error 
   <!-- const errorMiddleware = require("./middleware/error") -->

# make a folder config => config.env

=>set PORT=4000

# downnload nodeMon
 => npm i nodemon(for run project on saving )

# add some script on package.json

"start":"node backend/server.js",
"dev":"nodemon backend/server.js" // Use nodemon for development and for prod use NOde
now you can use for server run only npm run dev and it working with nodemon bcause wea re adding this command on package.json

# making routes and controller

=> make a folder routes
=> make a file for tourPackageRoute.js
=> require express
=> geting Router by express.Router();
=> export router
=> set route and get allPackages function form controller (#99)
     <!-- router.route("/packages").get(getAllTourPackages); -->
=>     


# making  controller
=> make a folder controllers=
=> make a file for tourPackageController
=> make a all apis get ,post,update,delete

=> use file featureApi.js

=> call ApiFeature() and pass query and queryStr 
        <!-- const apiFeature = new  ApiFeatures(Package.find(),req.query);  -->


# Postman
=> check on post man route is working 


# connect databse

=> make a folder and file for database.js
=>require mongoose 
=> connect mongoose with local host 

                mongoose.connect("mongoose://localhost:27017/uniqueHolidays",
                {useNewUrlParser:true,useUnifiedTypology:true,useCreateIndex:true}).then((data)=>{
                console.log(`mongodb connected with server: ${data.connection.host}`);
                }).catch((err)=>{
                console.log(err)
                })
=>  // if we handle unhandledRejection error so not need to catch block
    
=> remove static path manage it by config env  
=> make a fucntion for connect databse and put all cose cose inside
=> then export function 
=> import this fucntion on server.js     




# # # # # # # # # # # # # # # #
## step 2 Making APi 
# # # # # # # # # # # # # # # #

# Make a folder for modals 

=> make product modal with schima
=> add on controller tourPackageCOntroller 
=> create Packages api write and export on a function 
=> use this function on route file 
=> manage all Api async function with catchAsyncError handler 

# # # # # # # # # # # # # # # #
## step 3 Error handling
# # # # # # # # # # # # # # # #


# status error handling  error.js

As per code on get post update we are checkking if package not found so manage it by if else but a lot of api a lot of if else so we make a error handling error class for global use 

1- make a errorhandler file and manage error 
2- we can't use direct so we make a folder middleware => error.js
3- and here import errorHander class 
4- export error.js
5- and import and use on app.js
6- now api post ,update and delete apis use 
7- cast error handling
<!-- if(err.name === "CastError"){
    const message = `Resource not found or object id format wrong ${err.path}`;
    err = new ErrorHandler(message,400);
} -->

# Async errorHandleer

=> make a js file (catchAsyncError.js) async error handler
=> check with promise resolved if fialed managed catch 

# unhandle promise rejection

use on server.js
# // unhandle uncaught error 
use on server,js

## // cast error (mongoDb error)

=> if we get a single produt api hit and change api id so error not found product but if we change 
  id format like gives some dight so showing cast error so for handle this type error on 
  error.js



# # # # # # # # # # # # # # # #
## step 4 Features adding like serach ,filter padination
# # # # # # # # # # # # # # # #


# featureApi.js (for features)
=> make a class ApiFeatures and pass query and queryStr on constructor
=> export it and use on packageController.js

=> now make a function for search feature 
<!-- search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                // $regex mongoDb operator
                $regex: this.queryStr.keyword,
                $options: "i" //small i means case insenstive

            }
        } : {};
        this.query = this.query.find({ ...keyword }); //   find query on main query
        return this;
} -->

=> for filter by catagory 
=> filter by price and rateing


 filter() {
        // for catagory
        

        // we need to some change on queryStr so we make a copy for queryStr
        //  we can assign this type because this.queryStr is a object and in javascript object direct assign only reference so whrn 
        // we change one both changes  so we usinf spread operator
        // Not use this type 
        // const copyQueryStr = this.queryStr 
<!-- const copyQueryStr = { ...this.queryStr }; -->

        // removing some fields for catagory 
<!-- const removeFields = ["keyword", "page", "limit"];
removeFields.forEach(ele => delete copyQueryStr[ele]); -->


        // filter for price and rating 
        let queryStr = JSON.stringify(copyQueryStr) //copyQueryStr a object so first makeit string 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)



        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }


=> for pagination 

 <!-- pagination(resultPerPage){
        // because queryStr a string but we need number so convert it number 
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage*(currentPage-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
    } -->



# # # # # # # # # # # # # # # #
## step 5 user & password backend authentication 
# # # # # # # # # # # # # # # #

=>  for backend authentication need some npm packages so install it first 
=> npm i bcryptjs  (for password incrription because can't read password )
=> npm i jsonwebtoken (for token generate)
=> npm i validator (for email validation because email field shpuld come email)
=> npm i nodemailer (if forget password so send a mail for otp )
=> npm i cookie-parser (we generate jsonwentoken and store in cookies because cookies not acceable on fronted )
=> npm i body-parser 
<!-- riagister user -->
=>  userModal.js (for userModal schima)
=> userControler.js
=> make a file userRoutes.js

=> we incryptpassword before saving entry in database

=> but we put it on condition because when we update user profile so we using two way 1- update all information like name, email,avator, 2- for update password so if we alwaysincript password so updating name etc password again hash but it not needed because when we change password then needed hash
<!-- userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptJs.hash(this.password, 10)

}) -->


=> if user register so login also instancly 
=> JWT token : we generate a token and store in cookies so server understand if user can eligble for login so 
can login ,means login power provide


<!-- userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
} -->

=> JWT_SECRET,JWT_EXPIRE manage on config file


<!-- login user -->

exports.loginUser = catchAsyncError(async(req,res,next)=>{
const {email,password} = req.body;
// checking if user has given password and email both 

if(!email || !password){
    return next(new  ErrorHander("Please enter email and password",400))
}
// password use select method because we have skip password on schima by select
const user = await User.findOne({email:email}).select("+password");

if(!user){ 
    return next(new ErrorHander("invalid email and password",401))
} 

const isPasswordMatched =  user.comaparePassword(password);

// here we can right direct invlid pass but it is not good because he can use randlmy 
if(!isPasswordMatched){
    return next(new ErrorHander("invalid email and password",401))
}

sendToken(user,200,res) 

})



# # # # # # # # # # # # # # # #
## step 6 Manage route as per admin and user auth
# # # # # # # # # # # # # # # #




<!-- exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
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
     
} -->


=> // Generating Password Reset Token

const crypto = require("crypto");


// Generating Password Reset Token

<!-- userSchema.methods.getResetPasswordToken = function(){
// generate token
const resetToken = crypto.randomBytes(20).toString("hex");
// hashing and adding to userSchima
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
return resetToken;
}
module.exports = mongoose.model("User", userSchema) -->

=> now we made node mailer for send token

=> node.mail.js

=> in userController prepare mail link and mailpassword


<!-- Make user routes -->
=======Get user details=========
<!-- if user login so req.user save all user details so for user details always find it 
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
   res.status(200).json({
    success:true,
    user
   })
}) -->

=> then make its route


<!-- Make change passwod routes -->===============================================
<!-- exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched =  user.comaparePassword(req.body.oldPassword);

// here we can right direct invlid pass but it is not good because he can use randlmy 
if(!isPasswordMatched){
    return next(new ErrorHander("old password incorrect",400))
} 
if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHander(" password does not match",400))

}
user.password = req.body.newPassword;
await user.save();

   sendToken(user,200,res) -->

=> then make its route


<!-- update profile -->===============================================

<!-- exports.updateProfile = catchAsyncError(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,


    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
       })

}) -->

<!-- all user -->===============================================


time:3:47 done Backend 
4:43 frontened start
