//Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/Car.js

const db = require('../utils/db');

const Car = {
  async create({ user_id, make, model, year, price, description, image_url }) {
    const result = await db.query(
      'INSERT INTO cars (user_id, make, model, year, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, make, model, year, price, description, image_url]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT id, user_id, make, model, year, price, description, image_url, created_at FROM cars ORDER BY created_at DESC LIMIT 1000');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findByUserId(user_id) {
    const result = await db.query('SELECT id, user_id, make, model, year, price, description, image_url, created_at FROM cars WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
    return result.rows;
  },
};

module.exports = Car;


//------------------09-05

// Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/Car.js

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

//   async saveCarImages(carId, imageUrls) {
//     const queries = imageUrls.map((url) =>
//       db.query(
//         'INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)',
//         [carId, url]
//       )
//     );
//     await Promise.all(queries);
//   },
// };

// module.exports = Car;