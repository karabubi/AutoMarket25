
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// User routes
router.get('/profile', protect, getProfile);

module.exports = router;
