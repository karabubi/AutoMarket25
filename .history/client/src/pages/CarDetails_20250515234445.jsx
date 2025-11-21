
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetails.jsx

// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import MultipleImageUpload from '../components/MultipleImageUpload';
// import CarImagesGallery from '../components/CarImagesGallery';
// import axios from 'axios';

// const CarDetails = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/cars/${id}`);
//         setCar(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching car details:', err);
//         setError('Failed to load car details.');
//         setLoading(false);
//       }
//     };

//     fetchCarDetails();
//   }, [id]);

//   if (loading) {
//     return <div className="p-6 text-gray-600">Loading car details...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Car Details</h2>

//       <div className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-2">
//         <p><span className="font-semibold">Make:</span> {car.make}</p>
//         <p><span className="font-semibold">Model:</span> {car.model}</p>
//         <p><span className="font-semibold">Year:</span> {car.year}</p>
//         <p><span className="font-semibold">Price:</span> €{car.price}</p>
//         {car.description && (
//           <p><span className="font-semibold">Description:</span> {car.description}</p>
//         )}
//       </div>

//       <h3 className="text-xl font-semibold mb-2">Upload Images</h3>
//       <MultipleImageUpload carId={id} onUploadComplete={() => window.location.reload()} />

//       <h3 className="text-xl font-semibold mt-6 mb-2">Image Gallery</h3>
//       <CarImagesGallery carId={id} />
//     </div>
//   );
// };

// export default CarDetails;


// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetails.jsx

// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetails.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import MultipleImageUpload from '../components/MultipleImageUpload';
import CarImagesGallery from '../components/CarImagesGallery';
import CarTitle from '../components/CarTitle';
import PriceBox from '../components/PriceBox';
import DealerCard from '../components/DealerCard';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  // Removed unused images state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carRes = await axios.get(`http://localhost:5001/api/cars/${id}`);
        setCar(carRes.data);
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
      {/* 🖼 Gallery View */}
      <CarImagesGallery carId={id} />

      {/* 📄 Car Info */}
      <CarTitle
        title={`${car.make} ${car.model}`}
        subtitle={car.description || ''}
        location={car.location || 'Unbekannt'}
      />

      {/* 💰 Price + Dealer Info */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <PriceBox price={car.price} />
        <DealerCard
          dealer={car.dealer || {
            name: 'MS Automobili Srl',
            phone: '+39 011 01 21 422',
            email: 'info@msautomobili.com',
            rating: 4.5,
            logoUrl: '/dealer-logo.png',
          }}
        />
      </div>

      {/* 📤 Upload */}
      <div>
        <h3 className="text-xl font-semibold mt-10 mb-2">Upload Additional Images</h3>
        <MultipleImageUpload carId={id} onUploadComplete={() => window.location.reload()} />
      </div>
    </div>
  );
};

export default CarDetails;
