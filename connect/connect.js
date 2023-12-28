const mongoose= require("mongoose");

const connectDb =async (uri)=>{
    // console.log("CONNECTED TO MONGODb")
    return await mongoose.connect(uri)
};

module.exports = connectDb;