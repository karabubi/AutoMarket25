
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/controllers/carController.js
const Car = require("../models/Car");
const db = require("../utils/db");

// Public: Get all cars with owner name + images
exports.getAllCars = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT cars.*, users.name AS user_name
      FROM cars
      INNER JOIN users ON cars.user_id = users.id
      ORDER BY cars.created_at DESC
    `);

    const enriched = await Promise.all(
      result.rows.map(async (car) => {
        const images = await db.query(
          "SELECT id, image_url FROM car_images WHERE car_id = $1 ORDER BY created_at DESC",
          [car.id]
        );
        return { ...car, images: images.rows };
      })
    );

    return res.status(200).json(enriched);
  } catch (err) {
    console.error("getAllCars error:", err);
    return res.status(500).json({ message: "Failed to fetch cars." });
  }
};

// Logged-in user's cars
exports.getMyCars = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cars = await Car.findByUserId(userId);

    const enriched = await Promise.all(
      cars.map(async (car) => {
        const images = await db.query(
          "SELECT id, image_url FROM car_images WHERE car_id = $1 ORDER BY created_at DESC",
          [car.id]
        );
        return { ...car, images: images.rows };
      })
    );

    return res.status(200).json(enriched);
  } catch (err) {
    console.error("getMyCars error:", err);
    return res.status(500).json({ message: "Failed to fetch user cars." });
  }
};

// Get a single car
exports.getCarById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || Number.isNaN(id)) return res.status(400).json({ message: "Invalid car ID" });

    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const images = await db.query(
      "SELECT id, image_url FROM car_images WHERE car_id = $1 ORDER BY created_at DESC",
      [id]
    );

    return res.status(200).json({ ...car, images: images.rows });
  } catch (err) {
    console.error("getCarById error:", err);
    return res.status(500).json({ message: "Failed to fetch car." });
  }
};

// Create new car
exports.createCar = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const body = req.body || {};

    // ✅ Normalize numbers (because frontend may send strings)
    const year = body.year !== undefined ? Number(body.year) : undefined;
    const price = body.price !== undefined ? Number(body.price) : undefined;

    if (!body.make || !body.model) {
      return res.status(400).json({ message: "Make and model are required." });
    }
    if (year && Number.isNaN(year)) return res.status(400).json({ message: "Invalid year" });
    if (price && Number.isNaN(price)) return res.status(400).json({ message: "Invalid price" });

    const car = await Car.create({
      user_id: userId,
      make: body.make,
      model: body.model,
      year,
      price,
      description: body.description,
      image_url: body.image_url,
      mileage: body.mileage,
      engine_size: body.engine_size,
      power_kw: body.power_kw,
      power_hp: body.power_hp,
      drive_type: body.drive_type,
      fuel_type: body.fuel_type,
      consumption_combined: body.consumption_combined,
      co2_emission: body.co2_emission,
      seats: body.seats,
      doors: body.doors,
      transmission: body.transmission,
      emission_class: body.emission_class,
      first_registration: body.first_registration,
      climate_control: body.climate_control,
      color: body.color,
      interior: body.interior,
      trailer_weight_braked: body.trailer_weight_braked,
      trailer_weight_unbraked: body.trailer_weight_unbraked,
      weight: body.weight,
      cylinders: body.cylinders,
      tank_size: body.tank_size,
    });

    // ✅ Insert extra images if provided
    if (Array.isArray(body.image_urls) && body.image_urls.length > 0) {
      await Promise.all(
        body.image_urls.map((url) =>
          db.query("INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)", [car.id, url])
        )
      );
    }

    // return car + images
    const images = await db.query(
      "SELECT id, image_url FROM car_images WHERE car_id = $1 ORDER BY created_at DESC",
      [car.id]
    );

    return res.status(201).json({ ...car, images: images.rows });
  } catch (err) {
    console.error("createCar error:", err);
    return res.status(500).json({ message: "Failed to create car." });
  }
};

// Delete single car
exports.deleteCar = async (req, res) => {
  try {
    const carId = Number(req.params.id);
    if (!carId || Number.isNaN(carId)) {
      return res.status(400).json({ message: "Invalid car id" });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.user_id !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: "Not authorized to delete this car" });
    }

    await db.query("DELETE FROM car_images WHERE car_id = $1", [carId]);
    await Car.delete(carId);

    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("deleteCar error:", err);
    return res.status(500).json({ message: "Failed to delete car." });
  }
};

// Admin: Delete all cars
exports.deleteAllCars = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({ message: "Only admins can delete all cars." });
    }

    await db.query("DELETE FROM car_images");
    await db.query("DELETE FROM cars");

    return res.status(200).json({ message: "All cars and related images deleted successfully." });
  } catch (err) {
    console.error("deleteAllCars error:", err);
    return res.status(500).json({ message: "Failed to delete all cars." });
  }
};
