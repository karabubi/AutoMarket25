//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarCard.jsx


// import { Link } from 'react-router-dom';

// const CarCard = ({ car }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//     <img src={car.image_url} alt={car.make} className="w-full h-48 object-cover" />
//     <div className="p-4">
//       <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
//       <p className="text-gray-600 mb-2">${car.price}</p>
//       <Link to={`/car/${car.id}`} className="text-blue-500 hover:underline">
//         View Details
//       </Link>
//     </div>
//   </div>
// );

// export default CarCard;

//-------------------v2 5-5

// import { Link } from 'react-router-dom';

// const CarCard = ({ car }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
//     <img
//       src={car.image_url}
//       alt={`${car.make} ${car.model}`}
//       className="w-full h-48 object-cover"
//       onError={(e) => { e.target.src = '/images/fallback-car.jpg'; }} // fallback image
//     />
//     <div className="p-4">
//       <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
//       <p className="text-gray-600 mb-2">${car.price.toLocaleString()}</p>
//       <Link to={`/car/${car.id}`} className="text-blue-500 hover:underline">
//         View Details
//       </Link>
//     </div>
//   </div>
// );

// export default CarCard;


//--------------------


// import { Link } from 'react-router-dom';

// const CarCard = ({ car }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
//     <img
//       src={car.image_url}
//       alt={`${car.make} ${car.model}`}
//       className="w-full h-48 object-cover"
//       onError={(e) => { e.target.src = '/images/fallback-car.jpg'; }}
//     />
//     <div className="p-4">
//       <h2 className="text-xl font-semibold">{car.make} {car.model} ({car.year})</h2>
//       <p className="text-gray-600 mb-2">${car.price.toLocaleString()}</p>
//       <p className="text-sm text-gray-500 mb-2">{car.description}</p>
//       <Link to={`/car/${car.id}`} className="text-blue-500 hover:underline">
//         View Details
//       </Link>
//     </div>
//   </div>
// );

// export default CarCard;


//--------------

// import { Link } from 'react-router-dom';

// const CarCard = ({ car }) => (
//   <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col overflow-hidden">
//     <img
//       src={car.image_url}
//       alt={`${car.make} ${car.model}`}
//       className="w-full h-52 object-cover"
//     />
//     <div className="p-4 flex flex-col flex-1">
//       <h2 className="text-xl font-semibold mb-1 text-gray-800">
//         {car.make} {car.model}
//       </h2>
//       <p className="text-gray-600 mb-3 text-sm">
//         ${car.price.toLocaleString()}
//       </p>
//       <Link
//         to={`/car/${car.id}`}
//         className="mt-auto inline-block bg-blue-500 text-white text-center px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
//       >
//         View Details
//       </Link>
//     </div>
//   </div>
// );

// export default CarCard;

//------------------v4

// import { Link } from 'react-router-dom';

// const CarCard = ({ car }) => (
//   <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col overflow-hidden">
//     <div className="w-full h-48 overflow-hidden">
//       <img
//         src={car.image_url}
//         alt={`${car.make} ${car.model}`}
//         className="w-full h-full object-cover"
//       />
//     </div>
//     <div className="p-4 flex flex-col flex-1">
//       <h2 className="text-lg font-bold text-gray-800 mb-1">
//         {car.make} {car.model}
//       </h2>
//       <p className="text-gray-600 mb-2 text-sm">
//         ${car.price.toLocaleString()}
//       </p>
//       <Link
//         to={`/car/${car.id}`}
//         className="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
//       >
//         View Details
//       </Link>
//     </div>
//   </div>
// );

// export default CarCard;


//------------------

