
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("❌ Missing Cloudinary configuration in .env file");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "automarket25",
    resource_type: "image",
    // Accept modern formats too
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif", "heic", "heif"],
    // Convert to a stable format for your app (prevents "avif not allowed" issues)
    format: "jpg",
    transformation: [{ width: 1600, height: 1200, crop: "limit" }],
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

module.exports = { cloudinary, upload };
