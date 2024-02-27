const multer = require("multer");

// Set up Multer storage options
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "/"); // Specify the destination directory where uploaded files will be stored
  },
});

// Create Multer middleware instance for single file upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Specify file size limit (5 MB in this example)
  },
}).single("image"); // Specify the name of the form field for the file upload

module.exports = upload;
