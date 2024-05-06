require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

cloudinary.config({
  cloud_name: "dkkhtb4za",
  api_key: "534263241354588",
  api_secret: "03sW6EPEh8H-Rh_dhsyuNIGLrps",
});

const uploadMedia = function (file, fileType) {
  return new Promise((resolve, reject) => {
    const resourceType = fileType === "image" ? "image" : "video";
    cloudinary.uploader.upload(
      file.path,
      {
        folder: "uploads",
        public_id: file.filename,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error("An error occurred:", error);
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
  const url = cloudinary.url(fileKey);
  return url;
};

module.exports = {
  uploadMedia,
  downloadMedia,
};
