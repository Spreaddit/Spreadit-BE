const multer = require("multer");
const path = require("path");
const config = require("./../configuration");

const maxFileSize = 50 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: config.uploadPath,
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf|docx|doc|ppt|mp4|mpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Unsupported file type");
  }
}

module.exports = upload;
