
// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetails.jsx



// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import MultipleImageUpload from '../components/MultipleImageUpload';
// import CarImagesGallery from '../components/CarImagesGallery';
// import CarTitle from '../components/CarTitle';
// import PriceBox from '../components/PriceBox';
// import DealerCard from '../components/DealerCard';

// const CarDetails = () => {
//   const { id } = useParams();
//   const isLoggedIn = !!localStorage.getItem('token');

//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const carRes = await axios.get(`http://localhost:5001/api/cars/${id}`);
//         setCar(carRes.data);
//       } catch (err) {
//         console.error('Error fetching car details:', err);
//         setError('❌ Failed to load car details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarDetails();
//   }, [id]);

//   if (loading) {
//     return <div className="p-6 text-gray-600">Loading car details...</div>;
//   }

//   if (error || !car) {
//     return <div className="p-6 text-red-500">{error || 'Car not found.'}</div>;
//   }

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
//             name: 'MS Automobili Srl',
//             phone: '+39 011 01 21 422',
//             email: 'info@msautomobili.com',
//             rating: 4.5,
//             logoUrl: '/dealer-logo.png',
//           }}
//         />
//       </div>

//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
//         <table className="table-auto w-full text-sm">
//           <tbody>
//             {[
//               ['Mileage (km)', car.mileage],
//               ['Engine Size (L)', car.engine_size],
//               ['Power (kW)', car.power_kw],
//               ['Power (PS)', car.power_hp],
//               ['Drive Type', car.drive_type],
//               ['Fuel Type', car.fuel_type],
//               ['Consumption (L/100km)', car.consumption_combined],
//               ['CO2 Emission (g/km)', car.co2_emission],
//               ['Seats', car.seats],
//               ['Doors', car.doors],
//               ['Transmission', car.transmission],
//               ['Emission Class', car.emission_class],
//               ['First Registration', car.first_registration],
//               ['Climate Control', car.climate_control],
//               ['Color', car.color],
//               ['Interior', car.interior],
//               ['Trailer Weight (Braked)', car.trailer_weight_braked],
//               ['Trailer Weight (Unbraked)', car.trailer_weight_unbraked],
//               ['Weight (kg)', car.weight],
//               ['Cylinders', car.cylinders],
//               ['Tank Size (L)', car.tank_size]
//             ].map(([label, value]) =>
//               value ? (
//                 <tr key={label} className="border-b">
//                   <td className="font-medium py-2 pr-4 text-gray-700">{label}</td>
//                   <td className="py-2 text-gray-900">{value}</td>
//                 </tr>
//               ) : null
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 📤 Upload (Only for logged-in users) */}
//       {isLoggedIn && (
//         <div>
//           <h3 className="text-xl font-semibold mt-10 mb-2">Upload Additional Images</h3>
//           <MultipleImageUpload carId={id} onUploadComplete={() => window.location.reload()} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarDetails;



// /client/src/pages/CarDetails.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CarImagesGallery from '../components/CarImagesGallery';
import CarTitle from '../components/CarTitle';
import PriceBox from '../components/PriceBox';
import DealerCard from '../components/DealerCard';
import MultipleImageUpload from '../components/MultipleImageUpload';

const CarDetails = () => {
  const { id } = useParams();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('❌ Failed to load car details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading car details...</div>;
  }

  if (error || !car) {
    return <div className="p-6 text-red-500">{error || 'Car not found.'}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Car Image Gallery */}
      <CarImagesGallery carId={id} />

      {/* Title and Description */}
      <CarTitle
        title={`${car.make} ${car.model}`}
        subtitle={car.description || ''}
        location={car.location || 'Unbekannt'}
      />

      {/* Price and Dealer Info */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <PriceBox price={car.price} />
        <DealerCard
          dealer={car.dealer || {
            name: 'MS Automarkt25',
            phone: '+39 011 01 21 422',
            email: 'info@msautomobili.com',
            rating: 4.5,
            logoUrl: '/dealer-logo.png',
          }}
        />
      </div>

      {/* Technical Specifications */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
        <table className="table-auto w-full text-sm">
          <tbody>
            {[
              ['Mileage (km)', car.mileage],
              ['Engine Size (L)', car.engine_size],
              ['Power (kW)', car.power_kw],
              ['Power (PS)', car.power_hp],
              ['Drive Type', car.drive_type],
              ['Fuel Type', car.fuel_type],
              ['Consumption (L/100km)', car.consumption_combined],
              ['CO2 Emission (g/km)', car.co2_emission],
              ['Seats', car.seats],
              ['Doors', car.doors],
              ['Transmission', car.transmission],
              ['Emission Class', car.emission_class],
              ['First Registration', car.first_registration],
              ['Climate Control', car.climate_control],
              ['Color', car.color],
              ['Interior', car.interior],
              ['Trailer Weight (Braked)', car.trailer_weight_braked],
              ['Trailer Weight (Unbraked)', car.trailer_weight_unbraked],
              ['Weight (kg)', car.weight],
              ['Cylinders', car.cylinders],
              ['Tank Size (L)', car.tank_size],
            ].map(([label, value]) =>
              value ? (
                <tr key={label} className="border-b">
                  <td className="font-medium py-2 pr-4 text-gray-700">{label}</td>
                  <td className="py-2 text-gray-900">{value}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Additional Images - Only visible when logged in */}
      {isLoggedIn && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Upload Additional Images</h3>
          <MultipleImageUpload carId={id} onUploadComplete={() => window.location.reload()} />
        </div>
      )}
    </div>
  );
};

export default CarDetails;
