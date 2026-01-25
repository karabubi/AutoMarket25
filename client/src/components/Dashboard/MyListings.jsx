
// //Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Dashboard/MyListings.jsx

// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const MyListings = () => {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const loadCars = async () => {
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
//   }, [t, token]);

//   const handleDeleteCar = async (carId) => {
//     if (!window.confirm(t('myListings.confirmDeleteCar'))) return;

//     try {
//       await deleteCar(carId, token);
//       setCars(cars.filter(car => car.id !== carId));
//     } catch (err) {
//       console.error('❌ Error deleting car:', err);
//       setError(t('myListings.deleteCarError'));
//     }
//   };

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
//               <button
//                 onClick={() => handleDeleteCar(car.id)}
//                 className="mt-2 bg-red-500 text-white rounded py-2 hover:bg-red-600 transition-colors"
//               >
//                 {t('myListings.deleteCar')}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyListings;



// /client/src/components/Dashboard/MyListings.jsx

// import { useEffect, useMemo, useState } from "react";
// import { fetchMyCars, deleteCar } from "../../utils/api";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const MyListings = () => {
//   const { t } = useTranslation();

//   const token = useMemo(() => localStorage.getItem("token"), []);
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const loadCars = async () => {
//       setLoading(true);
//       setError("");

//       if (!token) {
//         if (isMounted) {
//           setError(t("myListings.loginRequired"));
//           setLoading(false);
//         }
//         return;
//       }

//       try {
//         const res = await fetchMyCars(token);

//         // Ensure we always set an array
//         const data = Array.isArray(res.data) ? res.data : [];
//         if (isMounted) setCars(data);
//       } catch (err) {
//         console.error("❌ Error loading my cars:", err);

//         // Better error messages
//         const status = err?.response?.status;
//         const apiMsg = err?.response?.data?.message || err?.response?.data?.error;

//         if (status === 401 || status === 403) {
//           // token expired / invalid
//           localStorage.removeItem("token");
//           if (isMounted) {
//             setError(t("myListings.loginRequired"));
//           }
//         } else {
//           if (isMounted) {
//             setError(apiMsg || t("myListings.loadError"));
//           }
//         }
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     loadCars();

//     return () => {
//       isMounted = false;
//     };
//   }, [t, token]);

//   const handleDeleteCar = async (carId) => {
//     if (!token) {
//       setError(t("myListings.loginRequired"));
//       return;
//     }

//     if (!window.confirm(t("myListings.confirmDeleteCar"))) return;

//     try {
//       await deleteCar(carId, token);
//       setCars((prev) => prev.filter((car) => car.id !== carId));
//     } catch (err) {
//       console.error("❌ Error deleting car:", err);
//       const apiMsg = err?.response?.data?.message || err?.response?.data?.error;
//       setError(apiMsg || t("myListings.deleteCarError"));
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center mt-10 text-gray-600">
//         ⏳ {t("myListings.loading")}
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         📋 {t("myListings.title")}
//       </h2>

//       {error && <p className="text-center text-red-500 mb-4">{error}</p>}

//       {!error && cars.length === 0 ? (
//         <p className="text-center text-gray-500">{t("myListings.empty")}</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => {
//             const image =
//               car.image_url ||
//               (Array.isArray(car.images) ? car.images?.[0]?.image_url : null) ||
//               "/placeholder-car.jpg";

//             return (
//               <div
//                 key={car.id}
//                 className="bg-white shadow rounded-2xl p-4 flex flex-col"
//               >
//                 <img
//                   src={image}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />

//                 <h3 className="text-xl font-semibold">
//                   {car.make} {car.model}
//                 </h3>

//                 <p className="text-gray-600 text-sm">
//                   {t("myListings.year")}: {car.year}
//                 </p>

//                 <p className="text-gray-600 text-sm">
//                   {t("myListings.price")}: €{Number(car.price || 0).toLocaleString()}
//                 </p>

//                 <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                   {car.description || ""}
//                 </p>

//                 <Link
//                   to={`/car/${car.id}`}
//                   className="mt-auto text-blue-600 text-sm hover:underline pt-3"
//                 >
//                   {t("myListings.viewDetails")}
//                 </Link>

//                 <button
//                   onClick={() => handleDeleteCar(car.id)}
//                   className="mt-2 bg-red-500 text-white rounded py-2 hover:bg-red-600 transition-colors"
//                 >
//                   {t("myListings.deleteCar")}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyListings;



// client/src/components/Dashboard/MyListings.jsx
import { useEffect, useState } from "react";
import { fetchMyCars, deleteCar } from "../../utils/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyListings = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      setError("");

      if (!token) {
        setError(t("myListings.loginRequired"));
        setLoading(false);
        return;
      }

      try {
        const res = await fetchMyCars(token);
        setCars(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        const apiMsg = err?.response?.data?.message || err?.response?.data?.error;
        console.error("❌ Error loading cars:", err);
        setError(apiMsg || t("myListings.loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [t, token]);

  const handleDeleteCar = async (carId) => {
    if (!window.confirm(t("myListings.confirmDeleteCar"))) return;

    try {
      await deleteCar(carId, token);
      setCars((prev) => prev.filter((c) => c.id !== carId));
    } catch (err) {
      const apiMsg = err?.response?.data?.message;
      console.error("❌ Error deleting car:", err);
      setError(apiMsg || t("myListings.deleteCarError"));
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">⏳ {t("myListings.loading")}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📋 {t("myListings.title")}</h2>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {cars.length === 0 ? (
        <p className="text-center text-gray-500">{t("myListings.empty")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white shadow rounded-2xl p-4 flex flex-col">
              <img
                src={car.image_url || car.images?.[0]?.image_url || "/placeholder-car.jpg"}
                alt={`${car.make} ${car.model}`}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
              <p className="text-gray-600 text-sm">{t("myListings.year")}: {car.year}</p>
              <p className="text-gray-600 text-sm">{t("myListings.price")}: €{Number(car.price || 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{car.description}</p>

              <Link to={`/car/${car.id}`} className="mt-auto text-blue-600 text-sm hover:underline pt-3">
                {t("myListings.viewDetails")}
              </Link>

              <button
                onClick={() => handleDeleteCar(car.id)}
                className="mt-2 bg-red-500 text-white rounded py-2 hover:bg-red-600 transition-colors"
              >
                {t("myListings.deleteCar")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
