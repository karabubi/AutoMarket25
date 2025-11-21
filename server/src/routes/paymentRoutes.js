
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPayments,
  deletePayment,
  deleteAllPayments
} = require('../controllers/paymentController');
const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// GET /api/payments/ - Fetch all payments (admin only)
router.get('/', protect, isAdmin, getAllPayments);

// DELETE /api/payments/:id - Delete a specific payment (admin only)
router.delete('/:id', protect, isAdmin, deletePayment);

// DELETE /api/payments/ - Delete all payments (admin only, original endpoint)
router.delete('/', protect, isAdmin, deleteAllPayments);

// DELETE /api/payments/admin/wipe - Delete all payments (admin only, new endpoint)
router.delete('/admin/wipe', protect, isAdmin, deleteAllPayments);

module.exports = router;

