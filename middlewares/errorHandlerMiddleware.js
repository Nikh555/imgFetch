const {customApiError} = require("../error/custom-api-error");

const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err instanceof customApiError)
    if(err instanceof customApiError){
        console.log('error run')
        return res.status(err.statusCode).json({msg:err.message})
    }
    // console.log(err);
    return res.status(500).json({msg:"Something went wrong. Try again later."})
}

module.exports = errorHandlerMiddleware;