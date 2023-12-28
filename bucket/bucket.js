const mongoose = require('mongoose');

let bucket;

const bucketFunc =async ()=>{
    mongoose.connection.on("connected", () => {
      console.log(mongoose.connection.readyState===1)
      var client = mongoose.connections[0].client;
      var db = mongoose.connections[0].db;
      bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "newBucket",
      });
      return bucket
        console.log(bucket);
    });
}

module.exports = bucketFunc;