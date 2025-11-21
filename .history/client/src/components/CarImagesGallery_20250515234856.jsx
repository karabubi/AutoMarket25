
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarImagesGallery.jsx

// import { useEffect, useState } from 'react';
// import axios from '../utils/api';
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// const CarImagesGallery = ({ carId }) => {
//   const [carImages, setCarImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchCarImages = async () => {
//       try {
//         const response = await axios.get(`/cars/${carId}/images`);
//         setCarImages(response.data);
//       } catch (error) {
//         console.error('Error fetching car images:', error);
//       }
//     };
//     fetchCarImages();
//   }, [carId]);

//   const openModal = (index) => {
//     setCurrentIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const showNext = () => {
//     setCurrentIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
//   };

//   const showPrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
//   };

//   if (carImages.length === 0) return <p className="text-gray-500">No images available.</p>;

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       {/* Main Display Image */}
//       <img
//         src={carImages[currentIndex].image_url}
//         alt="Car"
//         onClick={() => openModal(currentIndex)}
//         className="w-full h-80 object-cover rounded shadow cursor-pointer"
//       />

//       {/* Thumbnails */}
//       <div className="flex justify-center gap-2 mt-4 flex-wrap">
//         {carImages.map((image, index) => (
//           <img
//             key={image.id}
//             src={image.image_url}
//             onClick={() => openModal(index)}
//             className={`w-20 h-14 object-cover rounded cursor-pointer border ${
//               index === currentIndex ? 'border-blue-500' : 'border-transparent'
//             }`}
//             alt={`Thumbnail ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Modal / Lightbox */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
//           {/* Close Button */}
//           <button
//             onClick={closeModal}
//             className="absolute top-5 right-5 text-white bg-gray-800 p-2 rounded-full"
//           >
//             <X size={24} />
//           </button>

//           {/* Prev Button */}
//           <button
//             onClick={showPrev}
//             className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 p-2 rounded-full text-white"
//           >
//             <ChevronLeft size={32} />
//           </button>

//           {/* Full Image */}
//           <img
//             src={carImages[currentIndex].image_url}
//             alt="Car Large"
//             className="max-w-full max-h-[80vh] rounded shadow-xl"
//           />

//           {/* Next Button */}
//           <button
//             onClick={showNext}
//             className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 p-2 rounded-full text-white"
//           >
//             <ChevronRight size={32} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarImagesGallery;





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
