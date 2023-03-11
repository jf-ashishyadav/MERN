const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSignleProduct } = require("../controllers/productController");
const { isAuthenticationedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// isAuthenticationedUser,
router.route("/products").get(isAuthenticationedUser, getAllProducts)
router.route("/products/new").post(isAuthenticationedUser,authorizeRoles("admin"),createProduct)
router.route("/products/:id").put(isAuthenticationedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticationedUser,authorizeRoles("admin"),deleteProduct).get(getSignleProduct)
module.exports = router;

