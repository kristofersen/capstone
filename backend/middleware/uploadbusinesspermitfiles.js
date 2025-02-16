const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../documents/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const uploadbusinesspermitfiles = upload.fields([
    { name: 'document1', maxCount: 1 },
    { name: 'document2', maxCount: 1 },
    { name: 'document3', maxCount: 1 },
    { name: 'document4', maxCount: 1 },
    { name: 'document5', maxCount: 1 },
    { name: 'document6', maxCount: 1 },
    { name: 'document7', maxCount: 1 },
    { name: 'document8', maxCount: 1 },
    { name: 'document9', maxCount: 1 },
    { name: 'document10', maxCount: 1 },
    { name: 'document11', maxCount: 1 },
    { name: 'document12', maxCount: 1 }
]);

module.exports = uploadbusinesspermitfiles;
