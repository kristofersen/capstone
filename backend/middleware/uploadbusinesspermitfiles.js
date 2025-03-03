const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;



// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload_documents', // Change folder name as needed
    resource_type: 'auto',
    public_id: (req, file) => Date.now() + '-' + file.originalname
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
