
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



import logo from '../assets/logo.png'; // ✅ Local fallback logo

const DealerCard = ({ dealer }) => {
  const {
    name,
    phone,
    email,
    rating = 0,
    logoUrl, // Optional custom dealer logo URL
  } = dealer;

  // ✅ Use logoUrl if it exists, otherwise fallback to local logo
  const displayedLogo = logoUrl && logoUrl.trim() !== '' ? logoUrl : logo;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border flex flex-col items-center space-y-4">
      <img
        src={displayedLogo}
        alt={`${name} logo`}
        className="w-40 h-40 object-contain rounded border"
      />

      <div className="text-center">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="text-yellow-500 text-sm mb-1">
          {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
        </div>
        <p className="text-gray-700 text-sm">☎ {phone}</p>
        <p className="text-gray-700 text-sm">📧 {email}</p>
      </div>
    </div>
  );
};

export default DealerCard;

