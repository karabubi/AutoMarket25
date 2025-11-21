
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarCard.jsx

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
    phone: '',
    email: 'karabubi66@myahoo.com',
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
