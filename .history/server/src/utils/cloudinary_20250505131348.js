//Users/salehalkarabubi/works/project/AutoMarket25/server/src/utils/cloudinary.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// ✅ Validate that env variables are set
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('❌ Missing Cloudinary configuration in .env file');
}

// ✅ Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Setup Cloudinary storage with folder + allowed formats
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'automarket25',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }], // ✅ optional: resize limit
  },
});

// ✅ Setup multer upload middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ max 5MB file size
});

// ✅ Export cloudinary instance and upload middleware
module.exports = { cloudinary, upload };
