const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


// Create Product -admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    console.log(req.user)
    req.body.user = req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        sucess: true,
        product
    })
});


// get all  Product

exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    // for paging
  const resultPerPage = 5;

  const productCount = await Product.countDocuments();
    // end paging

   const apiFeature = new ApiFeatures(Product.find(),req.query)
   .search()
   .filter()
   .pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(201).json({
        sucess: true,
        products,
        productCount
    })
}
)
// get single or product details

exports.getSignleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {

        // after error handling
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(200).json({
        sucess: true,
        product

    })
})




// updateProduct - admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if (!product) {
        // return res.status(500).json({
        //     sucess: false,
        //     message: "Product not found"
        // })
        return next(new ErrorHandler("product not found", 404))

    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,

    })

    res.status(200).json({
        sucess: true,
        product
    })

})


// Delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("product not found", 404))

        // return res.status(500).json({
        //     sucess: false,
        //     message: "Product not found"
        // })
    }

    await product.remove();
    res.status(200).json({
        sucess: true,
        message: "Product delete sucessfully"

    })
})

