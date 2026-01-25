
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/controllers/carImageController.js
const CarImage = require("../models/CarImage");
const db = require("../utils/db");
const { cloudinary } = require("../utils/cloudinary");

exports.uploadCarImages = async (req, res) => {
  try {
    const carId = parseInt(req.params.carId, 10);
    if (Number.isNaN(carId)) {
      return res.status(400).json({ message: "Invalid carId" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploaded = [];

    for (const file of req.files) {
      // multer-storage-cloudinary gives:
      // file.path     => secure_url
      // file.filename => public_id
      const imageUrl = file.path;
      const publicId = file.filename;

      const saved = await CarImage.add(carId, imageUrl, publicId);
      uploaded.push(saved);
    }

    // ✅ Set cars.image_url automatically if empty (main image)
    // Use the FIRST uploaded image as main image.
    if (uploaded[0]?.image_url) {
      await db.query(
        `UPDATE cars
         SET image_url = COALESCE(NULLIF(image_url, ''), $1)
         WHERE id = $2`,
        [uploaded[0].image_url, carId]
      );
    }

    // ✅ Return a stable response (but still compatible)
    return res.status(201).json({
      message: "✅ Images uploaded",
      carId,
      images: uploaded, // [{id, car_id, image_url, public_id, created_at}]
    });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    return res.status(500).json({ message: "Upload failed" });
  }
};

exports.getImagesByCarId = async (req, res) => {
  try {
    const carId = parseInt(req.params.carId, 10);
    if (Number.isNaN(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const images = await CarImage.findByCarId(carId);
    return res.json(images);
  } catch (err) {
    console.error("getImagesByCarId error:", err);
    return res.status(500).json({ message: "Fetch failed" });
  }
};

exports.deleteImageById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    const image = await CarImage.findById(id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await CarImage.delete(id);
    return res.json({ message: "✅ Image deleted" });
  } catch (err) {
    console.error("deleteImageById error:", err);
    return res.status(500).json({ message: "Delete failed" });
  }
};
