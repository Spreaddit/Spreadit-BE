require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const fs = require("fs");


const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});


const uploadMedia = function (file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        {
          folder: "uploads", // Optional folder in Cloudinary where the file will be uploaded
          public_id: file.filename, // Optional public ID for the file
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  };
  
  const downloadMedia = function (fileKey) {
    // Construct the URL for downloading the media file from Cloudinary
    const url = cloudinary.url(fileKey);
    return url;
  };
  
  module.exports = {
    uploadMedia,
    downloadMedia,
  };