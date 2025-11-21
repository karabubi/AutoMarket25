
Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Dashboard/settings.jsx

import { useEffect, useState } from 'react';
import { fetchMyCars, deleteCar } from '../../utils/api';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCars = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('❌ Please log in to view your cars.');

    try {
      const res = await fetchMyCars(token);
      setCars(res.data);
    } catch (err) {
      console.error('❌ Error fetching user cars:', err);
      setError('❌ Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Not authenticated');
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      await deleteCar(id, token);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('❌ Failed to delete car.');
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (cars.length === 0) return <p className="text-center mt-10">You have no car listings yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">⚙️ My Car Settings</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded shadow">
            <img src={car.image_url} alt="car" className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
            <p className="text-sm text-gray-600 mb-2">€{car.price}</p>
            <div className="flex justify-between">
              <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
              <button onClick={() => handleDelete(car.id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;


//---------update. 


//

// import { useEffect, useState } from 'react';
// import {
//   fetchMyCars,
//   fetchAllCarsAdmin,
//   deleteCar,
//   deleteAllCars,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   // Fetch either all cars (admin) or user's cars
//   const loadCars = async () => {
//     if (!token) {
//       setError('❌ Please log in to view your cars.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = isAdmin
//         ? await fetchAllCarsAdmin(token)
//         : await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('❌ Error loading cars:', err);
//       setError('❌ Failed to load car listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!isAdmin) {
//       setInfoMessage('❌ Only admins can delete all cars.');
//       return;
//     }

//     if (!window.confirm('⚠️ Are you sure you want to delete ALL cars?')) return;

//     try {
//       await deleteAllCars(token);
//       setCars([]);
//       setInfoMessage('✅ All cars have been deleted.');
//     } catch (err) {
//       console.error('❌ Failed to delete all cars:', err);
//       setInfoMessage('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         {isAdmin ? '👑 Admin Car Settings' : '⚙️ My Car Settings'}
//       </h1>

//       {infoMessage && (
//         <div className="text-center text-yellow-800 bg-yellow-100 px-4 py-2 rounded mb-4 text-sm">
//           {infoMessage}
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             className="accent-blue-600"
//             checked={showArchived}
//             onChange={() => setShowArchived(!showArchived)}
//           />
//           Show archived/sold cars
//         </label>

//         {isAdmin && (
//           <button
//             onClick={handleDeleteAll}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//           >
//             🗑️ Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading cars...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-600">No car listings found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition hover:shadow-lg"
//               >
//                 <img
//                   src={car.image_url}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                   €{car.price}
//                 </p>
//                 {isAdmin && (
//                   <p className="text-xs text-gray-400 italic mb-2">
//                     Owner ID: {car.user_id}
//                   </p>
//                 )}
//                 <div className="flex justify-between">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     ✏️ Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;

///






// import { useEffect, useState } from 'react';
// import {
//   fetchMyCars,
//   fetchAllCarsAdmin,
//   deleteCar,
//   deleteAllCars,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null); // 'all' or car.id

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const loadCars = async () => {
//     if (!token) {
//       setError('❌ Please log in to view your cars.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = isAdmin
//         ? await fetchAllCarsAdmin(token)
//         : await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('❌ Error loading cars:', err);
//       setError('❌ Failed to load car listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = (target) => {
//     setDeleteTarget(target); // car.id or 'all'
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted.');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars((prev) => prev.filter((car) => car.id !== deleteTarget));
//       }
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       setInfoMessage('❌ Failed to delete.');
//     }
//     setDeleteTarget(null);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         {isAdmin ? '👑 Admin Car Settings' : '⚙️ My Car Settings'}
//       </h1>

//       {infoMessage && (
//         <div className="text-center text-yellow-800 bg-yellow-100 px-4 py-2 rounded mb-4 text-sm">
//           {infoMessage}
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             className="accent-blue-600"
//             checked={showArchived}
//             onChange={() => setShowArchived(!showArchived)}
//           />
//           Show archived/sold cars
//         </label>

//         {isAdmin && (
//           <button
//             onClick={() => confirmDelete('all')}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//           >
//             🗑️ Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading cars...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-600">No car listings found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={
//                     car.image_url ||
//                     (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                   }
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                   €{Number(car.price).toLocaleString('en-DE', {
//                     minimumFractionDigits: 2,
//                   })}
//                 </p>
//                 {isAdmin && car.user_name && (
//                   <p className="text-xs text-gray-400 italic mb-2">
//                     Owner: {car.user_name}
//                   </p>
//                 )}
//                 <div className="flex justify-between">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     ✏️ Edit
//                   </Link>
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
//               Confirm Deletion
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
//               Are you sure you want to delete{' '}
//               {deleteTarget === 'all' ? 'ALL cars?' : 'this car?'}
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirmed}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;











// import { useEffect, useState } from 'react';
// import {
//   fetchMyCars,
//   fetchAllCarsAdmin,
//   deleteCar,
//   deleteAllCars,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');
//     try {
//       const res = isAdmin
//         ? await fetchAllCarsAdmin(token)
//         : await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('❌ Error fetching cars:', err);
//       setError('❌ Failed to load listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;
//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!isAdmin) {
//       setInfoMessage('❌ Only admins can delete all cars.');
//       return;
//     }

//     if (!window.confirm('⚠️ Are you sure you want to delete ALL cars?')) return;

//     try {
//       await deleteAllCars(token);
//       setCars([]);
//       setInfoMessage('✅ All cars have been deleted.');
//     } catch (err) {
//       console.error('❌ Delete all error:', err);
//       setInfoMessage('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         ⚙️ {isAdmin ? 'Admin' : 'My'} Car Settings
//       </h1>

//       {infoMessage && (
//         <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded mb-4 text-center">
//           {infoMessage}
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             className="accent-blue-600"
//             checked={showArchived}
//             onChange={() => setShowArchived(!showArchived)}
//           />
//           Show archived/sold cars
//         </label>

//         {isAdmin && (
//           <button
//             onClick={handleDeleteAll}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
//           >
//             🗑️ Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading cars...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-600">No car listings found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={car.image_url}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
//                   €{car.price}
//                 </p>
//                 <div className="flex justify-between">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     ✏️ Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;



// import { useEffect, useState } from 'react';
// import {
//   fetchMyCars,
//   fetchAllCarsAdmin,
//   deleteCar,
//   deleteAllCars,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');
//     try {
//       const res = isAdmin
//         ? await fetchAllCarsAdmin(token)
//         : await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('❌ Error fetching cars:', err);
//       setError('❌ Failed to load listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;
//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!isAdmin) {
//       setInfoMessage('❌ Only admins can delete all cars.');
//       return;
//     }

//     if (!window.confirm('⚠️ Are you sure you want to delete ALL cars?')) return;

//     try {
//       await deleteAllCars(token);
//       setCars([]);
//       setInfoMessage('✅ All cars have been deleted.');
//     } catch (err) {
//       console.error('❌ Delete all error:', err);
//       setInfoMessage('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         ⚙️ {isAdmin ? 'Admin' : 'My'} Car Settings
//       </h1>

//       {infoMessage && (
//         <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded mb-4 text-center">
//           {infoMessage}
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             className="accent-blue-600"
//             checked={showArchived}
//             onChange={() => setShowArchived(!showArchived)}
//           />
//           Show archived/sold cars
//         </label>

//         {isAdmin && (
//           <button
//             onClick={handleDeleteAll}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
//           >
//             🗑️ Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading cars...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-600">No car listings found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={car.image_url}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
//                   €{car.price}
//                 </p>
//                 <div className="flex justify-between">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     ✏️ Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;




// import { useEffect, useState } from 'react';
// import {
//   fetchMyCars,
//   deleteCar,
//   deleteAllCars,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   // Load cars
//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');
//     try {
//       const res = await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('❌ Error fetching cars:', err);
//       setError('❌ Failed to load your listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete single car
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   // Admin delete all cars
//   const handleDeleteAll = async () => {
//     if (!isAdmin) {
//       setInfoMessage('❌ Only admins can delete all cars.');
//       return;
//     }

//     if (!window.confirm('⚠️ Are you sure you want to delete ALL cars? This action is irreversible.')) return;

//     try {
//       await deleteAllCars(token);
//       setCars([]);
//       setInfoMessage('✅ All cars have been deleted successfully.');
//     } catch (err) {
//       console.error('❌ Delete all error:', err);
//       setInfoMessage('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">⚙️ My Car Settings</h1>

//       {infoMessage && (
//         <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded mb-4 text-center">
//           {infoMessage}
//         </div>
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             className="accent-blue-600"
//             checked={showArchived}
//             onChange={() => setShowArchived(!showArchived)}
//           />
//           Show archived/sold cars
//         </label>

//         {isAdmin && (
//           <button
//             onClick={handleDeleteAll}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
//           >
//             🗑️ Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading cars...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-600">You have no car listings yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={car.image_url}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                   {car.make} {car.model}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">€{car.price}</p>
//                 <div className="flex justify-between">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     ✏️ Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;


// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar, deleteAllCars } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [adminMessage, setAdminMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);

//   useEffect(() => {
//     const loadCars = async () => {
//       if (!token) return setError('❌ Please log in to view your cars.');
//       try {
//         const res = await fetchMyCars(token);
//         setCars(res.data || []);
//       } catch (err) {
//         console.error('❌ Error fetching cars:', err);
//         setError('Failed to load your listings.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCars();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;
//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Error deleting car:', err);
//       alert('Failed to delete car.');
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!isAdmin) {
//       setAdminMessage('❌ Only admins have the privilege to delete all cars.');
//       return;
//     }

//     if (!window.confirm('⚠️ Are you sure you want to delete ALL cars? This cannot be undone.')) return;

//     try {
//       await deleteAllCars(token);
//       setCars([]);
//       setAdminMessage('✅ All cars have been successfully deleted.');
//     } catch (err) {
//       console.error('❌ Failed to delete all cars:', err);
//       setAdminMessage('❌ Failed to delete all cars.');
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">⚙️ My Car Settings</h1>

//       {adminMessage && (
//         <div className="mb-4 text-center text-sm bg-yellow-100 text-yellow-800 px-4 py-2 rounded">
//           {adminMessage}
//         </div>
//       )}

//       <div className="flex items-center justify-between mb-4">
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             className="accent-blue-500"
//             checked={showArchived}
//             onChange={() => setShowArchived(!showArchived)}
//           />
//           Show archived/sold cars
//         </label>

//         {isAdmin && (
//           <button
//             onClick={handleDeleteAll}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded transition"
//           >
//             🗑️ Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading cars...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : cars.length === 0 ? (
//         <p className="text-center text-gray-600">No car listings available.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
//                 <img
//                   src={car.image_url}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{car.make} {car.model}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">€{car.price}</p>
//                 <div className="flex justify-between">
//                   <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">✏️ Edit</Link>
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;




// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar, deleteAllCars } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'; // Must be defined

// const Settings = () => {
//   const { user } = useAuth();
//   const isAdmin = user?.isAdmin || false;
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showArchived, setShowArchived] = useState(false);
//   const [adminMessage, setAdminMessage] = useState('');

//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');
//     try {
//       const res = await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('❌ Error fetching user cars:', err);
//       setError('❌ Failed to load your listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!token) return alert('Not authenticated');
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!isAdmin) {
//       setAdminMessage('❌ Only admins have the privilege to delete all cars.');
//       return;
//     }

//     if (!window.confirm('⚠️ Are you sure you want to delete ALL cars from the database? This action is irreversible.')) return;

//     try {
//       await deleteAllCars(token);
//       setCars([]);
//       setAdminMessage('✅ All cars have been deleted successfully.');
//     } catch (err) {
//       console.error('❌ Delete all cars error:', err);
//       setAdminMessage('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">⚙️ My Car Listings</h2>

//       {adminMessage && (
//         <div className="mb-4 text-center text-sm px-4 py-2 rounded bg-yellow-100 text-yellow-800">
//           {adminMessage}
//         </div>
//       )}

//       {loading && <p className="text-center text-gray-500">Loading your cars...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}
//       {!loading && cars.length === 0 && <p className="text-center text-gray-600">You have no car listings yet.</p>}

//       {!loading && cars.length > 0 && (
//         <>
//           <div className="flex items-center justify-between mb-4">
//             <label className="flex items-center space-x-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={showArchived}
//                 onChange={() => setShowArchived(!showArchived)}
//                 className="form-checkbox accent-blue-600"
//               />
//               <span>Show archived/sold cars</span>
//             </label>

//             {isAdmin && (
//               <button
//                 onClick={handleDeleteAll}
//                 className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition"
//               >
//                 🗑️ Delete All Cars
//               </button>
//             )}
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cars
//               .filter((car) => showArchived || !car.isArchived)
//               .map((car) => (
//                 <div key={car.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">
//                   <img
//                     src={car.image_url}
//                     alt={`${car.make} ${car.model}`}
//                     className="w-full h-40 object-cover rounded mb-3"
//                   />
//                   <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{car.make} {car.model}</h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">€{car.price}</p>
//                   <div className="flex justify-between">
//                     <Link
//                       to={`/edit/${car.id}`}
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       ✏️ Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(car.id)}
//                       className="text-red-500 hover:text-red-700 text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Settings;









// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteAllCars } from '../../utils/api';
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// const Settings = () => {
//   const [cars, setCars] = useState([]); // ✅ start with empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showSold, setShowSold] = useState(false);
//   const { user } = useAuth();

//   // ✅ Load cars from API
//   const loadCars = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('❌ Please log in to view your cars.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetchMyCars(token);
//       const data = res.data;

//       if (Array.isArray(data)) {
//         setCars(data);
//       } else {
//         setCars([]);
//         console.warn('⚠️ Unexpected response format:', data);
//       }

//       setError('');
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('❌ Failed to fetch your cars.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Admin delete all
//   const handleDeleteAllCars = async () => {
//     if (!window.confirm('Are you sure you want to delete ALL cars?')) return;

//     try {
//       await deleteAllCars(user.token);
//       toast.success('✅ All cars deleted successfully.');
//       setCars([]);
//     } catch (err) {
//       console.error('❌ Delete all error:', err);
//       toast.error('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   // ✅ Filter logic for sold toggle
//   const filteredCars = cars.filter(car =>
//     showSold ? car.status === 'sold' : car.status !== 'sold'
//   );

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold">My Cars</h2>
//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             checked={showSold}
//             onChange={() => setShowSold(!showSold)}
//             className="form-checkbox text-green-600"
//           />
//           <span>Show Sold Cars</span>
//         </label>
//       </div>

//       {/* ✅ Admin Delete All Button */}
//       {user?.isAdmin && (
//         <div className="mb-6">
//           <button
//             onClick={handleDeleteAllCars}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
//           >
//             🗑️ Delete All Cars
//           </button>
//         </div>
//       )}

//       {/* ✅ Cars Listing */}
//       {filteredCars.length === 0 ? (
//         <p className="text-center text-gray-500">No cars found.</p>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {filteredCars.map((car) => (
//             <li key={car.id} className="p-4 border rounded shadow-sm">
//               <h3 className="text-lg font-bold">{car.title}</h3>
//               <p>Status: {car.status}</p>
//               <Link
//                 to={`/car/${car.id}`}
//                 className="inline-block mt-2 text-blue-600 hover:underline"
//               >
//                 View Details
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Settings;

// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteAllCars } from '../../utils/api'; // Ensure `deleteAllCars` exists
// import { useAuth } from '../../context/AuthContext';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// const Settings = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showSold, setShowSold] = useState(false);
//   const { user } = useAuth();

//   const loadCars = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return setError('❌ Please log in to view your cars.');

//     try {
//       const res = await fetchMyCars(token);
//       setCars(res);
//       setError('');
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('❌ Failed to fetch your cars.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteAllCars = async () => {
//     if (!window.confirm('Are you sure you want to delete ALL cars? This action is irreversible!')) return;

//     try {
//       await deleteAllCars(user.token);
//       toast.success('✅ All cars deleted successfully.');
//       setCars([]);
//     } catch (err) {
//       console.error('❌ Delete all error:', err);
//       toast.error('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const filteredCars = cars.filter(car =>
//     showSold ? car.status === 'sold' : car.status !== 'sold'
//   );

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold">My Cars</h2>
//         <label className="flex items-center space-x-2 text-sm">
//           <input
//             type="checkbox"
//             checked={showSold}
//             onChange={() => setShowSold(!showSold)}
//             className="form-checkbox text-green-600"
//           />
//           <span>Show Sold Cars</span>
//         </label>
//       </div>

//       {user?.isAdmin && (
//         <div className="mb-6">
//           <button
//             onClick={handleDeleteAllCars}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
//           >
//             🗑️ Delete All Cars
//           </button>
//         </div>
//       )}

//       {filteredCars.length === 0 ? (
//         <p className="text-center text-gray-500">No cars found.</p>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {filteredCars.map((car) => (
//             <li key={car.id} className="p-4 border rounded shadow-sm">
//               <h3 className="text-lg font-bold">{car.title}</h3>
//               <p>Status: {car.status}</p>
//               <Link
//                 to={`/car/${car.id}`}
//                 className="inline-block mt-2 text-blue-600 hover:underline"
//               >
//                 View Details
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Settings;




// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showSold, setShowSold] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');
//     try {
//       const res = await fetchMyCars(token);
//       setCars(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching user cars:', err);
//       setError('❌ Failed to load your listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!token) return alert('Not authenticated');
//     if (!window.confirm('Are you sure you want to delete this car?')) return;
//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAllCars = async () => {
//     try {
//       const res = await axios.delete('/api/admin/wipe', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || '✅ All cars deleted.');
//       setCars([]);
//       setShowConfirmModal(false);
//     } catch (err) {
//       console.error('❌ Delete all error:', err);
//       toast.error('❌ Failed to delete all cars.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const filteredCars = cars.filter((car) =>
//     showSold ? car.status === 'sold' : car.status !== 'sold'
//   );

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Car Settings</h2>

//       <div className="flex items-center justify-between mb-4">
//         <label className="flex items-center space-x-2 text-sm font-medium">
//           <input
//             type="checkbox"
//             checked={showSold}
//             onChange={() => setShowSold(!showSold)}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <span>Show Sold Cars</span>
//         </label>

//         {user?.isAdmin && (
//           <button
//             onClick={() => setShowConfirmModal(true)}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
//           >
//             🗑️ Delete ALL Cars
//           </button>
//         )}
//       </div>

//       {filteredCars.length === 0 ? (
//         <p className="text-center mt-10">No cars to display.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCars.map((car) => (
//             <div key={car.id} className="bg-white p-4 rounded shadow">
//               <img
//                 src={car.image_url}
//                 alt={`${car.make} ${car.model}`}
//                 className="w-full h-40 object-cover rounded mb-2"
//               />
//               <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
//               <p className="text-sm text-gray-600 mb-1">€{car.price}</p>
//               <p className="text-xs text-gray-500 mb-2">Status: {car.status || 'available'}</p>
//               <div className="flex justify-between items-center">
//                 <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">
//                   Edit
//                 </Link>
//                 {user?.isAdmin && (
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:underline text-sm"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//             <h3 className="text-lg font-semibold text-red-700 mb-3">Confirm Delete All</h3>
//             <p className="text-sm mb-4 text-gray-700">
//               Are you sure you want to permanently delete <strong>ALL</strong> cars from the database?
//               This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteAllCars}
//                 className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;



// //--------update 
// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');

//     try {
//       const res = await fetchMyCars(token);
//       setCars(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching user cars:', err);
//       setError('❌ Failed to load your listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!token) return alert('Not authenticated');
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAllCars = async () => {
//     if (!window.confirm('⚠️ This will permanently delete ALL cars. Are you sure?')) return;

//     try {
//       const res = await axios.delete('/api/cars/admin/wipe', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || '✅ All cars deleted successfully.');
//       setCars([]); // Clear UI
//     } catch (err) {
//       console.error('❌ Wipe failed:', err);
//       if (err.response?.status === 403) {
//         toast.error('❌ You are not authorized to perform this action.');
//       } else {
//         toast.error('❌ Failed to delete all cars.');
//       }
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Car Settings</h2>

//       {/* ✅ Admin-only section */}
//       {user?.isAdmin && (
//         <div className="bg-red-50 border border-red-200 p-4 rounded mb-6">
//           <h3 className="text-xl font-semibold text-red-700 mb-2">🔴 Admin: Danger Zone</h3>
//           <p className="mb-4 text-sm text-red-600">
//             This action will <strong>permanently delete all cars</strong> from the system. This cannot be undone!
//           </p>
//           <button
//             onClick={handleDeleteAllCars}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete ALL Cars
//           </button>
//         </div>
//       )}

//       {cars.length === 0 ? (
//         <p className="text-center">You have no cars currently listed.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => (
//             <div key={car.id} className="bg-white p-4 rounded shadow">
//               <img src={car.image_url} alt="car" className="w-full h-40 object-cover rounded mb-2" />
//               <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
//               <p className="text-sm text-gray-600 mb-2">€{car.price}</p>
//               <div className="flex justify-between">
//                 <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
//                 <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:underline text-sm">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;



// import React from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-hot-toast';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const handleWipeAll = async () => {
//     const confirm = window.confirm(
//       '⚠️ Are you sure you want to permanently delete ALL cars and payments? This cannot be undone!'
//     );
//     if (!confirm) return;

//     try {
//       const res = await axios.delete('/api/admin/wipe', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || 'Wipe successful');
//     } catch (err) {
//       console.error('Wipe failed:', err);
//       toast.error('Failed to wipe all data');
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

//       <div className="space-y-6 bg-white p-6 rounded shadow">
//         <div>
//           <label className="block font-medium mb-1">Admin Name</label>
//           <input
//             type="text"
//             disabled
//             value={user?.name || 'admin'}
//             className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Email</label>
//           <input
//             type="email"
//             disabled
//             value={user?.email || 'admin@example.com'}
//             className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
//           />
//         </div>

//         <div className="pt-6 border-t mt-6">
//           <h2 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h2>
//           <button
//             onClick={handleWipeAll}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete ALL Cars and Payments
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

//-------update 3








// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const loadCars = async () => {
//     if (!token) return setError('❌ Please log in to view your cars.');

//     try {
//       const res = await fetchMyCars(token);
//       setCars(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching user cars:', err);
//       setError('❌ Failed to load your listings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!token) return alert('Not authenticated');
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await deleteCar(id, token);
//       setCars((prev) => prev.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       alert('❌ Failed to delete car.');
//     }
//   };

//   const handleDeleteAllCars = async () => {
//     const confirm = window.confirm('⚠️ This will permanently delete ALL cars. Are you sure?');
//     if (!confirm) return;

//     try {
//       const res = await axios.delete('/api/admin/wipe', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success(res.data.message || 'All cars deleted successfully');
//       setCars([]);
//     } catch (err) {
//       console.error('Wipe failed:', err);
//       if (err.response?.status === 403) {
//         toast.error('You are not authorized to perform this action.');
//       } else {
//         toast.error('An error occurred while deleting all cars.');
//       }
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (cars.length === 0 && !user?.isAdmin) return <p className="text-center mt-10">You have no car listings yet.</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Car Settings</h2>

//       {/* Admin-only Danger Zone */}
//       {user?.isAdmin && (
//         <div className="bg-red-50 border border-red-200 p-4 rounded mb-6">
//           <h3 className="text-xl font-semibold text-red-700 mb-2">🔴 Admin: Danger Zone</h3>
//           <p className="mb-4 text-sm text-red-600">
//             This will delete <strong>all cars</strong> in the database. Use with caution!
//           </p>
//           <button
//             onClick={handleDeleteAllCars}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete ALL Cars
//           </button>
//         </div>
//       )}

//       {cars.length === 0 ? (
//         <p className="text-center">No cars currently listed.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => (
//             <div key={car.id} className="bg-white p-4 rounded shadow">
//               <img
//                 src={car.image_url}
//                 alt={`${car.make} ${car.model}`}
//                 className="w-full h-40 object-cover rounded mb-2"
//               />
//               <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
//               <p className="text-sm text-gray-600 mb-2">€{car.price}</p>
//               <div className="flex justify-between">
//                 <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>

//                 {(user?.isAdmin || user?.id === car.user_id) && (
//                   <button
//                     onClick={() => handleDelete(car.id)}
//                     className="text-red-500 hover:underline text-sm"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;
