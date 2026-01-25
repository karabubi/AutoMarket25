
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/models/CarImage.js
const db = require("../utils/db");

const CarImage = {
  /**
   * Insert a new image row for a car
   */
  async add(car_id, image_url, public_id = null) {
    if (!car_id || Number.isNaN(Number(car_id))) {
      throw new Error("CarImage.add: invalid car_id");
    }
    if (!image_url || typeof image_url !== "string") {
      throw new Error("CarImage.add: invalid image_url");
    }

    const result = await db.query(
      `INSERT INTO car_images (car_id, image_url, public_id)
       VALUES ($1, $2, $3)
       RETURNING id, car_id, image_url, public_id, created_at`,
      [Number(car_id), image_url, public_id]
    );

    return result.rows[0];
  },

  /**
   * Get all images for one car (newest first)
   */
  async findByCarId(car_id) {
    if (!car_id || Number.isNaN(Number(car_id))) {
      throw new Error("CarImage.findByCarId: invalid car_id");
    }

    const result = await db.query(
      `SELECT id, car_id, image_url, public_id, created_at
       FROM car_images
       WHERE car_id = $1
       ORDER BY created_at DESC`,
      [Number(car_id)]
    );

    return result.rows;
  },

  /**
   * Get one image by its id
   */
  async findById(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw new Error("CarImage.findById: invalid id");
    }

    const result = await db.query(
      `SELECT id, car_id, image_url, public_id, created_at
       FROM car_images
       WHERE id = $1`,
      [Number(id)]
    );

    return result.rows[0] || null;
  },

  /**
   * Delete one image row by id
   */
  async delete(id) {
    if (!id || Number.isNaN(Number(id))) {
      throw new Error("CarImage.delete: invalid id");
    }

    await db.query(`DELETE FROM car_images WHERE id = $1`, [Number(id)]);
    return true;
  },
};

module.exports = CarImage;
