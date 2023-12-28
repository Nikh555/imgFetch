const notFound = (req,res)=>{
    res.status(404).json({msg:`No route exist- ${req.url}`})
}

module.exports = notFound;