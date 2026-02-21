const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL;

const connectDB =async ()=>{
    console.log(mongo_url);
    try{
    await mongoose.connect(mongo_url);
    }
    catch(err){
        throw err
    }
}


module.exports= connectDB;