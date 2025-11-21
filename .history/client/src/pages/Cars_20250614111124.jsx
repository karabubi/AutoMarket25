


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Cars.jsx

import { useEffect, useState } from 'react';
import CarList from '../components/CarList';
import CarFilter from '../components/CarFilter';
import { fetchCars } from '../utils/api';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const response = await fetchCars(filters);
        const allCars = response.data;

        const filtered = filters.search
          ? allCars.filter((car) =>
              `${car.make} ${car.model}`.toLowerCase().includes(filters.search.toLowerCase())
            )
          : allCars;

        setCars(filtered);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🚗 Alle Fahrzeuge</h1>
      <CarFilter onFilterChange={setFilters} />
      {loading ? (
        <p className="text-center text-gray-600 mt-6">⏳ Lade Fahrzeuge...</p>
      ) : (
        <CarList cars={cars} />
      )}
    </div>
  );
};

export default Cars;



// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Cars.jsx

// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import CarList from '../components/CarList';
// import CarFilter from '../components/CarFilter';
// import { fetchCars } from '../utils/api';

// const Cars = () => {
//   const { t } = useTranslation();
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     const loadCars = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchCars(filters);
//         const allCars = response.data;

//         const filtered = filters.search
//           ? allCars.filter((car) =>
//               `${car.make} ${car.model}`.toLowerCase().includes(filters.search.toLowerCase())
//             )
//           : allCars;

//         setCars(filtered);
//       } catch (err) {
//         console.error('❌ Failed to fetch cars:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [filters]);

//   return (
//     <div className="max-w-7xl mx-auto pt-10 px-4">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         🚗 {t('cars.title')}
//       </h1>

//       <CarFilter onFilterChange={setFilters} />

//       {loading ? (
//         <p className="text-center text-gray-600 mt-6">
//           ⏳ {t('cars.loading', 'Loading cars...')}
//         </p>
//       ) : (
//         <>
//           {cars.length === 0 ? (
//             <p className="text-center text-gray-500 mt-6">
//               {t('cars.noResults', 'No cars available')}
//             </p>
//           ) : (
//             <CarList cars={cars} />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Cars;
