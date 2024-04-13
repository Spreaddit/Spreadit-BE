require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const fs = require("fs");


const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
  cloud_name: "dkkhtb4za",
  api_key: "534263241354588",
  api_secret: "03sW6EPEh8H-Rh_dhsyuNIGLrps"
});


const uploadMedia = function (file, fileType) {
  return new Promise((resolve, reject) => {
    const resourceType = fileType === "image" ? "image" : "video"; // Determine resource type based on fileType
    cloudinary.uploader.upload(
      file.path,
      {
        folder: "uploads", // Optional folder in Cloudinary where the file will be uploaded
        public_id: file.filename, // Optional public ID for the file
        resource_type: resourceType // Specify the resource type (image or video)
      },
      (error, result) => {
        if (error) {
          console.error('An error occurred:', error);
          reject(error);
        } else {
          console.log(result);
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