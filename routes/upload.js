const express = require("express");
const router = express.Router();

const {upload}= require("../bucket/storage")
const {uploadOnMongo,allFiles , imgDownload} = require("../controller/upload");

router.route("/").post(upload.single('file'),uploadOnMongo).get(allFiles);
router.route("/singleImg").get(imgDownload)

module.exports = router;