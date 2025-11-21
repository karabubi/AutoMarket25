//-------------update





// const db = require('../utils/db');

// // -------------------- Car Controllers --------------------

// const createCar = async (req, res) => {
//   try {
//     const { make, model, year, price } = req.body;
//     if (!make || !model || !year || !price) {
//       return res.status(400).json({ message: 'Missing required car fields' });
//     }
//     const result = await db.query(
//       'INSERT INTO cars (make, model, year, price) VALUES ($1, $2, $3, $4) RETURNING *',
//       [make, model, year, price]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create car', error: error.message });
//   }
// };

// const getCars = async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM cars');
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch cars', error: error.message });
//   }
// };

// const getCarById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch car', error: error.message });
//   }
// };

// const updateCar = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Car not found' });

//     const { make, model, year, price } = req.body;
//     const result = await db.query(
//       'UPDATE cars SET make = $1, model = $2, year = $3, price = $4 WHERE id = $5 RETURNING *',
//       [make || check.rows[0].make, model || check.rows[0].model, year || check.rows[0].year, price || check.rows[0].price, id]
//     );
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update car', error: error.message });
//   }
// };

// const deleteCar = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
//     await db.query('DELETE FROM cars WHERE id = $1', [id]);
//     res.status(200).json({ message: 'Car deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete car', error: error.message });
//   }
// };

// // -------------------- Payment Controllers --------------------

// const savePayment = async (req, res) => {
//   const carId = req.params.id;
//   const { paid_amount, not_paid_amount } = req.body;

//   if (!carId || paid_amount == null || not_paid_amount == null) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   try {
//     const carCheck = await db.query('SELECT * FROM cars WHERE id = $1', [carId]);
//     if (carCheck.rows.length === 0) {
//       return res.status(404).json({ message: 'Car not found' });
//     }

//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [carId, paid_amount, not_paid_amount]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// const getPayments = async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM payments');
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
//   }
// };

// const getPaymentById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'Payment not found' });
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch payment', error: error.message });
//   }
// };

// const updatePayment = async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;
//   try {
//     const check = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Payment not found' });

//     const result = await db.query(
//       'UPDATE payments SET paid_amount = $1, not_paid_amount = $2 WHERE id = $3 RETURNING *',
//       [paid_amount || check.rows[0].paid_amount, not_paid_amount || check.rows[0].not_paid_amount, id]
//     );
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update payment', error: error.message });
//   }
// };

// const deletePayment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Payment not found' });
//     await db.query('DELETE FROM payments WHERE id = $1', [id]);
//     res.status(200).json({ message: 'Payment deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete payment', error: error.message });
//   }
// };

// // -------------------- Export --------------------

// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
//   savePayment,
//   getPayments,
//   getPaymentById,
//   updatePayment,
//   deletePayment,
// };

//--------2


//Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/adminController.js exist 


// const db = require('../utils/db');

// // -------------------- Car Controllers --------------------

// const createCar = async (req, res) => {
//   try {
//     const { make, model, year, price } = req.body;
//     if (!make || !model || !year || !price) {
//       return res.status(400).json({ message: 'Missing required car fields' });
//     }
//     const result = await db.query(
//       'INSERT INTO cars (make, model, year, price) VALUES ($1, $2, $3, $4) RETURNING *',
//       [make, model, year, price]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create car', error: error.message });
//   }
// };

// const getCars = async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM cars');
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch cars', error: error.message });
//   }
// };

// const getCarById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch car', error: error.message });
//   }
// };

// const updateCar = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Car not found' });

//     const { make, model, year, price } = req.body;
//     const result = await db.query(
//       'UPDATE cars SET make = $1, model = $2, year = $3, price = $4 WHERE id = $5 RETURNING *',
//       [make || check.rows[0].make, model || check.rows[0].model, year || check.rows[0].year, price || check.rows[0].price, id]
//     );
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update car', error: error.message });
//   }
// };

// const deleteCar = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
//     await db.query('DELETE FROM cars WHERE id = $1', [id]);
//     res.status(200).json({ message: 'Car deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete car', error: error.message });
//   }
// };

// // -------------------- Payment Controllers --------------------

// const savePayment = async (req, res) => {
//   const carId = req.params.id;
//   const { paid_amount, not_paid_amount } = req.body;

//   if (!carId || paid_amount == null || not_paid_amount == null) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   try {
//     const carCheck = await db.query('SELECT * FROM cars WHERE id = $1', [carId]);
//     if (carCheck.rows.length === 0) {
//       return res.status(404).json({ message: 'Car not found' });
//     }

//     const result = await db.query(
//       'INSERT INTO payments (car_id, paid_amount, not_paid_amount) VALUES ($1, $2, $3) RETURNING *',
//       [carId, paid_amount, not_paid_amount]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// const getPayments = async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM payments');
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
//   }
// };

// const getPaymentById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'Payment not found' });
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch payment', error: error.message });
//   }
// };

// const updatePayment = async (req, res) => {
//   const { id } = req.params;
//   const { paid_amount, not_paid_amount } = req.body;
//   try {
//     const check = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Payment not found' });

//     const result = await db.query(
//       'UPDATE payments SET paid_amount = $1, not_paid_amount = $2 WHERE id = $3 RETURNING *',
//       [paid_amount || check.rows[0].paid_amount, not_paid_amount || check.rows[0].not_paid_amount, id]
//     );
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update payment', error: error.message });
//   }
// };

// const deletePayment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
//     if (check.rows.length === 0) return res.status(404).json({ message: 'Payment not found' });
//     await db.query('DELETE FROM payments WHERE id = $1', [id]);
//     res.status(200).json({ message: 'Payment deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete payment', error: error.message });
//   }
// };

// // -------------------- Export --------------------

// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
//   savePayment,
//   getPayments,
//   getPaymentById,
//   updatePayment,
//   deletePayment,
// };

//-------update 

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/controllers/adminController.js


// const db = require('../utils/db');

// // Get all cars
// exports.getAllCars = async (req, res) => {
//   const result = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
//   res.status(200).json(result.rows);
// };

// // Delete car
// exports.deleteCar = async (req, res) => {
//   const { id } = req.params;
//   await db.query('DELETE FROM cars WHERE id = $1', [id]);
//   res.status(200).json({ message: 'Car deleted successfully' });
// };

// // Edit car
// exports.updateCar = async (req, res) => {
//   const { id } = req.params;
//   const { title, price, description } = req.body;

//   await db.query(
//     'UPDATE cars SET title = $1, price = $2, description = $3 WHERE id = $4',
//     [title, price, description, id]
//   );

//   res.status(200).json({ message: 'Car updated successfully' });
// };

// // Admin report (dummy)
// exports.generateReport = async (req, res) => {
//   const result = await db.query('SELECT COUNT(*) as total_cars, AVG(price) as average_price FROM cars');
//   res.status(200).json(result.rows[0]);
// };


//   update 2


// const db = require('../utils/db');

// // ✅ Get all cars
// exports.getAllCars = async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching cars:', err.message);
//     res.status(500).json({ message: 'Failed to fetch cars' });
//   }
// };

// // ✅ Delete car
// exports.deleteCar = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await db.query('DELETE FROM cars WHERE id = $1', [id]);
//     res.status(200).json({ message: 'Car deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting car:', err.message);
//     res.status(500).json({ message: 'Failed to delete car' });
//   }
// };

// // ✅ Edit/Update car
// exports.updateCar = async (req, res) => {
//   const { id } = req.params;
//   const { title, price, description } = req.body;

//   try {
//     await db.query(
//       'UPDATE cars SET title = $1, price = $2, description = $3 WHERE id = $4',
//       [title, price, description, id]
//     );
//     res.status(200).json({ message: 'Car updated successfully' });
//   } catch (err) {
//     console.error('Error updating car:', err.message);
//     res.status(500).json({ message: 'Failed to update car' });
//   }
// };

// // ✅ Admin report (dummy)
// exports.generateReport = async (req, res) => {
//   try {
//     const result = await db.query('SELECT COUNT(*) as total_cars, AVG(price) as average_price FROM cars');
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.error('Error generating report:', err.message);
//     res.status(500).json({ message: 'Failed to generate report' });
//   }
// };

// // ✅ ✅ ✅ Add car (NEW)
// exports.addCar = async (req, res) => {
//   const { make, model, price, paid_amount } = req.body;

//   try {
//     await db.query(
//       'INSERT INTO cars (make, model, price, paid_amount) VALUES ($1, $2, $3, $4)',
//       [make, model, price, paid_amount]
//     );

//     res.status(201).json({ message: 'Car added successfully' });
//   } catch (err) {
//     console.error('Error inserting car:', err.message);
//     res.status(500).json({ message: 'Failed to add car' });
//   }
// };

