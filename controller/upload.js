const mongoose = require("mongoose");
const { createCustomError } = require("../error/custom-api-error");

// creating bucket
let bucket;
const bucketFunc = async () => {
  mongoose.connection.on("connected", () => {
    console.log(mongoose.connection.readyState === 1);
    var client = mongoose.connections[0].client;
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "newBucket",
    });
    // console.log(bucket);
  });
};
bucketFunc();

const uploadOnMongo = async (req, res, next) => {
  if (req.file.contentType === "image/jpeg" || req.file.contentType === "image/jpg" || req.file.contentType === "application/pdf") {
    console.log(req.file)
    res.status(201).send("Uploaded  successfully.");
  }else{
    await bucket.delete(req.file.id);
    next(createCustomError("Invalid media type. Only jpeg/jpg files allowed",415))
  }
};

//  Download files

const allFiles = async (req, res,next) => {
  // console.log(bucket)
    const fileNew = await bucket.find();
    const fileArray = await fileNew.toArray();
    if (fileArray.length === 0) {
      next(createCustomError("Please upload file first."),404)
    }
      console.log("fileArray");
    const fileInfo = fileArray.map((item) => {
      return {
        filename: item.filename,
        contentType: item.contentType,
        uploadDate: item.uploadDate
      };
    });
    console.log("done")
    res.status(200).send(fileInfo);
};

const imgDownload = async (req, res,next) => {
  try {
    const encodedFileInfo = req.query.fileInfo;
    const fileInfo = JSON.parse(decodeURIComponent(encodedFileInfo));
    console.log(fileInfo)
    
    if (fileInfo.contentType === "image/jpeg" || fileInfo.contentType === "image/jpg" || fileInfo.contentType === "application/pdf") {
      if (fileInfo.contentType === "application/pdf") {
        res.setHeader("Content-Disposition", `attachment; filename=${fileInfo.filename}`);
      }else{
        res.setHeader("Content-Type", fileInfo.contentType);
      }
      
      bucket.openDownloadStreamByName(fileInfo.filename).pipe(res).on('end', () => {
        console.log('Stream end');
      })
    } else {
      res.status(415).json({ msg: "Unsupported Media Type" });
    }
  } catch (error) {
    next(createCustomError("Unable to fetch file."),404)
    }
};

module.exports = { uploadOnMongo, allFiles, imgDownload };