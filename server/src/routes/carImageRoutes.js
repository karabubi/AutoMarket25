
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/carImageRoutes.js
const express = require("express");
const router = express.Router();

const {
  uploadCarImages,
  getImagesByCarId,
  deleteImageById,
} = require("../controllers/carImageController");

const { upload } = require("../utils/cloudinary");

// POST /api/cars/:carId/images
router.post("/cars/:carId/images", upload.array("images", 10), uploadCarImages);

// GET /api/cars/:carId/images
router.get("/cars/:carId/images", getImagesByCarId);

// DELETE /api/car-images/:id
router.delete("/car-images/:id", deleteImageById);

module.exports = router;
