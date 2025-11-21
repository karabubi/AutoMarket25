//Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/carImageController.js

// const CarImage = require('../models/CarImage');
// const { cloudinary } = require('../utils/cloudinary');

// exports.deleteImageById = async (req, res) => {
//   try {
//     const imageId = parseInt(req.params.id);
//     const image = await CarImage.findById(imageId);
//     if (!image) return res.status(404).json({ message: 'Image not found' });

//     // Bild von Cloudinary löschen
//     await cloudinary.uploader.destroy(image.public_id);
//     await CarImage.delete(imageId);

//     res.json({ message: '✅ Image deleted' });
//   } catch (err) {
//     console.error('❌ Delete image failed:', err.message);
//     res.status(500).json({ message: 'Failed to delete image' });
//   }
// };


//----------------v2 


// Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/carImageController.js

// const CarImage = require('../models/CarImage');
// const { cloudinary } = require('../utils/cloudinary');

// // ✅ Upload multiple images and save public_id
// exports.uploadCarImages = async (req, res) => {
//   try {
//     const carId = parseInt(req.body.car_id);
//     if (!req.files || isNaN(carId)) {
//       return res.status(400).json({ message: 'Missing files or invalid car_id' });
//     }

//     const uploaded = [];

//     for (const file of req.files) {
//       const publicId = file.filename.split('.')[0]; // Extract public_id from Cloudinary
//       const saved = await CarImage.add(carId, file.path, publicId); // Save to DB
//       uploaded.push(saved);
//     }

//     res.status(201).json(uploaded);
//   } catch (err) {
//     console.error('❌ Upload failed:', err.message);
//     res.status(500).json({ message: 'Upload failed' });
//   }
// };

// // ✅ Delete image from Cloudinary + database
// exports.deleteImageById = async (req, res) => {
//   try {
//     const imageId = parseInt(req.params.id);
//     const image = await CarImage.findById(imageId);
//     if (!image) return res.status(404).json({ message: 'Image not found' });

//     // Delete from Cloudinary using stored public_id
//     await cloudinary.uploader.destroy(image.public_id);
//     await CarImage.delete(imageId);

//     res.json({ message: '✅ Image deleted' });
//   } catch (err) {
//     console.error('❌ Delete image failed:', err.message);
//     res.status(500).json({ message: 'Failed to delete image' });
//   }
// };


//-------------------


const CarImage = require('../models/CarImage');
const { cloudinary } = require('../utils/cloudinary');

exports.uploadCarImages = async (req, res) => {
  try {
    const carId = parseInt(req.body.car_id);
    if (!req.files || isNaN(carId)) {
      return res.status(400).json({ message: 'Missing files or invalid car_id' });
    }

    const uploaded = [];
    for (const file of req.files) {
      const publicId = file.filename.split('.')[0];
      const saved = await CarImage.add(carId, file.path, publicId);
      uploaded.push(saved);
    }

    res.status(201).json(uploaded);
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
    res.status(500).json({ message: 'Upload failed' });
  }
};

exports.getImagesByCarId = async (req, res) => {
  try {
    const carId = parseInt(req.params.carId);
    const images = await CarImage.findByCarId(carId);
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

exports.deleteImageById = async (req, res) => {
  try {
    const image = await CarImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await cloudinary.uploader.destroy(image.public_id);
    await CarImage.delete(req.params.id);
    res.json({ message: '✅ Image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
