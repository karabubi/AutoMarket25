
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/carController.js

// const Car = require('../models/Car');
// const db = require('../utils/db');

// // 🔓 Public: Get all cars with their images
// exports.getAllCars = async (req, res) => {
//   try {
//     const cars = await Car.findAll();
//     const enrichedCars = await Promise.all(
//       cars.map(async (car) => {
//         const imageRes = await db.query('SELECT image_url FROM car_images WHERE car_id = $1', [car.id]);
//         return {
//           ...car,
//           images: imageRes.rows,
//         };
//       })
//     );
//     res.json(enrichedCars);
//   } catch (err) {
//     console.error('❌ getAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch cars.' });
//   }
// };

// // 🔒 Protected: Get logged-in user's cars with images
// exports.getMyCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) return res.status(400).json({ message: 'Missing user ID' });

//     const cars = await Car.findByUserId(userId);
//     const enrichedCars = await Promise.all(
//       cars.map(async (car) => {
//         const imageRes = await db.query('SELECT image_url FROM car_images WHERE car_id = $1', [car.id]);
//         return {
//           ...car,
//           images: imageRes.rows,
//         };
//       })
//     );
//     res.json(enrichedCars);
//   } catch (err) {
//     console.error('❌ getMyCars error:', err.message);
//     res.status(500).json({ message: err.message || 'Failed to fetch user cars.' });
//   }
// };

// // 🔓 Public: Get a car by ID with images
// exports.getCarById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ message: 'Invalid car ID' });

//     const car = await Car.findById(id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });

//     const imageRes = await db.query('SELECT image_url FROM car_images WHERE car_id = $1', [id]);
//     car.images = imageRes.rows;

//     res.json(car);
//   } catch (err) {
//     console.error('❌ getCarById error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch car.' });
//   }
// };

// // 🔒 Protected: Create a new car with all fields and optional images
// exports.createCar = async (req, res) => {
//   try {
//     const {
//       make, model, year, price, description, image_url, image_urls,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     } = req.body;

//     if (!req.user) return res.status(401).json({ message: 'Unauthorized: no user' });

//     const car = await Car.create({
//       user_id: req.user,
//       make, model, year, price, description, image_url,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     });

//     if (Array.isArray(image_urls) && image_urls.length > 0) {
//       const insertPromises = image_urls.map((url) =>
//         db.query('INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)', [car.id, url])
//       );
//       await Promise.all(insertPromises);
//     }

//     res.status(201).json(car);
//   } catch (err) {
//     console.error('❌ createCar error:', err.message);
//     res.status(500).json({ message: 'Failed to create car.' });
//   }
// };

// // 🔒 Protected: Update a car with all fields (if provided)
// exports.updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user) return res.status(403).json({ message: 'Not authorized' });

//     const fields = [
//       'make', 'model', 'year', 'price', 'description', 'image_url',
//       'mileage', 'engine_size', 'power_kw', 'power_hp', 'drive_type', 'fuel_type',
//       'consumption_combined', 'co2_emission', 'seats', 'doors', 'transmission',
//       'emission_class', 'first_registration', 'climate_control', 'color', 'interior',
//       'trailer_weight_braked', 'trailer_weight_unbraked', 'weight', 'cylinders', 'tank_size'
//     ];

//     const updateData = {};
//     for (const field of fields) {
//       if (req.body[field] !== undefined) {
//         updateData[field] = req.body[field];
//       }
//     }

//     const updatedCar = await Car.update(req.params.id, updateData);
//     res.json(updatedCar);
//   } catch (err) {
//     console.error('❌ updateCar error:', err.message);
//     res.status(500).json({ message: 'Failed to update car.' });
//   }
// };

// // 🔒 Protected: Delete a car by ID (with user check and image cleanup)
// exports.deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user) return res.status(403).json({ message: 'Not authorized' });

//     await Car.delete(req.params.id);
//     await db.query('DELETE FROM car_images WHERE car_id = $1', [req.params.id]);

//     res.json({ message: 'Car deleted' });
//   } catch (err) {
//     console.error('❌ deleteCar error:', err.message);
//     res.status(500).json({ message: 'Failed to delete car.' });
//   }
// };




//-----update 

// const Car = require('../models/Car');
// const db = require('../utils/db');

// // 🔓 Get all cars
// exports.getAllCars = async (req, res) => {
//   try {
//     const cars = await Car.findAll();
//     const enriched = await Promise.all(
//       cars.map(async (car) => {
//         const images = await db.query('SELECT image_url FROM car_images WHERE car_id = $1', [car.id]);
//         return { ...car, images: images.rows };
//       })
//     );
//     res.json(enriched);
//   } catch (err) {
//     console.error('❌ getAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch cars.' });
//   }
// };

// // 🔒 Get logged-in user's cars
// exports.getMyCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) return res.status(400).json({ message: 'Missing user ID' });

//     const cars = await Car.findByUserId(userId);
//     const enriched = await Promise.all(
//       cars.map(async (car) => {
//         const images = await db.query('SELECT image_url FROM car_images WHERE car_id = $1', [car.id]);
//         return { ...car, images: images.rows };
//       })
//     );
//     res.json(enriched);
//   } catch (err) {
//     console.error('❌ getMyCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch user cars.' });
//   }
// };

// // 🔓 Get a single car
// exports.getCarById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ message: 'Invalid car ID' });

//     const car = await Car.findById(id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });

//     const images = await db.query('SELECT image_url FROM car_images WHERE car_id = $1', [id]);
//     car.images = images.rows;

//     res.json(car);
//   } catch (err) {
//     console.error('❌ getCarById error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch car.' });
//   }
// };

// // 🔒 Create new car
// exports.createCar = async (req, res) => {
//   try {
//     const {
//       make, model, year, price, description, image_url, image_urls,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     } = req.body;

//     if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

//     const car = await Car.create({
//       user_id: req.user,
//       make, model, year, price, description, image_url,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     });

//     if (Array.isArray(image_urls) && image_urls.length > 0) {
//       await Promise.all(image_urls.map((url) =>
//         db.query('INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)', [car.id, url])
//       ));
//     }

//     res.status(201).json(car);
//   } catch (err) {
//     console.error('❌ createCar error:', err.message);
//     res.status(500).json({ message: 'Failed to create car.' });
//   }
// };

// // 🔒 Update a car
// exports.updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user) return res.status(403).json({ message: 'Not authorized' });

//     const fields = [
//       'make', 'model', 'year', 'price', 'description', 'image_url',
//       'mileage', 'engine_size', 'power_kw', 'power_hp', 'drive_type', 'fuel_type',
//       'consumption_combined', 'co2_emission', 'seats', 'doors', 'transmission',
//       'emission_class', 'first_registration', 'climate_control', 'color', 'interior',
//       'trailer_weight_braked', 'trailer_weight_unbraked', 'weight', 'cylinders', 'tank_size'
//     ];

//     const updateData = {};
//     fields.forEach((field) => {
//       if (req.body[field] !== undefined) updateData[field] = req.body[field];
//     });

//     const updated = await Car.update(req.params.id, updateData);
//     res.json(updated);
//   } catch (err) {
//     console.error('❌ updateCar error:', err.message);
//     res.status(500).json({ message: 'Failed to update car.' });
//   }
// };

// // 🔒 Delete single car
// exports.deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user) return res.status(403).json({ message: 'Not authorized' });

//     await Car.delete(req.params.id);
//     await db.query('DELETE FROM car_images WHERE car_id = $1', [req.params.id]);

//     res.json({ message: 'Car deleted' });
//   } catch (err) {
//     console.error('❌ deleteCar error:', err.message);
//     res.status(500).json({ message: 'Failed to delete car.' });
//   }
// };

// // ✅ 🔒 Admin: Delete all cars and related images
// exports.deleteAllCars = async (req, res) => {
//   try {
//     await db.query('DELETE FROM car_images');
//     await db.query('DELETE FROM cars');
//     res.status(200).json({ message: '✅ All cars and images deleted successfully.' });
//   } catch (err) {
//     console.error('❌ deleteAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to delete all cars.' });
//   }
// };


//



// const Car = require('../models/Car');
// const db = require('../utils/db');

// // 🔓 Admin: Get all cars with user name and images
// exports.getAllCars = async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT cars.*, users.name AS user_name
//       FROM cars
//       INNER JOIN users ON cars.user_id = users.id
//       ORDER BY cars.created_at DESC
//     `);

//     const cars = result.rows;

//     const enriched = await Promise.all(
//       cars.map(async (car) => {
//         const images = await db.query(
//           'SELECT image_url FROM car_images WHERE car_id = $1',
//           [car.id]
//         );
//         return { ...car, images: images.rows };
//       })
//     );

//     res.status(200).json(enriched);
//   } catch (err) {
//     console.error('❌ getAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch cars.' });
//   }
// };

// // 🔒 Get logged-in user's cars
// exports.getMyCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) return res.status(400).json({ message: 'Missing user ID' });

//     const cars = await Car.findByUserId(userId);
//     const enriched = await Promise.all(
//       cars.map(async (car) => {
//         const images = await db.query(
//           'SELECT image_url FROM car_images WHERE car_id = $1',
//           [car.id]
//         );
//         return { ...car, images: images.rows };
//       })
//     );

//     res.json(enriched);
//   } catch (err) {
//     console.error('❌ getMyCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch user cars.' });
//   }
// };

// // 🔓 Get a single car
// exports.getCarById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ message: 'Invalid car ID' });

//     const car = await Car.findById(id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });

//     const images = await db.query(
//       'SELECT image_url FROM car_images WHERE car_id = $1',
//       [id]
//     );
//     car.images = images.rows;

//     res.json(car);
//   } catch (err) {
//     console.error('❌ getCarById error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch car.' });
//   }
// };

// // 🔒 Create new car
// exports.createCar = async (req, res) => {
//   try {
//     const {
//       make, model, year, price, description, image_url, image_urls,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     } = req.body;

//     if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

//     const car = await Car.create({
//       user_id: req.user,
//       make, model, year, price, description, image_url,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     });

//     if (Array.isArray(image_urls) && image_urls.length > 0) {
//       await Promise.all(image_urls.map((url) =>
//         db.query(
//           'INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)',
//           [car.id, url]
//         )
//       ));
//     }

//     res.status(201).json(car);
//   } catch (err) {
//     console.error('❌ createCar error:', err.message);
//     res.status(500).json({ message: 'Failed to create car.' });
//   }
// };

// // 🔒 Update a car
// exports.updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user) return res.status(403).json({ message: 'Not authorized' });

//     const fields = [
//       'make', 'model', 'year', 'price', 'description', 'image_url',
//       'mileage', 'engine_size', 'power_kw', 'power_hp', 'drive_type', 'fuel_type',
//       'consumption_combined', 'co2_emission', 'seats', 'doors', 'transmission',
//       'emission_class', 'first_registration', 'climate_control', 'color', 'interior',
//       'trailer_weight_braked', 'trailer_weight_unbraked', 'weight', 'cylinders', 'tank_size'
//     ];

//     const updateData = {};
//     fields.forEach((field) => {
//       if (req.body[field] !== undefined) updateData[field] = req.body[field];
//     });

//     const updated = await Car.update(req.params.id, updateData);
//     res.json(updated);
//   } catch (err) {
//     console.error('❌ updateCar error:', err.message);
//     res.status(500).json({ message: 'Failed to update car.' });
//   }
// };

// // 🔒 Delete single car
// exports.deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user) return res.status(403).json({ message: 'Not authorized' });

//     await Car.delete(req.params.id);
//     await db.query('DELETE FROM car_images WHERE car_id = $1', [req.params.id]);

//     res.json({ message: 'Car deleted' });
//   } catch (err) {
//     console.error('❌ deleteCar error:', err.message);
//     res.status(500).json({ message: 'Failed to delete car.' });
//   }
// };

// // ✅ 🔒 Admin: Delete all cars and related images
// exports.deleteAllCars = async (req, res) => {
//   try {
//     await db.query('DELETE FROM car_images');
//     await db.query('DELETE FROM cars');
//     res.status(200).json({ message: '✅ All cars and images deleted successfully.' });
//   } catch (err) {
//     console.error('❌ deleteAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to delete all cars.' });
//   }
// };


///


// carController.js

// //Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/controllers/carController.js
// const Car = require('../models/Car');
// const db = require('../utils/db');

// // Admin: Get all cars with user name and images
// exports.getAllCars = async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT cars.*, users.name AS user_name
//       FROM cars
//       INNER JOIN users ON cars.user_id = users.id
//       ORDER BY cars.created_at DESC
//     `);

//     const enriched = await Promise.all(
//       result.rows.map(async (car) => {
//         const images = await db.query(
//           'SELECT image_url FROM car_images WHERE car_id = $1',
//           [car.id]
//         );
//         return { ...car, images: images.rows };
//       })
//     );

//     res.status(200).json(enriched);
//   } catch (err) {
//     console.error('getAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch cars.' });
//   }
// };

// // Logged-in user's cars
// exports.getMyCars = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) return res.status(400).json({ message: 'Missing user ID' });

//     const cars = await Car.findByUserId(userId);
//     const enriched = await Promise.all(
//       cars.map(async (car) => {
//         const images = await db.query(
//           'SELECT image_url FROM car_images WHERE car_id = $1',
//           [car.id]
//         );
//         return { ...car, images: images.rows };
//       })
//     );

//     res.json(enriched);
//   } catch (err) {
//     console.error('getMyCars error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch user cars.' });
//   }
// };

// // Get a single car
// exports.getCarById = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) return res.status(400).json({ message: 'Invalid car ID' });

//     const car = await Car.findById(id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });

//     const images = await db.query(
//       'SELECT image_url FROM car_images WHERE car_id = $1',
//       [id]
//     );
//     car.images = images.rows;

//     res.json(car);
//   } catch (err) {
//     console.error('getCarById error:', err.message);
//     res.status(500).json({ message: 'Failed to fetch car.' });
//   }
// };

// // Create new car
// exports.createCar = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (!userId) return res.status(401).json({ message: 'Unauthorized' });

//     const {
//       make, model, year, price, description, image_url, image_urls,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     } = req.body;

//     const car = await Car.create({
//       user_id: userId,
//       make, model, year, price, description, image_url,
//       mileage, engine_size, power_kw, power_hp, drive_type, fuel_type,
//       consumption_combined, co2_emission, seats, doors, transmission,
//       emission_class, first_registration, climate_control, color, interior,
//       trailer_weight_braked, trailer_weight_unbraked, weight, cylinders, tank_size
//     });

//     if (Array.isArray(image_urls)) {
//       await Promise.all(image_urls.map((url) =>
//         db.query('INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)', [car.id, url])
//       ));
//     }

//     res.status(201).json(car);
//   } catch (err) {
//     console.error('createCar error:', err.message);
//     res.status(500).json({ message: 'Failed to create car.' });
//   }
// };

// // Update a car
// exports.updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });
//     if (car.user_id !== req.user && !req.isAdmin) return res.status(403).json({ message: 'Not authorized' });

//     const fields = [
//       'make', 'model', 'year', 'price', 'description', 'image_url',
//       'mileage', 'engine_size', 'power_kw', 'power_hp', 'drive_type', 'fuel_type',
//       'consumption_combined', 'co2_emission', 'seats', 'doors', 'transmission',
//       'emission_class', 'first_registration', 'climate_control', 'color', 'interior',
//       'trailer_weight_braked', 'trailer_weight_unbraked', 'weight', 'cylinders', 'tank_size'
//     ];

//     const updateData = {};
//     fields.forEach((field) => {
//       if (req.body[field] !== undefined) updateData[field] = req.body[field];
//     });

//     const updated = await Car.update(req.params.id, updateData);
//     res.json(updated);
//   } catch (err) {
//     console.error('updateCar error:', err.message);
//     res.status(500).json({ message: 'Failed to update car.' });
//   }
// };

// // Delete single car
// exports.deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: 'Car not found' });

//     if (car.user_id !== req.user && !req.isAdmin) {
//       return res.status(403).json({ message: 'Not authorized to delete this car' });
//     }

//     await db.query('DELETE FROM car_images WHERE car_id = $1', [req.params.id]);
//     await Car.delete(req.params.id);

//     res.json({ message: 'Car deleted successfully' });
//   } catch (err) {
//     console.error('deleteCar error:', err.message);
//     res.status(500).json({ message: 'Failed to delete car.' });
//   }
// };

// // Admin: Delete all cars
// exports.deleteAllCars = async (req, res) => {
//   try {
//     if (!req.isAdmin) return res.status(403).json({ message: 'Only admins can delete all cars.' });

//     await db.query('DELETE FROM car_images');
//     await db.query('DELETE FROM cars');

//     res.status(200).json({ message: 'All cars and related images deleted successfully.' });
//   } catch (err) {
//     console.error('deleteAllCars error:', err.message);
//     res.status(500).json({ message: 'Failed to delete all cars.' });
//   }
// };


// 03-08-25



