//. update


// controllers/paymentController.js


// const db = require('../utils/db');

// exports.getAllPayments = async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT payments.*, cars.make, cars.model, cars.year, users.name AS user_name
//       FROM payments
//       INNER JOIN cars ON payments.car_id = cars.id
//       INNER JOIN users ON cars.user_id = users.id
//       ORDER BY payments.created_at DESC
//     `);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('getAllPayments error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments.' });
//   }
// };

// exports.deletePayment = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ message: 'Invalid payment ID' });

//     await db.query('DELETE FROM payments WHERE id = $1', [id]);
//     res.json({ message: 'Payment deleted successfully' });
//   } catch (err) {
//     console.error('deletePayment error:', err.message);
//     res.status(500).json({ message: 'Failed to delete payment.' });
//   }
// };

// exports.deleteAllPayments = async (req, res) => {
//   try {
//     await db.query('DELETE FROM payments');
//     res.status(200).json({ message: 'All payments deleted successfully.' });
//   } catch (err) {
//     console.error('deleteAllPayments error:', err.message);
//     res.status(500).json({ message: 'Failed to delete all payments.' });
//   }
// };

//----up

