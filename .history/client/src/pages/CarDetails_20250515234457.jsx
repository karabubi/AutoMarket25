
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
