const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require('dotenv').config();

// Middleware
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

// route
const uploadRoute = require("./routes/upload");

// connection
const connectDb = require("./connect/connect");

// connection 
// const MONGO_URI = "mongodb+srv://tanish:1234@nodeprojects.tj3pmwf.mongodb.net/uploader?retryWrites=true&w=majority";
const MONGO_URI= process.env.MONGO_URI

try {
  connectDb(MONGO_URI);
} catch (error) {
  handleError(error);
}

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

// App
const app = express();

app.use(cors());
// app.use(express.static("/home/prince/Code/uploadOnMongo/static"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/v1/upload", uploadRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 5050;
app.listen(PORT, async () => {
  console.log(`Application live on localhost:5050`);
});