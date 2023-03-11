const User = require("../modals/userModal");
const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");


// register a user 

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is smaple id",
            url: "profilePicUrl"
        }
    })

    sendToken(user, 201, res)
})


// login a user 

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if user has given password and email both 

    if (!email || !password) {
        return next(new ErrorHander("Please enter email and password", 400))
    }
    // password use select method because we have skip password on schima by select
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("invalid email and password", 401))
    }

    const isPasswordMatched = user.comaparePassword(password);

    // here we can right direct invlid pass but it is not good because he can use randlmy 
    if (!isPasswordMatched) {
        return next(new ErrorHander("invalid email and password", 401))
    }

    sendToken(user, 200, res)



})



// logOut User


exports.logout = catchAsyncError((req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})


// forget password 

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    // Get resetPassword token
    const restToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    //    make link for send rest password
    const restPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${restToken}`;

    const message = `Your password reset token is :-\n\n ${restPasswordUrl} \n\nif you have not requested this email then please ignore it`;
    try {

        await sendEmail({
            email: user.email,
            subject: `UniqueHolidays password recover`,
            message
        })
        res.status(200).json({
            success: true,
            message: `email send to ${user.email} sucessfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHander(error.message, 500))
    }
})
// reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // we haveallready set token hash value on userModal so user here  
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHander("Rest password token is invalid or has been expired", 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("password do't match", 404));

    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res)
})


// Get user details 
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})


// update userpasswod
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched = user.comaparePassword(req.body.oldPassword);

    // here we can right direct invlid pass but it is not good because he can use randlmy 
    if (!isPasswordMatched) {
        return next(new ErrorHander("old password incorrect", 400))
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander(" password does not match", 400))

    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res)
})


// update profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
    })

})

// Get all user (admin)
exports.allUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

// Get single user details (admin)
exports.singleUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`user dpesnot exit wiith id ${req.body.params}`)
        )
    }
    res.status(200).json({
        success: true,
        user
    })
})



// update user role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message:"user delete successfully"
    })

})



// delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`user do not exit ${req.params.id}`))
    }

    await user.remove();
    res.status(200).json({
        success: true,
    })

})


// create new review and update review 
