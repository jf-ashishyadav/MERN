const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");


// unhandle promise rejection
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("sutting down the server due to uncaughtException");
    process.exit(1)
})



// For config
dotenv.config({path:"backend/config/config.env"})

// connect databse

connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})




process.on("unhandledRejection",err=>{   
    console.log(`Error: ${err.message}`);
    console.log('sutting down the server due to unhandledRejection')
    
    server.close(()=>{
        process.exit(1);
    })

})
