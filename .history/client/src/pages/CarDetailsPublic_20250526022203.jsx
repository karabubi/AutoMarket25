//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetailsPublic.jsx

// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import CarImagesGallery from '../components/CarImagesGallery';
// import CarTitle from '../components/CarTitle';
// import PriceBox from '../components/PriceBox';
// import DealerCard from '../components/DealerCard';

// const CarDetailsPublic = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/cars/${id}`);
//         setCar(response.data);
//       } catch (err) {
//         console.error('Error fetching car details:', err);
//         setError('❌ Failed to load car details.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCarDetails();
//   }, [id]);

//   if (loading) return <div className="p-6 text-gray-600">Loading car details...</div>;
//   if (error || !car) return <div className="p-6 text-red-500">{error || 'Car not found.'}</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">
//       <CarImagesGallery carId={id} />
//       <CarTitle
//         title={`${car.make} ${car.model}`}
//         subtitle={car.description || ''}
//         location={car.location || 'Unbekannt'}
//       />
//       <div className="grid md:grid-cols-2 gap-6 mt-6">
//         <PriceBox price={car.price} />
//         <DealerCard
//           dealer={car.dealer || {
//             name: 'Automarkt25',
//             phone: '+4917655105979',
//             email: 'karabubi66@yahoo.com',
//             rating: 4.5,
//             logoUrl: '/logo.png',
//           }}
//         />
//       </div>
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
//         <table className="table-auto w-full text-sm">
//           <tbody>
//             {[['Mileage (km)', car.mileage], ['Engine Size (L)', car.engine_size], ['Power (kW)', car.power_kw], ['Power (PS)', car.power_hp], ['Drive Type', car.drive_type], ['Fuel Type', car.fuel_type], ['Consumption (L/100km)', car.consumption_combined], ['CO2 Emission (g/km)', car.co2_emission], ['Seats', car.seats], ['Doors', car.doors], ['Transmission', car.transmission], ['Emission Class', car.emission_class], ['First Registration', car.first_registration], ['Climate Control', car.climate_control], ['Color', car.color], ['Interior', car.interior], ['Trailer Weight (Braked)', car.trailer_weight_braked], ['Trailer Weight (Unbraked)', car.trailer_weight_unbraked], ['Weight (kg)', car.weight], ['Cylinders', car.cylinders], ['Tank Size (L)', car.tank_size]]
//               .map(([label, value]) =>
//                 value ? (
//                   <tr key={label} className="border-b">
//                     <td className="font-medium py-2 pr-4 text-gray-700">{label}</td>
//                     <td className="py-2 text-gray-900">{value}</td>
//                   </tr>
//                 ) : null
//               )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CarDetailsPublic;


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetailsPublic.jsx

// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';

// import CarImagesGallery from '../components/CarImagesGallery';
// import CarTitle from '../components/CarTitle';
// import PriceBox from '../components/PriceBox';
// import DealerCard from '../components/DealerCard';

// const CarDetailsPublic = () => {
//   const { id } = useParams();
//   const { t } = useTranslation();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/cars/${id}`);
//         setCar(response.data);
//       } catch (err) {
//         console.error('Error fetching car details:', err);
//         setError(t('carDetails.loadError'));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCarDetails();
//   }, [id, t]);

//   if (loading) return <div className="p-6 text-gray-600">{t('carDetails.loading')}</div>;
//   if (error || !car) return <div className="p-6 text-red-500">{error || t('carDetails.notFound')}</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">
//       <CarImagesGallery carId={id} />
//       <CarTitle
//         title={`${car.make} ${car.model}`}
//         subtitle={car.description || ''}
//         location={car.location || t('carDetails.unknownLocation')}
//       />
//       <div className="grid md:grid-cols-2 gap-6 mt-6">
//         <PriceBox price={car.price} />
//         <DealerCard
//           dealer={car.dealer || {
//             name: 'AutoMarkt25',
//             phone: '+4917655105979',
//             email: 'karabubi66@yahoo.com',
//             rating: 4.5,
//             logoUrl: '/logo.png',
//           }}
//         />
//       </div>

//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">{t('carDetails.specsTitle')}</h3>
//         <table className="table-auto w-full text-sm">
//           <tbody>
//             {[
//               ['mileage', car.mileage],
//               ['engineSize', car.engine_size],
//               ['powerKW', car.power_kw],
//               ['powerHP', car.power_hp],
//               ['driveType', car.drive_type],
//               ['fuelType', car.fuel_type],
//               ['consumption', car.consumption_combined],
//               ['co2', car.co2_emission],
//               ['seats', car.seats],
//               ['doors', car.doors],
//               ['transmission', car.transmission],
//               ['emissionClass', car.emission_class],
//               ['firstRegistration', car.first_registration],
//               ['climateControl', car.climate_control],
//               ['color', car.color],
//               ['interior', car.interior],
//               ['trailerWeightBraked', car.trailer_weight_braked],
//               ['trailerWeightUnbraked', car.trailer_weight_unbraked],
//               ['weight', car.weight],
//               ['cylinders', car.cylinders],
//               ['tankSize', car.tank_size],
//             ].map(([key, value]) =>
//               value ? (
//                 <tr key={key} className="border-b">
//                   <td className="font-medium py-2 pr-4 text-gray-700">{t(`carDetails.${key}`)}</td>
//                   <td className="py-2 text-gray-900">{value}</td>
//                 </tr>
//               ) : null
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CarDetailsPublic;


// email