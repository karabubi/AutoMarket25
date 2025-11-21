

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
//     name: 'Automarket25',
//     phone: '004917655105979',
//     email: 'karabubi66@myahoo.com',
//     logoUrl: '/assets/logo.png',
//   };

//   const fallbackLocation = 'Honnefer Str. 19, 53179 Bonn';
//   const displayLocation = car.location || fallbackLocation;

//   const tagColor =
//     car.tag === 'NEW'
//       ? 'bg-green-600'
//       : car.tag === 'SOLD'
//       ? 'bg-gray-600'
//       : 'bg-blue-600';

//   return (
//     <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden mb-10">
//       <div className="flex flex-col md:flex-row">
//         {/* Left: Image Gallery */}
//         <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
//           {galleryItems.length > 0 && (
//             <ImageGallery
//               items={galleryItems}
//               showPlayButton={false}
//               showFullscreenButton={true}
//               showThumbnails={true}
//               showNav={true}
//               autoPlay
//               slideInterval={4000}
//             />
//           )}
//         </div>

//         {/* Right: Car Details */}
//         <div className="w-full md:w-1/2 flex flex-col justify-between p-6 bg-gray-50 space-y-6">
//           {/* Car Tag */}
//           {car.tag && (
//             <span className={`self-start px-3 py-1 text-xs font-bold text-white rounded-full ${tagColor}`}>
//               {car.tag}
//             </span>
//           )}

//           {/* Title + Description */}
//           <div className="space-y-1">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {car.make} {car.model}
//             </h2>
//             <p className="text-sm text-gray-600">{car.description || 'Keine Beschreibung vorhanden'}</p>
//             <p className="text-sm text-gray-500">
//               📍{' '}
//               <a
//                 href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayLocation)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 {displayLocation}
//               </a>
//             </p>
//           </div>

//           {/* Price + Buttons */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//             <div>
//               <p className="text-xl font-semibold text-green-700">
//                 €{car.price?.toLocaleString()}
//               </p>
//               <p className="text-xs text-gray-500">inkl. MwSt.</p>
//             </div>
//             <div className="flex gap-3 mt-3 sm:mt-0">
//               <Link
//                 to={`/car/${car.id}`}
//                 className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm font-medium"
//               >
//                 Details
//               </Link>
//               <a
//                 href={`tel:${dealer.phone}`}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
//               >
//                 Call Now
//               </a>
//             </div>
//           </div>

//           {/* Dealer Info */}
//           <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//             <img
//               src={dealer.logoUrl}
//               alt={`${dealer.name} logo`}
//               className="w-12 h-12 object-contain rounded-full border"
//             />
//             <div className="text-sm text-gray-700">
//               <p className="font-medium">{dealer.name}</p>
//               <p>{dealer.phone}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarCard;
