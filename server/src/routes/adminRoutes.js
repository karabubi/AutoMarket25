
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const db = require('../utils/db');

// ✅ Middleware for authentication and admin check
router.use(authenticate);
router.use(isAdmin);

// 🚗 Car Management Routes
router.get('/cars', adminController.getAllCars);
router.post('/cars', adminController.addCar);
router.put('/cars/:id', adminController.updateCar);
router.delete('/cars/:id', adminController.deleteCar);

// 📊 Report Route
router.get('/report', adminController.generateReport);

// 💰 Payment Routes

// ✅ Get latest payment for a car
router.get('/cars/:id/payments', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM payments WHERE car_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [id]
    );
    res.status(200).json(result.rows[0] || null);
  } catch (err) {
    console.error('Error fetching payments:', err.message);
    res.status(500).json({ message: 'Failed to fetch payments for this car' });
  }
});

// ✅ Create payment for a car
router.post('/cars/:id/payments', async (req, res) => {
  const { id } = req.params;
  const { paid_amount, not_paid_amount } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO payments (car_id, paid_amount, not_paid_amount)
       VALUES ($1, $2, $3) RETURNING *`,
      [id, paid_amount, not_paid_amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating payment:', err.message);
    res.status(500).json({ message: 'Failed to create payment' });
  }
});

// ✅ Update latest payment for a car
router.put('/cars/:id/payments/latest', async (req, res) => {
  const { id } = req.params;
  const { paid_amount, not_paid_amount } = req.body;

  try {
    const latest = await db.query(
      `SELECT id FROM payments WHERE car_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [id]
    );

    if (latest.rows.length === 0) {
      return res.status(404).json({ message: 'No payment found to update.' });
    }

    const paymentId = latest.rows[0].id;

    const updated = await db.query(
      `UPDATE payments SET paid_amount = $1, not_paid_amount = $2, created_at = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [paid_amount, not_paid_amount, paymentId]
    );

    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error('Error updating payment:', err.message);
    res.status(500).json({ message: 'Failed to update payment' });
  }
});

// ⚠️ Legacy: Update payment by ID (used by older components)
router.put('/payments/:id', async (req, res) => {
  const { id } = req.params;
  const { paid_amount, not_paid_amount } = req.body;

  try {
    const result = await db.query(
      `UPDATE payments SET paid_amount = $1, not_paid_amount = $2, created_at = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [paid_amount, not_paid_amount, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating payment by ID:', err.message);
    res.status(500).json({ message: 'Failed to update payment by ID' });
  }
});

// ✅ NEW: List all payments (used by PaymentReport.jsx)
router.get('/payments', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM payments ORDER BY created_at DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching all payments:', err.message);
    res.status(500).json({ message: 'Failed to fetch all payments' });
  }
});

module.exports = router;
