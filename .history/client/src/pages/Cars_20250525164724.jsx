


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Cars.jsx


// import { useEffect, useState } from 'react';
// import CarList from '../components/CarList';
// import { fetchCars } from '../utils/api';

// const Cars = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('');
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     const loadCars = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchCars(filter ? { tag: filter } : {});
//         const allCars = response.data;
//         const filtered = search
//           ? allCars.filter((car) =>
//               `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase())
//             )
//           : allCars;
//         setCars(filtered);
//       } catch (err) {
//         console.error('Failed to fetch cars:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [filter, search]);

//   return (
//     <div className="max-w-7xl mx-auto pt-10">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🚗 Alle Fahrzeuge</h1>

//       {/* Filter & Suche */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 px-4">
//         <div className="flex gap-2">
//           {['ALL', 'NEW', 'SOLD'].map((tag) => (
//             <button
//               key={tag}
//               onClick={() => setFilter(tag === 'ALL' ? '' : tag)}
//               className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors duration-200 ${
//                 filter === tag || (tag === 'ALL' && !filter)
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//               }`}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>

//         <input
//           type="text"
//           placeholder="🔍 Suche nach Marke oder Modell"
//           className="mt-3 md:mt-0 px-4 py-2 border rounded-md w-full max-w-sm shadow-sm"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-600">⏳ Lade Fahrzeuge...</p>
//       ) : (
//         <CarList cars={cars} />
//       )}
//     </div>
//   );
// };

// export default Cars;

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Cars.jsx

// import { useEffect, useState } from 'react';
// import CarList from '../components/CarList';
// import CarFilter from '../components/CarFilter';
// import { fetchCars } from '../utils/api';

// const Cars = () => {
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
//         console.error('Failed to fetch cars:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [filters]);

//   return (
//     <div className="max-w-7xl mx-auto pt-10 px-4">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🚗 Alle Fahrzeuge</h1>
//       <CarFilter onFilterChange={setFilters} />
//       {loading ? (
//         <p className="text-center text-gray-600 mt-6">⏳ Lade Fahrzeuge...</p>
//       ) : (
//         <CarList cars={cars} />
//       )}
//     </div>
//   );
// };

// export default Cars;



// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Cars.jsx

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CarList from '../components/CarList';
import CarFilter from '../components/CarFilter';
import { fetchCars } from '../utils/api';

const Cars = () => {
  const { t } = useTranslation();
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
        console.error('❌ Failed to fetch cars:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🚗 {t('cars.title')}
      </h1>

      <CarFilter onFilterChange={setFilters} />

      {loading ? (
        <p className="text-center text-gray-600 mt-6">
          ⏳ {t('cars.loading', 'Loading cars...')}
        </p>
      ) : (
        <>
          {cars.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">
              {t('cars.noResults', 'No cars available')}
            </p>
          ) : (
            <CarList cars={cars} />
          )}
        </>
      )}
    </div>
  );
};

export default Cars;
