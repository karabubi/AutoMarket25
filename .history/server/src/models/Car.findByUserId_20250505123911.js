
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/models/Car.findByUserId.js


const db = require('../utils/db');

class CarModel {
  async findByUserId(user_id) {
    if (!user_id) throw new Error('Missing user_id');
    const result = await db.query('SELECT * FROM cars WHERE user_id = $1', [user_id]);
    return result.rows;
  }

  // Add your other methods like create, findById, update, delete here...
}

module.exports = new CarModel();
