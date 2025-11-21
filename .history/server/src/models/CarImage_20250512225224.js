//Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/CarImage.js
// Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/CarImage.js

const db = require('../utils/db');

const CarImage = {
  async add(car_id, image_url, public_id) {
    const result = await db.query(
      'INSERT INTO car_images (car_id, image_url, public_id) VALUES ($1, $2, $3) RETURNING *',
      [car_id, image_url, public_id]
    );
    return result.rows[0];
  },

  async findByCarId(car_id) {
    // Du kannst hier ASC oder DESC verwenden – wir nehmen DESC, um neueste zuerst zu zeigen
    const result = await db.query(
      'SELECT * FROM car_images WHERE car_id = $1 ORDER BY created_at DESC',
      [car_id]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM car_images WHERE id = $1', [id]);
    return result.rows[0];
  },

  async delete(id) {
