//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarCard.jsx

// import { Link } from 'react-router-dom';

// const CarCard = ({ car }) => (
//   <div className="flex flex-col items-center text-center">
//     <div className="w-24 h-24 md:w-32 md:h-32 mb-2 overflow-hidden rounded-full border">
//       <img
//         src={car.image_url}
//         alt={`${car.make} ${car.model}`}
//         className="w-full h-full object-cover"
//       />
//     </div>
//     <h2 className="text-base md:text-lg font-bold text-gray-800 mb-1">
//       {car.make} {car.model}
//     </h2>
//     <p className="text-gray-600 text-sm mb-2">
//       ${car.price.toLocaleString()}
//     </p>
//     <Link
//       to={`/car/${car.id}`}
//       className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:bg-blue-600 transition"
//     >
//       View Details
//     </Link>
//   </div>
// );

// export default CarCard;

//----------------------v2


// Updated CarCard.jsx to include image slider
// File: client/src/components/CarCard.jsx

import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const CarCard = ({ car }) => {
  const galleryItems = (car.images && car.images.length > 0
    ? car.images
    : car.image_url
    ? [{ image_url: car.image_url }]
    : []).map((img) => ({
    original: img.image_url,
    thumbnail: img.image_url,
  }));

  return (
    <div className="flex flex-col items-center text-center">
      {/* Slider */}
      {galleryItems.length > 0 ? (
        <div className="w-full mb-2">
          <ImageGallery
            items={galleryItems}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showNav={false}
            slideDuration={200}
            slideInterval={4000}
            autoPlay={true}
          />
        </div>
      ) : (
        <div className="w-24 h-24 md:w-32 md:h-32 mb-2 overflow-hidden rounded-full border">
          <img
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Info */}
      <h2 className="text-base md:text-lg font-bold text-gray-800 mb-1">
        {car.make} {car.model}
      </h2>
      <p className="text-gray-600 text-sm mb-2">
        ${car.price.toLocaleString()}
      </p>
      <Link
        to={`/car/${car.id}`}
        className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default CarCard;
