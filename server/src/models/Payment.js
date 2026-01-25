///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/models/Payment.js

const db = require('../utils/db');

const Payment = {
  async upsert(car_id, paid_amount, not_paid_amount) {
    const result = await db.query(
      `INSERT INTO payments (car_id, paid_amount, not_paid_amount)
       VALUES ($1, $2, $3)
       ON CONFLICT (car_id) DO UPDATE
       SET paid_amount = $2, not_paid_amount = $3
       RETURNING *`,
      [car_id, paid_amount, not_paid_amount]
    );
    return result.rows[0];
  },
};

module.exports = Payment;
