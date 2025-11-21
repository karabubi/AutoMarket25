//Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/Car.js

// const db = require('../utils/db');

// const Car = {
//   async create({ user_id, make, model, year, price, description, image_url }) {
//     const result = await db.query(
//       'INSERT INTO cars (user_id, make, model, year, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
//       [user_id, make, model, year, price, description, image_url]
//     );
//     return result.rows[0];
//   },

//   async findAll() {
//     const result = await db.query('SELECT id, user_id, make, model, year, price, description, image_url, created_at FROM cars ORDER BY created_at DESC LIMIT 1000');
//     return result.rows;
//   },

//   async findById(id) {
//     const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
//     return result.rows[0];
//   },

//   async findByUserId(user_id) {
//     const result = await db.query('SELECT id, user_id, make, model, year, price, description, image_url, created_at FROM cars WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
//     return result.rows;
//   },
// };

// module.exports = Car;



//Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/Car.js
// FULLY EXTENDED Car.js MODEL WITH ALL FIELDS
const db = require('../utils/db');

const Car = {
  async create({
    user_id, make, model, year, price, description, image_url,
    mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
    consumption_combined, co2_emission, seats, doors, transmission,
    emission_class, first_registration, climate_control, color, interior,
    trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
  }) {
    const result = await db.query(
      `INSERT INTO cars (
        user_id, make, model, year, price, description, image_url,
        mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
        consumption_combined, co2_emission, seats, doors, transmission,
        emission_class, first_registration, climate_control, color, interior,
        trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18,
        $19, $20, $21, $22, $23,
        $24, $25, $26, $27, $28
      ) RETURNING *`,
      [
        user_id, make, model, year, price, description, image_url,
        mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
        consumption_combined, co2_emission, seats, doors, transmission,
        emission_class, first_registration, climate_control, color, interior,
        trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
      ]
    );
    return result.rows[0];
  },

  async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    const query = `UPDATE cars SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    const result = await db.query(query, [...values, id]);
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT * FROM cars ORDER BY created_at DESC LIMIT 1000');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findByUserId(user_id) {
    const result = await db.query('SELECT * FROM cars WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
    return result.rows;
  },

  async delete(id) {
    await db.query('DELETE FROM cars WHERE id = $1', [id]);
  }
};

module.exports = Car;

