//1- express require
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());
// 2- export app 

// route import 
const  product  = require("./routes/productRoute");
const user =  require("./routes/userRoutes");
app.use("/api/v1/",product)
app.use("/api/v1/",user);



// middleware for error
app.use(errorMiddleware);

module.exports =app;