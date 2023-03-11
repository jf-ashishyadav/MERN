const express = require("express");
const { getAllTourPackages, createPackage, updatePackage, deletePackage, getSinglePackage } = require("../controller/tourPackageController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();
// Making routes

router.route("/packages").get(getAllTourPackages);

router.route("/admin/package/new").post(isAuthenticatedUser,authorizeRoles('admin'),createPackage);


router.route("/admin/package/:id")
.put(isAuthenticatedUser,authorizeRoles('admin'),updatePackage)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deletePackage)

router.route("/admin/package/:id").get(getSinglePackage);


module.exports = router;
 