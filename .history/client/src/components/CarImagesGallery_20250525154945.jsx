
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarImagesGallery.jsx

import { useEffect, useState } from 'react';
import axios from '../utils/api';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const CarImagesGallery = ({ carId }) => {
  const [carImages, setCarImages] = useState([]);

  useEffect(() => {
    const fetchCarImages = async () => {
      try {
        const response = await axios.get(`/cars/${carId}/images`);
        setCarImages(response.data);
      } catch (error) {
        console.error('Error fetching car images:', error);
      }
    };
    fetchCarImages();
  }, [carId]);

  if (carImages.length === 0) {
    return <p className="text-gray-500">No images available.</p>;
  }

  const galleryItems = carImages.map((img) => ({
    original: img.image_url,
    thumbnail: img.image_url,
  }));

  return (
    <div className="my-6">
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
