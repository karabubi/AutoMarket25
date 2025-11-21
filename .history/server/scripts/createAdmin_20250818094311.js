
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/scripts/createAdmin.js
const bcrypt = require('bcrypt');
const db = require('../utils/db');

(async () => {
  const email = 'admin@site.com';
  const plainPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log('✅ Admin already exists.');
    } else {
      await db.query(
        `INSERT INTO users (name, email, password, is_admin)
         VALUES ($1, $2, $3, $4)`,
        ['Admin', email, hashedPassword, true]
      );
      console.log('✅ Admin user created successfully.');
    }
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  } finally {
    db.end();
  }
})();