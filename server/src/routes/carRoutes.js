
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/carRoutes.js

const express = require("express");
const router = express.Router();

const {
  getAllCars,
  getCarById,
  createCar,
  getMyCars,
  deleteCar,
  deleteAllCars,
} = require("../controllers/carController");

const {
  uploadCarImages,
  getImagesByCarId,
  deleteImageById,
} = require("../controllers/carImageController");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const { upload } = require("../utils/cloudinary");

// ✅ Helper: wrap multer so errors return JSON and DON'T crash nodemon
const multerWrap = (mw) => (req, res, next) => {
  mw(req, res, (err) => {
    if (!err) return next();
    return res.status(400).json({ message: err.message || "Upload error" });
  });
};

/* ===================== PUBLIC ===================== */
router.get("/", getAllCars);

/* ===================== AUTH ===================== */
router.get("/my", protect, getMyCars);
router.post("/", protect, createCar);
router.delete("/:id", protect, deleteCar);

/* ===================== ADMIN ===================== */
router.delete("/admin/wipe", protect, isAdmin, deleteAllCars);

/* ===================== IMAGES ===================== */
// Single quick upload (optional)
router.post(
  "/upload",
  protect,
  multerWrap(upload.single("image")),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.status(200).json({ url: req.file.path });
  }
);

// Get images for car
router.get("/:carId/images", getImagesByCarId);

// Upload multiple images for car
router.post(
  "/:carId/images/upload",
  protect,
  multerWrap(upload.array("images", 10)),
  uploadCarImages
);

// Delete image by image id
router.delete("/images/:id", protect, deleteImageById);

/* ===================== MUST BE LAST ===================== */
router.get("/:id", getCarById);

module.exports = router;
