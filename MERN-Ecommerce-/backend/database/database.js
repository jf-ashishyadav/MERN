const mongoose = require("mongoose");

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URL,
        {useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`mongodb connected with server: ${process.env.DB_URL}`);
        })
        // if we handle unhandledRejection error so not need to catch block

        // .catch((err)=>{
        //     console.log("aaa",err)
        // })
        
}

module.exports = connectDatabase; 
