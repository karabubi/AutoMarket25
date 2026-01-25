///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/models/User.js
const db = require('../utils/db');
const bcrypt = require('bcryptjs');

const User = {
  async create({ name, email, password }) {
    const hashed = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashed]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
};

module.exports = User;
