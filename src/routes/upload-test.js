const express = require('express');
const router = express.Router();
const cloudinary = require("../service/cloudinary");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary.js");
const { createPost } = require("../controller/post-controller.js");
const auth = require("../middleware/authentication.js");
const Post = require('../models/post');
const User = require('../models/user');

router.post('/upload/test', upload.single('image'), function (req, res) {
    console.log(req.file);
    uploadMedia(req.file);
});

router.post('/test', auth.authentication, upload.array('images'), async (req, res) => {
    createPost(req, res);
});


module.exports = router;