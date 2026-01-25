///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// User routes
router.get('/profile', protect, getProfile);

module.exports = router;
