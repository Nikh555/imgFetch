const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const {createCustomError} = require("../error/custom-api-error");
require('dotenv').config();

// const MONGO_URI = "mongodb+srv://tanish:1234@nodeprojects.tj3pmwf.mongodb.net/uploader?retryWrites=true&w=majority";
const MONGO_URI = process.env.MONGO_URI

const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // const validContentTypes = ["image/jpeg", "image/jpg"];
      // if (!validContentTypes.includes(file.mimetype)) {
      //   return reject(new Error("Invalid Media Type. Only jpg/jpeg files are allowed."));
      // }
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({
  storage,
});

module.exports = { upload };
