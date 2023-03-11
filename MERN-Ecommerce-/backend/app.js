const express = require("express");
const errorMiddleware = require("./middleware/error")
const cookieParsar = require("cookie-parser");

const app = express();
app.use(express.json())
app.use(cookieParsar())

// import route 
const packagesRoutes = require("./routes/tourPackageRoute");
const userRoutes = require("./routes/userRoute");
app.use("/api/v1/",packagesRoutes) 
app.use("/api/v1/",userRoutes) 
app.use(errorMiddleware) 

// middleware for error

module.exports = app;