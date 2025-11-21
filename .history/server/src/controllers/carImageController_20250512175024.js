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
