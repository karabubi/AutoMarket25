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

  const dealer = car.dealer || {
    name: 'MS Automobili Srl',
    phone: '+39 011 01 21 422',
    email: 'info@msautomobili.com',
    logoUrl: '/dealer-logo.png',
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex flex-col gap-4 relative">
      {/* Image Slider */}
      {galleryItems.length > 0 && (
        <div className="rounded overflow-hidden">
          <ImageGallery
            items={galleryItems}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={true}
            showNav={true}
            autoPlay
            slideInterval={4000}
          />
        </div>
      )}

      {/* Car Info */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">{car.make} {car.model}</h2>
        <p className="text-sm text-gray-600">{car.description || 'Keine Beschreibung vorhanden'}</p>
        <p className="text-sm text-gray-500">📍 {car.location || 'Unbekannter Standort'}</p>
      </div>

      {/* Price Info */}
      <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
        <div>
          <p className="text-xl font-semibold text-green-700">€{car.price.toLocaleString()}</p>
          <p className="text-xs text-gray-500">inkl. MwSt.</p>
        </div>
        <Link
          to={`/car/${car.id}`}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm font-medium"
        >
          E-Mail schreiben
        </Link>
      </div>

      {/* Dealer Info */}
      <div className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200">
        <img
          src={dealer.logoUrl}
          alt={`${dealer.name} logo`}
          className="w-12 h-12 object-contain rounded border"
        />
        <div className="text-sm text-gray-700">
          <p className="font-medium">{dealer.name}</p>
          <p>{dealer.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
