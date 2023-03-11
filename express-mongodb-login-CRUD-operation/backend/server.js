// 3- import app js on app.js exported
const app = require("./app");


// 4- make server 
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling uncaught Exeption

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to unhandled uncaught Exeption`);
    process.exit(1);
    
})

// config

dotenv.config({path:"backend/config/config.env"})

// connect databse
connectDatabase();


const server= app.listen(process.env.PORT, () => {
console.log(`serve is working on http://localhost:${process.env.PORT}`)
});

// 5- make a config folder and file 
// download nodemon from npm for dev anf forprod use nodemon

 

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandled Promise Rejection`);
server.close(()=>{
    process.exit(1);
})
})
