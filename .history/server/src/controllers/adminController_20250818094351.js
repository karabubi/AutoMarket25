
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/controllers/adminController.js
const db = require('../utils/db');

// ✅ Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cars ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching cars:', err.message);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
};

// ✅ Delete car
exports.deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM cars WHERE id = $1', [id]);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error('Error deleting car:', err.message);
    res.status(500).json({ message: 'Failed to delete car' });
  }
};

// ✅ Edit/Update car
exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { title, price, description } = req.body;

  try {
    await db.query(
      'UPDATE cars SET title = $1, price = $2, description = $3 WHERE id = $4',
      [title, price, description, id]
    );
    res.status(200).json({ message: 'Car updated successfully' });
  } catch (err) {
    console.error('Error updating car:', err.message);
    res.status(500).json({ message: 'Failed to update car' });
  }
};

// ✅ Add a new car
exports.addCar = async (req, res) => {
  const { make, model, price, paid_amount } = req.body;

  try {
    await db.query(
      'INSERT INTO cars (make, model, price, paid_amount) VALUES ($1, $2, $3, $4)',
      [make, model, price, paid_amount]
    );

    res.status(201).json({ message: 'Car added successfully' });
  } catch (err) {
    console.error('Error inserting car:', err.message);
    res.status(500).json({ message: 'Failed to add car' });
  }
};

// ✅ Admin Report (JOIN cars + payments)
exports.generateReport = async (req, res) => {
  try {
    const reportResult = await db.query(`
      SELECT 
        c.id,
        c.make,
        c.model,
        c.price,
        COALESCE(SUM(p.paid_amount), 0) AS paid_amount,
        COALESCE(SUM(p.not_paid_amount), 0) AS not_paid_amount
      FROM cars c
      LEFT JOIN payments p ON c.id = p.car_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

    const totalsResult = await db.query(`
      SELECT 
        COALESCE(SUM(c.price), 0)::numeric(12,2) AS "totalPrice",
        COALESCE(SUM(p.paid_amount), 0)::numeric(12,2) AS "totalPaid",
        COALESCE(SUM(p.not_paid_amount), 0)::numeric(12,2) AS "totalNotPaid"
      FROM cars c
      LEFT JOIN payments p ON c.id = p.car_id
    `);

    res.status(200).json({
      report: reportResult.rows,
      totals: totalsResult.rows[0],
    });
  } catch (err) {
    console.error('Error generating report:', err.message);
    res.status(500).json({ message: 'Failed to generate report' });
  }
};
