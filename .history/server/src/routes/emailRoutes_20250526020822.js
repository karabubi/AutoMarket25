//Users/salehalkarabubi/works/project/AutoMarket25/server/src/routes/emailRoutes.js

// const express = require('express');
// const router = express.Router();
// const emailController = require('./controllers/emailController');

// // POST /api/email/purchase-request
// router.post('/purchase-request', emailController.purchaseRequest);

// module.exports = router;


const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// POST /api/email/purchase-request
router.post('/purchase-request', emailController.purchaseRequest);

module.exports = router; // ✅ This MUST be present
