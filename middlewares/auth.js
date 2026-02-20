const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userSchema");
const util = require("node:util")

module.exports = catchAsync(async(req, res, next) => {
    
    let token="";

    if(req.headers.authorization  && req.headers.authorization.startsWith("Bearer") ){
        
        token = req.headers.authorization.split(" ")[1];

    }

    if(!token){
        return next(new AppError("you are not logged in, please login to get access.",401))
    }
    // console.log(process.env.JWT_SECRET_KEY)
    const decode = await util.promisify(jwt.verify)(token , process.env.JWT_SECRET_KEY)
    
    const currentUser = await User.findById(decode.id);

    if(!currentUser){
        return next(new AppError('The user belong to this token no longer exists',401))
    }

    req.user = currentUser;

    next();
  
});