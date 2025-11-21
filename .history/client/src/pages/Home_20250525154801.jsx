

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import CarList from '../components/CarList';
// import CarDetailsPublic from './CarDetailsPublic'; // ✅ Imported in case needed later

// const Home = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/cars');
//         setCars(response.data);
//       } catch (err) {
//         console.error('Error fetching cars:', err);
//         setError('❌ Fehler beim Laden der Fahrzeuge.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
//         🚗 <span className="underline decoration-blue-500">Verfügbare Fahrzeuge</span>
//       </h1>

//       {loading && (
//         <p className="text-center text-gray-500 text-lg">⏳ Lade Fahrzeuge...</p>
//       )}

//       {error && (
//         <p className="text-center text-red-500 text-lg">{error}</p>
//       )}

//       {!loading && !error && cars.length === 0 && (
//         <p className="text-center text-gray-500 text-lg">Keine Fahrzeuge verfügbar.</p>
//       )}

//       {!loading && !error && cars.length > 0 && (
//         <CarList cars={cars} publicView={true} />
//       )}
//     </div>
//   );
// };

// export default Home;



// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx
// client/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCars } from '../utils/api';

function Home() {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available cars on mount
  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
      } catch (err) {
        setError(err.message || 'Error fetching cars');
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  if (loading) {
    return <div>{t('home.loading')}</div>;
  }

  if (error) {
    return <div>{t('home.error')}</div>;
  }

  if (!cars || cars.length === 0) {
    return <div>{t('home.noCarsAvailable')}</div>;
  }

  return (
    <div>
      <h1>{t('home.availableCars')}</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {/* Example fields; adjust based on actual car object */}
            {car.make} {car.model} ({car.year}) - ${car.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
