const AppError = require("../utils/AppError")


const handleCastErrorDB=(err)=>{
  const message=`Invalid path ${err.path} : ${err.value}`
return new AppError(message,400)
}

const handleValidationError=(err)=>{
  // console.log(err)
  const errObj= Object.values(err.errors).map((el)=> el.message)
  console.log(errObj)
  const message=` invalid Data : ${errObj.join(', ')}`
  return new AppError(message,400)
}

const handleDuplicateErrorDB=(err)=>{
    
  
const message= `duplicate fields values : ${JSON.stringify(err.keyValue)} please enter other values.`
  return new AppError(message,400)
}

const handleTokenExpiredError=()=>{
  return new AppError("your token expires login agin",401)
}

const handleJsonWebTokenError=()=>{
  return new AppError("invalid Token please login again",401)
}

const sendDevError=(err, res)=>{

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
   

  });
}


module.exports =(err,req,res, next)=>{
    console.log(req.body)
    err.statusCode=err.statusCode ||500
    err.status= err.status || "Error";

    let error={...err} 

    error.name=err.name;
    error.stack=err.stack;
    error.message=err.message

    if(error.name==="CastError"){
        error=handleCastErrorDB(error)
    }
    if(error.name==="ValidationError")
    {
        error=handleValidationError(error)
    }
    if(err.code===11000){
        error=handleDuplicateErrorDB(error)
    }
    if(error.name=="JsonWebTokenError"){
         error=handleJsonWebTokenError()
    }

    if(error.name==="TokenExpiredError"){
        error= handleTokenExpiredError()
    }
    if(process.env.NODE_ENV==="development"){
    sendDevError(error,res)
  }
}