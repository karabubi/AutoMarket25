
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarImagesGallery.jsx

import { useEffect, useState } from 'react';
import { fetchCarImages } from '../utils/api'; // ✅ Correct named import
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const CarImagesGallery = ({ carId }) => {
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetchCarImages(carId);
        setCarImages(res.data || []);
      } catch (err) {
        console.error('❌ Error fetching car images:', err);
        setError('⚠️ Failed to load images.');
      } finally {
        setLoading(false);
      }
    };

    if (carId) loadImages();
  }, [carId]);

  const galleryItems = carImages.map((img) => ({
    original: img.image_url,
    thumbnail: img.image_url,
  }));

  if (loading) {
    return <p className="text-center text-gray-500 py-4">⏳ Loading images...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-4">{error}</p>;
  }

  if (galleryItems.length === 0) {
    return <p className="text-center text-gray-400 py-4">🚫 No images available for this car.</p>;
  }

  return (
    <div className="my-6 max-w-4xl mx-auto">
      <ImageGallery
        items={galleryItems}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={true}
        thumbnailPosition="bottom"
      />
    </div>
  );
};

export default CarImagesGallery;
