
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx

import CarCard from './CarCard';

const CarList = ({ cars }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {cars.map(car => (
      <CarCard key={car.id} car={car} />
    ))}
  </div>
);

export default CarList;


//--------------v2

// import { useEffect, useState } from 'react';

// const CarList = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       const res = await fetch('/api/cars');
//       const data = await res.json();
//       setCars(data);
//     };
//     fetchCars();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {cars.map((car) => (
//         <div key={car.id} className="border rounded p-4 shadow">
//           <img src={car.image_url} alt={car.make} className="w-full h-48 object-cover mb-2 rounded" />
//           <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
//           <p>{car.year} • ${car.price}</p>
//           <p className="text-sm">{car.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarList;


//-------------------v4

// import { useEffect, useState } from 'react';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');

//   const fetchCars = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('/api/cars', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         const message = res.status === 403 ? 'Unauthorized. Please log in.' : 'Failed to load cars';
//         throw new Error(message);
//       }

//       const data = await res.json();
//       setCars(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return (
//     <div className="p-4">
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {cars.map((car) => (
//           <div key={car.id} className="border rounded p-4 shadow">
//             <img src={car.image_url} alt={car.make} className="w-full h-48 object-cover mb-2 rounded" />
//             <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
//             <p>{car.year} • ${car.price}</p>
//             <p className="text-sm">{car.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarList;


//--------------------v4



// import { useEffect, useState } from 'react';

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCars = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please log in to view cars.');
//         return;
//       }

//       try {
//         const res = await fetch('/api/cars', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData.message || 'Failed to load cars');
//         }

//         const data = await res.json();
//         setCars(data);
//       } catch (err) {
//         setError(`❌ ${err.message}`);
//       }
//     };

//     fetchCars();
//   }, []);

//   if (error) return <p className="text-red-500 p-4">{error}</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {cars.map((car) => (
//         <div key={car.id} className="border rounded p-4 shadow">
//           <img src={car.image_url} alt={car.make} className="w-full h-48 object-cover mb-2 rounded" />
//           <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
//           <p>{car.year} • ${car.price}</p>
//           <p className="text-sm">{car.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarList;
