
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/controllers/paymentController.js
const db = require('../utils/db');

// 🔍 Get all payments with car and user info (admin only via route middleware)
exports.getAllPayments = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT payments.*, cars.make, cars.model, cars.year, users.name AS user_name
      FROM payments
      INNER JOIN cars ON payments.car_id = cars.id
      INNER JOIN users ON cars.user_id = users.id
      ORDER BY payments.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('getAllPayments error:', err.message);
    res.status(500).json({ message: 'Failed to fetch payments.' });
  }
};

// ❌ Delete single payment by ID (admin-only)
exports.deletePayment = async (req, res) => {
  try {
    const paymentId = parseInt(req.params.id);
    if (isNaN(paymentId)) {
      return res.status(400).json({ message: 'Invalid payment ID' });
    }

    // Admin check (in case route is not protected already)
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const result = await db.query('DELETE FROM payments WHERE id = $1 RETURNING id;', [paymentId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('deletePayment error:', err.message);
    res.status(500).json({ message: 'Failed to delete payment.' });
  }
};

// ❌ Delete ALL payments (admin-only)
exports.deleteAllPayments = async (req, res) => {
  try {
    // Admin check (in case route is not protected already)
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    await db.query('DELETE FROM payments');
    res.status(200).json({ message: 'All payments deleted successfully.' });
  } catch (err) {
    console.error('deleteAllPayments error:', err.message);
    res.status(500).json({ message: 'Failed to delete all payments.' });
  }
};

