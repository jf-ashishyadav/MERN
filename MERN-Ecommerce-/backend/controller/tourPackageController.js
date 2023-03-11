const Package = require("../modals/packageModal"); 
const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/featuresApi");


// Add Package (Admin)
exports.createPackage = catchAsyncError(
    async(req,res,next) => {
       
        req.body.user = req.user.id;
    
        const package = await Package.create(req.body);
        console.log("aaaa",package)
        
        res.status(201).json({
            sucess:true,
            package
        })
        }
)

// Get All Packages 
exports.getAllTourPackages = catchAsyncError(
    async (req,res) =>{
        resultPerPage = 50; 
        let packageCount = await Package.countDocuments();

      const apiFeature = new  ApiFeatures(Package.find(),req.query).search().filter().pagination(resultPerPage)
        const packageData  = await apiFeature.query;  
       res.status(200).json({
           sucess:true,
           packageData ,
           packageCount 
       });
       }
)


// Get sinagle Package
exports.getSinglePackage = catchAsyncError(
    async (req,res,next) =>{
        // next only callback function
        let package = await Package.findById(req.params.id);
        if(!package){
            return next(new ErrorHander("Product not found",404));
        }
    
       res.status(200).json({
           sucess:true,
           package,
       });
       }
)

// update Package (admin)

exports.updatePackage = catchAsyncError(
    async(req,res,next) =>{
        let package = await Package.findById(req.params.id);
        if(!package){
            return next(new ErrorHander("Product not found",404));
        }
       package = await Package.findByIdAndUpdate(req.params.id,req.body,{
        new:true,runValidators:true,useFindAndModify:false
       })
       res.status(200).json({
        sucess:true,
        package  
    });
    }
)


// Delete Package (admin)

exports.deletePackage = catchAsyncError(
    async(req,res,next) =>{
        let package = await Package.findById(req.params.id);
        if(!package){
            return next(new ErrorHander("Product not found",404));
        }
            await package.remove();
            res.status(200).json({
                sucess:true,
                message:"Package delete sucessfully"
                  
            });
        }
)
