
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/carRoutes.js

const express = require('express');
const router = express.Router();

const {
  getAllCars,
  getCarById,
  createCar,
  getMyCars,
  deleteCar,
  deleteAllCars,
} = require('../controllers/carController');

const {
  uploadCarImages,
  getImagesByCarId,
  deleteImageById,
} = require('../controllers/carImageController');

const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const { upload } = require('../utils/cloudinary');

// ===================== PUBLIC ROUTES =====================

// 🟢 Get all cars (public, admin-enhanced with owner names)
router.get('/', getAllCars);

// 🟢 Get images for a specific car
router.get('/:carId/images', getImagesByCarId);

// ===================== AUTHENTICATED ROUTES =====================

// 🔒 Get current user's own cars
router.get('/my', protect, getMyCars);

// 🔒 Create a new car listing
router.post('/', protect, createCar);

// 🔒 Delete a specific car owned by the user
router.delete('/:id', protect, deleteCar);

// ===================== ADMIN ROUTES =====================

// 🔒 Delete ALL cars and their images (admin only)
router.delete('/admin/wipe', protect, isAdmin, deleteAllCars);

// ===================== IMAGE ROUTES =====================

// 🔒 Upload a single car image (used in quick upload forms)
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ url: req.file.path });
});

// 🔒 Upload multiple car images
router.post('/images/upload', protect, upload.array('images', 10), uploadCarImages);

// 🔒 Delete a car image by its ID
router.delete('/images/:id', protect, deleteImageById);

// ===================== MUST COME LAST =====================

// 🟢 Get a single car by ID (dynamic route must be last!)
router.get('/:id', getCarById);

module.exports = router;

