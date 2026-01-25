///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// POST /api/email/purchase-request
router.post('/purchase-request', emailController.purchaseRequest);

module.exports = router; // ✅ This MUST be present
