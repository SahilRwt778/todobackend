const mongoose = require("mongoose")

const mongo_url = process.env.MONGO_URL;

const connectDB =async ()=>{

    await mongoose.connect(mongo_url);
    console.log('connected to mongodb');
}


module.exports= connectDB;