
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/DealerCard.jsx

// const DealerCard = ({ dealer }) => {
//   const {
//     name,
//     phone,
//     email,
//     rating,
//     logoUrl,
//   } = dealer;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md border flex flex-col items-center space-y-4">
//       {logoUrl && (
//         <img
//           src={logoUrl}
//           alt={`${name} logo`}
//           className="w-24 h-24 object-contain rounded"
//         />
//       )}

//       <div className="text-center">
//         <h3 className="text-lg font-bold">{name}</h3>
//         <div className="text-yellow-500 text-sm mb-1">
//           {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
//         </div>
//         <p className="text-gray-700 text-sm">☎ {phone}</p>
//         <p className="text-gray-700 text-sm">📧 {email}</p>
//       </div>

//       <div className="w-full mt-2">
        
//       </div>
//     </div>
//   );
// };

// export default DealerCard;


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/DealerCard.jsx



// import logo from '../assets/logo.png'; // ✅ Correct relative path


// const DealerCard = ({ dealer }) => {
//  const {
//    name,
//    phone,
//    email,
//    rating,
//    logoUrl, // Optional fallback, still supported
//  } = dealer;


//  return (
//    <div className="p-6 bg-white rounded-lg shadow-md border flex flex-col items-center space-y-4">
//      {/* ✅ Display imported logo */}
//      <img
//        src={logo}
//        alt={`${name} logo`}
//        className="w-40 h-40 object-contain rounded"
//      />


//      <div className="text-center">
//        <h3 className="text-lg font-bold">{name}</h3>
//        <div className="text-yellow-500 text-sm mb-1">
//          {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
//        </div>
//        <p className="text-gray-700 text-sm">☎ {phone}</p>
//        <p className="text-gray-700 text-sm">📧 {email}</p>
//      </div>
//    </div>
//  );
// };


// export default DealerCard;

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/DealerCard.jsx


// import logoFallback from '../assets/logo.png'; // ✅ Local fallback image

// const DealerCard = ({ dealer }) => {
//   const {
//     name,
//     phone,
//     email,
//     rating = 0,
//     logoUrl, // External logo (from DB or Cloudinary)
//   } = dealer;

//   // ✅ Use external logo if it exists, otherwise fallback to local
//   const logoToDisplay = logoUrl?.startsWith('http') ? logoUrl : logoFallback;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md border flex flex-col items-center space-y-4">
//       <img
//         src={logoToDisplay}
//         alt={`${name} logo`}
//         className="w-32 h-32 object-contain rounded border"
//         onError={(e) => (e.target.src = logoFallback)} // ✅ Handle broken URLs
//       />

//       <div className="text-center">
//         <h3 className="text-lg font-bold">{name}</h3>
//         <div className="text-yellow-500 text-sm mb-1">
//           {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
//         </div>
//         <p className="text-gray-700 text-sm">☎ {phone}</p>
//         <p className="text-gray-700 text-sm">📧 {email}</p>
//       </div>
//     </div>
//   );
// };

// export default DealerCard;


// src/components/DealerCard.jsx
import logoFallback from '../assets/logo.png'; // ✅ Local fallback image

const DealerCard = ({ dealer }) => {
  const {
    name,
    phone,
    email,
    rating = 0,
    logoUrl, // External logo (from DB or Cloudinary)
  } = dealer;

  // ✅ Use external logo if it exists, otherwise fallback to local
  const logoToDisplay = logoUrl?.startsWith('http') ? logoUrl : logoFallback;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border flex flex-col items-center space-y-4 dark:bg-gray-800 dark:border-gray-700">
      <img
        src={logoToDisplay}
        alt={`${name} logo`}
        className="w-32 h-32 object-cover rounded-full border shadow-sm"
        onError={(e) => (e.target.src = logoFallback)} // ✅ Handle broken URLs
      />

      <div className="text-center">
        <h3 className="text-lg font-bold dark:text-white">{name}</h3>
        <div className="text-yellow-500 text-sm mb-1">
          {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">☎ {phone}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm">📧 {email}</p>
      </div>
    </div>
  );
};

export default DealerCard;
