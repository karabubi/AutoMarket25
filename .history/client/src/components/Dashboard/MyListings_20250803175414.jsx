
// //Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Dashboard/MyListings.jsx
// import { useEffect, useState } from 'react';
// import { fetchMyCars } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const MyListings = () => {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();

//   useEffect(() => {
//     const loadCars = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError(t('myListings.loginRequired'));
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetchMyCars(token);
//         setCars(res.data);
//       } catch (err) {
//         console.error('❌ Error loading cars:', err);
//         setError(t('myListings.loadError'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [t]);

//   if (loading) return <p className="text-center mt-10 text-gray-600">⏳ {t('myListings.loading')}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📋 {t('myListings.title')}</h2>
//       {error && <p className="text-center text-red-500 mb-4">{error}</p>}
//       {cars.length === 0 ? (
//         <p className="text-center text-gray-500">{t('myListings.empty')}</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => (
//             <div key={car.id} className="bg-white shadow rounded-2xl p-4 flex flex-col">
//               <img
//                 src={car.image_url || (car.images && car.images[0]?.image_url) || '/placeholder-car.jpg'}
//                 alt={`${car.make} ${car.model}`}
//                 className="w-full h-40 object-cover rounded mb-3"
//               />
//               <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
//               <p className="text-gray-600 text-sm">{t('myListings.year')}: {car.year}</p>
//               <p className="text-gray-600 text-sm">{t('myListings.price')}: €{car.price.toLocaleString()}</p>
//               <p className="text-sm text-gray-500 mt-2 line-clamp-2">{car.description}</p>
//               <Link
//                 to={`/car/${car.id}`}
//                 className="mt-auto text-blue-600 text-sm hover:underline pt-3"
//               >
//                 {t('myListings.viewDetails')}
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyListings;

