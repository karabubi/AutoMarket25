
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Auth routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
