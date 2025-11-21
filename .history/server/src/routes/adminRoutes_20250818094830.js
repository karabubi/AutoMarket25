//-------update 






// const express = require('express');
// const router = express.Router();

// const {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
//   savePayment,
//   getPayments,
//   getPaymentById,
//   updatePayment,
//   deletePayment
// } = require('../controllers/adminController');

// const { protect } = require('../middleware/authMiddleware');
// const { ensureAdmin } = require('../middleware/ensureAdmin'); // <- Wichtig: named export

// // ✅ Admin-only protection middleware
// router.use(protect);
// router.use(ensureAdmin);

// // ✅ CAR ROUTES
// router.post('/cars', createCar);
// router.get('/cars', getCars);
// router.get('/cars/:id', getCarById);
// router.put('/cars/:id', updateCar);
// router.delete('/cars/:id', deleteCar);

// // ✅ PAYMENT ROUTES
// router.post('/cars/:id/payments', savePayment);
// router.get('/payments', getPayments);
// router.get('/payments/:id', getPaymentById);
// router.put('/payments/:id', updatePayment);
// router.delete('/payments/:id', deletePayment);

// module.exports = router;


//---------2




//Users/salehalkarabubi/works/project/AutoMarket25/server/src/routes/adminRoutes.js exist 


// const express = require('express');
// const router = express.Router();

// const {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
//   savePayment,
//   getPayments,
//   getPaymentById,
//   updatePayment,
//   deletePayment
// } = require('../controllers/adminController');

// const { protect } = require('../middleware/authMiddleware');
// const { ensureAdmin } = require('../middleware/ensureAdmin'); // <- Wichtig: named export

// // ✅ Admin-only protection middleware
// router.use(protect);
// router.use(ensureAdmin);

// // ✅ CAR ROUTES
// router.post('/cars', createCar);
// router.get('/cars', getCars);
// router.get('/cars/:id', getCarById);
// router.put('/cars/:id', updateCar);
// router.delete('/cars/:id', deleteCar);

// // ✅ PAYMENT ROUTES
// router.post('/cars/:id/payments', savePayment);
// router.get('/payments', getPayments);
// router.get('/payments/:id', getPaymentById);
// router.put('/payments/:id', updatePayment);
// router.delete('/payments/:id', deletePayment);

// module.exports = router;



//------update 



// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');

// router.use(authenticate); // Must be logged in
// router.use(isAdmin);      // Must be admin

// router.get('/cars', adminController.getAllCars);
// router.delete('/cars/:id', adminController.deleteCar);
// router.put('/cars/:id', adminController.updateCar);
// router.get('/report', adminController.generateReport);

// module.exports = router;


//-------update 2

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/adminRoutes.js


// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');
// const db = require('../utils/db'); // ✅ Import db to use raw SQL

// // ✅ Middleware: protect all admin routes
// router.use(authenticate);
// router.use(isAdmin);

// // ✅ Admin CRUD routes
// router.get('/cars', adminController.getAllCars);
// router.delete('/cars/:id', adminController.deleteCar);
// router.put('/cars/:id', adminController.updateCar);
// router.get('/report', adminController.generateReport);

// // ✅ New route: Get payments for specific car
// router.get('/cars/:id/payments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query('SELECT * FROM payments WHERE car_id = $1', [id]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching payments:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments for this car' });
//   }
// });

// module.exports = router;


//---------------update 3

// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');
// const db = require('../utils/db'); // ✅ Import db for raw SQL

// // ✅ Middleware: protect all admin routes
// router.use(authenticate);
// router.use(isAdmin);

// // ✅ Admin CRUD routes
// router.get('/cars', adminController.getAllCars);
// router.delete('/cars/:id', adminController.deleteCar);
// router.put('/cars/:id', adminController.updateCar);
// router.get('/report', adminController.generateReport);

// // ✅ Route: Get payments for a specific car
// router.get('/cars/:id/payments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query('SELECT * FROM payments WHERE car_id = $1', [id]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching payments:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments for this car' });
//   }
// });

// // ✅ Route: Create a new payment record for a car
// router.post('/cars/:id/payments', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [id, paid_amount, not_paid_amount]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating payment:', err.message);
//     res.status(500).json({ message: 'Failed to create payment' });
//   }
// });

// module.exports = router;

// //-------update 4


// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');
// const db = require('../utils/db'); // ✅ Raw SQL DB Access

// // ✅ Middleware: protect all admin routes
// router.use(authenticate);
// router.use(isAdmin);

// // ✅ Admin CRUD routes
// router.get('/cars', adminController.getAllCars);
// router.delete('/cars/:id', adminController.deleteCar);
// router.put('/cars/:id', adminController.updateCar);
// router.get('/report', adminController.generateReport);

// // ✅ Route: Get payments for a specific car
// router.get('/cars/:id/payments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query('SELECT * FROM payments WHERE car_id = $1', [id]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching payments:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments for this car' });
//   }
// });

// // ✅ Route: Create a new payment record for a car
// router.post('/cars/:id/payments', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [id, paid_amount, not_paid_amount]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating payment:', err.message);
//     res.status(500).json({ message: 'Failed to create payment' });
//   }
// });

// // ✅ Route: Add a new car (merged here)
// router.post('/cars', async (req, res) => {
//   const { make, model, price, paid_amount } = req.body;

//   try {
//     await db.query(
//       'INSERT INTO cars (make, model, price, paid_amount) VALUES ($1, $2, $3, $4)',
//       [make, model, price, paid_amount]
//     );

//     res.status(201).json({ message: 'Car added successfully' });
//   } catch (err) {
//     console.error('Error inserting car:', err);
//     res.status(500).json({ message: 'Failed to add car' });
//   }
// });

// module.exports = router;


//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/adminRoutes.js

// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');
// const db = require('../utils/db');

// // ✅ Schutz
// router.use(authenticate);
// router.use(isAdmin);

// // ✅ Admin Funktionen
// router.get('/cars', adminController.getAllCars);
// router.delete('/cars/:id', adminController.deleteCar);
// router.put('/cars/:id', adminController.updateCar);
// router.post('/cars', adminController.addCar);
// router.get('/report', adminController.generateReport);

// // ✅ Payments API
// router.get('/cars/:id/payments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query('SELECT * FROM payments WHERE car_id = $1', [id]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching payments:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments for this car' });
//   }
// });

// router.post('/cars/:id/payments', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [id, paid_amount, not_paid_amount]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating payment:', err.message);
//     res.status(500).json({ message: 'Failed to create payment' });
//   }
// });

// module.exports = router;


//------update 5



// // server/src/routes/adminRoutes.js

// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');
// const db = require('../utils/db');

// // ✅ Adminschutz
// router.use(authenticate);
// router.use(isAdmin);

// // ✅ Car-Verwaltung
// router.get('/cars', adminController.getAllCars);
// router.post('/cars', adminController.addCar);
// router.put('/cars/:id', adminController.updateCar);
// router.delete('/cars/:id', adminController.deleteCar);

// // ✅ Report
// router.get('/report', adminController.generateReport);

// // ✅ Payments-Routen

// // 📥 Alle Zahlungen zu einem Auto
// router.get('/cars/:id/payments', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query(
//       'SELECT * FROM payments WHERE car_id = $1',
//       [id]
//     );
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching payments:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments for this car' });
//   }
// });

// // ➕ Neue Zahlung zu einem Auto
// router.post('/cars/:id/payments', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [id, paid_amount, not_paid_amount]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating payment:', err.message);
//     res.status(500).json({ message: 'Failed to create payment' });
//   }
// });

// // ✏️ Bestehende Zahlung aktualisieren
// router.put('/payments/:id', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'UPDATE payments SET paid_amount = $1, not_paid_amount = $2 WHERE id = $3 RETURNING *',
//       [paid_amount, not_paid_amount, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating payment:', err.message);
//     res.status(500).json({ message: 'Failed to update payment' });
//   }
// });

// module.exports = router;


//----update 6





// /server/src/routes/adminRoutes.js

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/routes/adminRoutes.js

// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const authenticate = require('../middleware/authenticate');
// const isAdmin = require('../middleware/isAdmin');
// const db = require('../utils/db');

// // Auth & Admin check
// router.use(authenticate);
// router.use(isAdmin);

// // Admin car routes
// router.get('/cars', adminController.getAllCars);
// router.delete('/cars/:id', adminController.deleteCar);
// router.put('/cars/:id', adminController.updateCar);
// router.post('/cars', adminController.addCar);
// router.get('/report', adminController.generateReport);

// // Get latest payment for a car
// router.get('/cars/:id/payments', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await db.query(
//       `SELECT * FROM payments WHERE car_id = $1 ORDER BY created_at DESC LIMIT 1`,
//       [id]
//     );
//     res.status(200).json(result.rows[0] || null);
//   } catch (err) {
//     console.error('Error fetching payments:', err.message);
//     res.status(500).json({ message: 'Failed to fetch payments for this car' });
//   }
// });

// // Create payment for a car
// router.post('/cars/:id/payments', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [id, paid_amount, not_paid_amount]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error creating payment:', err.message);
//     res.status(500).json({ message: 'Failed to create payment' });
//   }
// });

// // Update latest payment for a car (regardless of specific payment_id)
// router.put('/cars/:id/payments/latest', async (req, res) => {
//   const { id } = req.params; // car_id
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const latestPayment = await db.query(
//       'SELECT id FROM payments WHERE car_id = $1 ORDER BY created_at DESC LIMIT 1',
//       [id]
//     );

//     if (latestPayment.rows.length === 0) {
//       return res.status(404).json({ message: 'No payment found to update.' });
//     }

//     const paymentId = latestPayment.rows[0].id;

//     const result = await db.query(
//       'UPDATE payments SET paid_amount = $1, not_paid_amount = $2, created_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
//       [paid_amount, not_paid_amount, paymentId]
//     );

//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating payment:', err.message);
//     res.status(500).json({ message: 'Failed to update payment' });
//   }
// });

// // Deprecated: update by payment_id — for legacy only
// router.put('/payments/:id', async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;

//   try {
//     const result = await db.query(
//       'UPDATE payments SET paid_amount = $1, not_paid_amount = $2, created_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
//       [paid_amount, not_paid_amount, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error updating payment:', err.message);
//     res.status(500).json({ message: 'Failed to update payment' });
//   }
// });

// module.exports = router;


//---------update  7



// server/src/routes/adminRoutes.js

