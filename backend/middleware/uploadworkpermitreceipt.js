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
    folder: 'receipt_documents', // Change folder name as needed
    resource_type: 'auto',
    public_id: (req, file) => Date.now() + '-' + file.originalname
  }
});

const upload = multer({ storage });

const uploadworkpermitreceipt = upload.fields([
  { name: 'document1', maxCount: 1 }
]);

module.exports = uploadworkpermitreceipt;
