
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarCard.jsx

// import { Link } from 'react-router-dom';
// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';

// const CarCard = ({ car }) => {
//   const galleryItems = (car.images && car.images.length > 0
//     ? car.images
//     : car.image_url
//     ? [{ image_url: car.image_url }]
//     : []).map((img) => ({
//     original: img.image_url,
//     thumbnail: img.image_url,
//   }));

//   const dealer = car.dealer || {
//     name: 'MS Automobili Srl',
//     phone: '004917655105979',
//     email: 'karabubi66@myahoo.com',
//     logoUrl: '/dealer-logo.png',
//   };


//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex flex-col gap-4 relative">
//       {/* Image Slider */}
//       {galleryItems.length > 0 && (
//         <div className="rounded overflow-hidden">
//           <ImageGallery
//             items={galleryItems}
//             showPlayButton={false}
//             showFullscreenButton={true}
//             showThumbnails={true}
//             showNav={true}
//             autoPlay
//             slideInterval={4000}
//           />
//         </div>
//       )}

//       {/* Car Info */}
//       <div className="space-y-1">
//         <h2 className="text-2xl font-bold text-gray-900">{car.make} {car.model}</h2>
//         <p className="text-sm text-gray-600">{car.description || 'Keine Beschreibung vorhanden'}</p>
//         <p className="text-sm text-gray-500">📍 {car.location || 'Unbekannter Standort'}</p>
//       </div>

//       {/* Price Info */}
//       <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
//         <div>
//           <p className="text-xl font-semibold text-green-700">€{car.price.toLocaleString()}</p>
//           <p className="text-xs text-gray-500">inkl. MwSt.</p>
//         </div>
//         <Link
//           to={`/car/${car.id}`}
//           className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm font-medium"
//         >
//           E-Mail schreiben
//         </Link>
//       </div>

//       {/* Dealer Info */}
//       <div className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200">
//         <img
//           src={dealer.logoUrl}
//           alt={`${dealer.name} logo`}
//           className="w-12 h-12 object-contain rounded border"
//         />
//         <div className="text-sm text-gray-700">
//           <p className="font-medium">{dealer.name}</p>
//           <p>{dealer.phone}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarCard;






// import { Link } from 'react-router-dom';
// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';

// const CarCard = ({ car }) => {
//   const galleryItems = (car.images && car.images.length > 0
//     ? car.images
//     : car.image_url
//     ? [{ image_url: car.image_url }]
//     : []).map((img) => ({
//     original: img.image_url,
//     thumbnail: img.image_url,
//   }));

//   const dealer = car.dealer || {
//     name: 'MS Automobili Srl',
//     phone: '004917655105979',
//     email: 'karabubi66@myahoo.com',
//     logoUrl: '/dealer-logo.png',
//   };

//   const fallbackLocation = 'Honnefer Str. 19, 53179 Bonn';
//   const displayLocation = car.location || fallbackLocation;

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 max-w-6xl mx-auto overflow-hidden p-4">
      
//       {/* LEFT SIDE: Image Gallery */}
//       <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-gray-200">
//         {galleryItems.length > 0 && (
//           <ImageGallery
//             items={galleryItems}
//             showPlayButton={false}
//             showFullscreenButton={true}
//             showThumbnails={true}
//             showNav={true}
//             autoPlay
//             slideInterval={5000}
//           />
//         )}
//       </div>

//       {/* RIGHT SIDE: Car Details Box */}
//       <div className="w-full lg:w-1/2 bg-gray-50 rounded-xl p-6 flex flex-col justify-between border border-gray-200">
        
//         {/* Title and Description */}
//         <div className="space-y-3">
//           <h2 className="text-3xl font-bold text-gray-800">{car.make} {car.model}</h2>
//           <p className="text-gray-600 text-sm">
//             {car.description || 'Keine Beschreibung vorhanden'}
//           </p>
//           <p className="text-sm text-gray-500">
//             📍{' '}
//             <a
//               href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayLocation)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               {displayLocation}
//             </a>
//           </p>
//         </div>

//         {/* Price Box */}
//         <div className="mt-6 bg-white rounded-xl shadow-sm p-4 border border-gray-300 flex items-center justify-between">
//           <div>
//             <p className="text-2xl font-bold text-green-700">€{car.price.toLocaleString()}</p>
//             <p className="text-xs text-gray-500 mt-1">inkl. MwSt.</p>
//           </div>
//           <Link
//             to={`/car/${car.id}`}
//             className="px-5 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
//           >
//             E-Mail schreiben
//           </Link>
//         </div>

//         {/* Dealer Info */}
//         <div className="mt-6 bg-white rounded-xl shadow-sm p-4 border border-gray-300 flex items-center gap-4">
//           <img
//             src={dealer.logoUrl}
//             alt={`${dealer.name} logo`}
//             className="w-14 h-14 rounded-full object-cover border"
//           />
//           <div>
//             <p className="font-medium text-gray-800">{dealer.name}</p>
//             <p className="text-sm text-gray-600">{dealer.phone}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarCard;



import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const CarCard = ({ car }) => {
  const galleryItems = (car.images?.length
    ? car.images
    : car.image_url
    ? [{ image_url: car.image_url }]
    : []
  ).map((img) => ({
    original: img.image_url,
    thumbnail: img.image_url,
  }));

  const dealer = car.dealer || {
    name: 'MS Automobili Srl',
    phone: '004917655105979',
    email: 'karabubi66@myahoo.com',
    logoUrl: '/dealer-logo.png',
  };

  const fallbackLocation = 'Honnefer Str. 19, 53179 Bonn';
  const displayLocation = car.location || fallbackLocation;

  const tagColor =
    car.tag === 'NEW'
      ? 'bg-green-600'
      : car.tag === 'SOLD'
      ? 'bg-gray-500'
      : 'bg-blue-600';

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-6xl mx-auto p-4">
      {/* LEFT: Image Gallery */}
      <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-gray-200">
        {galleryItems.length > 0 && (
          <ImageGallery
            items={galleryItems}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={false}
            showNav={true}
            autoPlay
            slideInterval={5000}
          />
        )}
      </div>

      {/* RIGHT: Detail Box */}
      <div className="w-full lg:w-1/2 bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
        {/* Tag */}
        {car.tag && (
          <div className={`inline-block mb-2 px-3 py-1 text-xs font-bold text-white rounded-full ${tagColor}`}>
            {car.tag}
          </div>
        )}

        {/* Title + Description */}
        <div className="space-y-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{car.make} {car.model}</h2>
          <p className="text-sm text-gray-600">{car.description || 'Keine Beschreibung vorhanden'}</p>
          <p className="text-sm text-gray-500">
            📍{' '}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {displayLocation}
            </a>
          </p>
        </div>

        {/* Price + Actions */}
        <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-green-700">€{car.price.toLocaleString()}</p>
              <p className="text-xs text-gray-500">inkl. MwSt.</p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/car/${car.id}`}
                className="px-4 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition"
              >
                E-Mail schreiben
              </Link>
              <a
                href={`tel:${dealer.phone}`}
                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Dealer Info */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-300 shadow-sm">
          <img
            src={dealer.logoUrl}
            alt={`${dealer.name} logo`}
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <p className="font-medium text-gray-800">{dealer.name}</p>
            <p className="text-sm text-gray-600">{dealer.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
