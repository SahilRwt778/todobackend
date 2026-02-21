require("dotenv").config({path:"./config.env", quiet:true})

const app = require("./app");
const connectDB = require("./config/db");
const port = process.env.PORT;

connectDB();

app.listen(port, (err)=>{
    if(err) throw err;
    console.log("running")
})