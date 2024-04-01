const express = require('express');
const router = express.Router();
const cloudinary = require("../service/cloudinary");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary.js");



router.post('/upload/test', upload.single('image'), function (req, res) {
    uploadMedia(req.files);
});
  
module.exports = router;