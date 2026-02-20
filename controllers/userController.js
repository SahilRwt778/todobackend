const User = require("../models/userSchema");
const catchAsync = require("../utils/catchAsync");
const jwt =require("jsonwebtoken")
    const signToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
}


exports.signup=catchAsync(async (req,res,next)=>{
     const {email} = req.body;

    const user = await User.findOne({email});

    if(user) {
        return next(new AppError("User Already Exist, .. please login", 400))
    }

    const newUser = await User.create({...req.body})

    res.status(201).json({
        status:"success",
        message :"User Register successfully."
    })
})


exports.login=catchAsync(async(req,res,next)=>{
    const {email , password} = req.body;

    if(!email || !password){
        return next(new AppError("Please provide the email and password",400))
    }

    const user = await User.findOne({email}).select("+password")
    const token = signToken(user._id);

    const pass = await user.checkPassword(password, user.password)

    if(!user || !pass){
        return next(new AppError("User not found", 401));
    }

    res.status(200).json({
        status:"success",
        data:{
            user,
            token
        }
    })
})