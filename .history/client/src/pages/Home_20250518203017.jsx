//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx


// import { useEffect, useState } from 'react';
// import CarList from '../components/CarList';
// import axios from 'axios';

// const Home = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCars = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get('http://localhost:5001/api/cars');
//         setCars(res.data);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//         setError('❌ Fehler beim Laden der Fahrzeuge.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCars();
//   }, []);

//   return (
    
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
//         🚗 <span className="underline decoration-blue-500">Verfügbare Fahrzeuge</span>
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">⏳ Lade Fahrzeuge...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-500">Keine Fahrzeuge verfügbar.</p>
//       ) : (
//         <CarList cars={cars} />
//       )}
//     </div>
//   );
// };

// export default Home;



// ✅ Home.jsx (NO upload components shown here)
import { useEffect, useState } from 'react';
import CarList from '../components/CarList';
import axios from 'axios';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5001/api/cars');
        setCars(res.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('❌ Fehler beim Laden der Fahrzeuge.');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        🚗 <span className="underline decoration-blue-500">Verfügbare Fahrzeuge</span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">⏳ Lade Fahrzeuge...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-500">Keine Fahrzeuge verfügbar.</p>
      ) : (
        <CarList cars={cars} />
      )}
    </div>
  );
};

export default Home;
