

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Dashboard/Settings.jsx

// import { useEffect, useState } from 'react';
// import { fetchMyCars, deleteCar } from '../../utils/api';
// import { Link } from 'react-router-dom';

// const Settings = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const loadCars = async () => {
//     const token = localStorage.getItem('token');
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
//     const token = localStorage.getItem('token');
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

//   useEffect(() => {
//     loadCars();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (cars.length === 0) return <p className="text-center mt-10">You have no car listings yet.</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">⚙️ My Car Settings</h2>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map((car) => (
//           <div key={car.id} className="bg-white p-4 rounded shadow">
//             <img src={car.image_url} alt="car" className="w-full h-40 object-cover rounded mb-2" />
//             <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
//             <p className="text-sm text-gray-600 mb-2">€{car.price}</p>
//             <div className="flex justify-between">
//               <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
//               <button onClick={() => handleDelete(car.id)} className="text-red-500 text-sm">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Settings;




//---------update 









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


//-------depsik


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
//   const [adminOnlyMessage, setAdminOnlyMessage] = useState('');

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
//     // Only allow admins to delete all cars
//     if (target === 'all' && !isAdmin) {
//       setAdminOnlyMessage('⛔ Only administrators can delete all cars');
//       return;
//     }
    
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//     setAdminOnlyMessage('');
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
//         setInfoMessage('✅ Car listing deleted successfully.');
//       }
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       setInfoMessage('❌ Failed to delete. Please try again.');
//     }
//     setDeleteTarget(null);
    
//     // Clear messages after 3 seconds
//     setTimeout(() => {
//       setInfoMessage('');
//       setAdminOnlyMessage('');
//     }, 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           {isAdmin ? 'Admin Car Settings' : 'My Car Settings'}
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">
//           Manage your vehicle listings and preferences
//         </p>
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${
//           infoMessage.includes('✅') 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}
      
//       {adminOnlyMessage && (
//         <div className="mb-6 px-4 py-3 bg-red-100 text-red-800 rounded-lg text-sm">
//           {adminOnlyMessage}
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//         <label className="flex items-center gap-3 cursor-pointer">
//           <div className="relative">
//             <input
//               type="checkbox"
//               className="sr-only"
//               checked={showArchived}
//               onChange={() => setShowArchived(!showArchived)}
//             />
//             <div className={`block w-12 h-6 rounded-full transition-colors ${
//               showArchived ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
//             }`}></div>
//             <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
//               showArchived ? 'transform translate-x-6' : ''
//             }`}></div>
//           </div>
//           <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
//             Show archived/sold cars
//           </span>
//         </label>

//         {isAdmin && (
//           <button
//             onClick={() => confirmDelete('all')}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
//           {error}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No car listings found</h3>
//           <p className="mt-1 text-gray-500 dark:text-gray-400">
//             Start by adding your first vehicle listing
//           </p>
//           <div className="mt-6">
//             <Link 
//               to="/add-car" 
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
//             >
//               Add New Car
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
//               >
//                 <div className="relative">
//                   <img
//                     src={
//                       car.image_url ||
//                       (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                     }
//                     alt={`${car.make} ${car.model}`}
//                     className="w-full h-48 object-cover"
//                   />
//                   {car.isArchived && (
//                     <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
//                       Archived
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="p-5">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-bold text-lg text-gray-900 dark:text-white">
//                         {car.make} {car.model}
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400 text-sm">
//                         {car.year} • {car.mileage ? `${car.mileage} km` : 'New'}
//                       </p>
//                     </div>
//                     <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
//                       €{Number(car.price).toLocaleString('en-DE', {
//                         minimumFractionDigits: 2,
//                       })}
//                     </span>
//                   </div>
                  
//                   {isAdmin && car.user_name && (
//                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
//                       Owner: {car.user_name}
//                     </p>
//                   )}
                  
//                   <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
//                     <Link
//                       to={`/edit/${car.id}`}
//                       className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                       </svg>
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => confirmDelete(car.id)}
//                       className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.' 
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;



//--dep 2



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
//   const [adminOnlyMessage, setAdminOnlyMessage] = useState('');
//   const [showArchived, setShowArchived] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null); // 'all' or car.id

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const loadCars = async () => {
//     if (!token) {
//       setError('Please log in to view your cars');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = isAdmin
//         ? await fetchAllCarsAdmin(token)
//         : await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('Error loading cars:', err);
//       setError('Failed to load car listings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = (target) => {
//     // Only allow admins to delete all cars
//     if (target === 'all' && !isAdmin) {
//       setAdminOnlyMessage('Only administrators can delete all cars');
//       setTimeout(() => setAdminOnlyMessage(''), 3000);
//       return;
//     }
    
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('All cars have been deleted');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars((prev) => prev.filter((car) => car.id !== deleteTarget));
//         setInfoMessage('Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       setInfoMessage('Failed to delete. Please try again');
//     }
//     setDeleteTarget(null);
    
//     // Clear messages after 3 seconds
//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           {isAdmin ? 'Admin Car Settings' : 'My Car Settings'}
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">
//           Manage your vehicle listings and preferences
//         </p>
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${
//           infoMessage.includes('deleted') 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}
      
//       {adminOnlyMessage && (
//         <div className="mb-6 px-4 py-3 bg-red-100 text-red-800 rounded-lg text-sm">
//           {adminOnlyMessage}
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//         <label className="flex items-center gap-3 cursor-pointer">
//           <div className="relative">
//             <input
//               type="checkbox"
//               className="sr-only"
//               checked={showArchived}
//               onChange={() => setShowArchived(!showArchived)}
//             />
//             <div className={`block w-12 h-6 rounded-full transition-colors ${
//               showArchived ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
//             }`}></div>
//             <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
//               showArchived ? 'transform translate-x-6' : ''
//             }`}></div>
//           </div>
//           <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
//             Show archived/sold cars
//           </span>
//         </label>

//         {isAdmin && (
//           <button
//             onClick={() => confirmDelete('all')}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             Delete All Cars
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
//           {error}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No car listings found</h3>
//           <p className="mt-1 text-gray-500 dark:text-gray-400">
//             Start by adding your first vehicle listing
//           </p>
//           <div className="mt-6">
//             <Link 
//               to="/add-car" 
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
//             >
//               Add New Car
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars
//             .filter((car) => showArchived || !car.isArchived)
//             .map((car) => (
//               <div
//                 key={car.id}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
//               >
//                 <div className="relative">
//                   <img
//                     src={
//                       car.image_url ||
//                       (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                     }
//                     alt={`${car.make} ${car.model}`}
//                     className="w-full h-48 object-cover"
//                   />
//                   {car.isArchived && (
//                     <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
//                       Archived
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="p-5">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-bold text-lg text-gray-900 dark:text-white">
//                         {car.make} {car.model}
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400 text-sm">
//                         {car.year} • {car.mileage ? `${car.mileage} km` : 'New'}
//                       </p>
//                     </div>
//                     <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
//                       €{Number(car.price).toLocaleString('de-DE', {
//                         minimumFractionDigits: 2,
//                       })}
//                     </span>
//                   </div>
                  
//                   {isAdmin && car.user_name && (
//                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
//                       Owner: {car.user_name}
//                     </p>
//                   )}
                  
//                   <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
//                     <Link
//                       to={`/edit/${car.id}`}
//                       className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                       </svg>
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => confirmDelete(car.id)}
//                       className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.' 
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;


//---dep 3









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
//   const [adminOnlyMessage, setAdminOnlyMessage] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const loadCars = async () => {
//     if (!token) {
//       setError('Please log in to view cars');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = isAdmin 
//         ? await fetchAllCarsAdmin(token) 
//         : await fetchMyCars(token);
//       setCars(res.data || []);
//     } catch (err) {
//       console.error('Error loading cars:', err);
//       setError('Failed to load car listings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = (target) => {
//     if (target === 'all' && !isAdmin) {
//       setAdminOnlyMessage('⛔ Only administrators can delete all cars');
//       setTimeout(() => setAdminOnlyMessage(''), 3000);
//       return;
//     }
    
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars(prev => prev.filter(car => car.id !== deleteTarget));
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       setInfoMessage('❌ Failed to delete. Please try again');
//     }
//     setDeleteTarget(null);
//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           {isAdmin ? 'All Cars' : 'My Car Settings'}
//         </h1>
//         <p className="text-gray-600 mt-1">
//           {isAdmin ? 'Manage all vehicle listings' : 'Manage your vehicle listings'}
//         </p>
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg ${
//           infoMessage.includes('✅') 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}
      
//       {adminOnlyMessage && (
//         <div className="mb-6 px-4 py-3 bg-red-100 text-red-800 rounded-lg">
//           {adminOnlyMessage}
//         </div>
//       )}

//       {isAdmin && (
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => confirmDelete('all')}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             Delete All Cars
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
//           {error}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
//           <p className="mt-1 text-gray-500">
//             Start by adding your first vehicle listing
//           </p>
//           <div className="mt-6">
//             <Link 
//               to="/add-car" 
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//             >
//               Add New Car
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all"
//             >
//               <div className="p-5">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {car.make} {car.model}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-lg font-bold text-blue-600">
//                         €{Number(car.price).toLocaleString('de-DE', {
//                           minimumFractionDigits: 2,
//                         })}
//                       </span>
//                       <span className="text-gray-500">•</span>
//                       <span className="text-gray-600">{car.year}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">
//                       {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
//                     </p>
//                   </div>
//                   <img
//                     src={
//                       car.image_url ||
//                       (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                     }
//                     alt={`${car.make} ${car.model}`}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                 </div>
                
//                 {isAdmin && car.user_name && (
//                   <p className="mt-3 text-sm text-gray-500 italic">
//                     Owner: {car.user_name}
//                   </p>
//                 )}
                
//                 <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.' 
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;


//------dep 4




// import { useEffect, useState } from 'react';
// import { fetchAllCarsAdmin, deleteCar, deleteAllCars } from '../../utils/api';
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
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Fetch all cars for admin
//   useEffect(() => {
//     const loadCars = async () => {
//       if (!token) {
//         setError('Please log in to view cars');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetchAllCarsAdmin(token);
//         setCars(res.data || []);
//       } catch (err) {
//         console.error('Error loading cars:', err);
//         setError('Failed to load car listings');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [token]);

//   const confirmDelete = (target) => {
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars(prev => prev.filter(car => car.id !== deleteTarget));
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       setInfoMessage('❌ Failed to delete. Please try again');
//     }
//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
//           <p className="text-gray-600 mt-1">
//             Manage all vehicle listings in the system
//           </p>
//         </div>
//         <button
//           onClick={() => confirmDelete('all')}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           Delete All Cars
//         </button>
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg ${
//           infoMessage.includes('✅') 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
//           {error}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
//           <p className="mt-1 text-gray-500">
//             No vehicles currently listed in the system
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all flex justify-between"
//             >
//               <div className="p-5 flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {car.make} {car.model}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-lg font-bold text-blue-600">
//                         €{Number(car.price).toLocaleString('de-DE', {
//                           minimumFractionDigits: 2,
//                         })}
//                       </span>
//                       <span className="text-gray-500">•</span>
//                       <span className="text-gray-600">{car.year}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">
//                       {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
//                     </p>
//                   </div>
//                 </div>
                
//                 {car.user_name && (
//                   <p className="mt-3 text-sm text-gray-500 italic">
//                     Owner: {car.user_name}
//                   </p>
//                 )}
                
//                 <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4 flex items-center">
//                 <img
//                   src={
//                     car.image_url ||
//                     (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                   }
//                   alt={`${car.make} ${car.model}`}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.' 
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;







//--dep 5




// import { useEffect, useState } from 'react';
// import { fetchAllCarsAdmin, deleteCar, deleteAllCars } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Fetch all cars for admin
//   useEffect(() => {
//     const loadCars = async () => {
//       if (!token) {
//         setError('Please log in to view cars');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetchAllCarsAdmin(token);
//         setCars(res.data || []);
//       } catch (err) {
//         console.error('Error loading cars:', err);
//         setError('Failed to load car listings');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [token]);

//   const confirmDelete = (target) => {
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars(prev => prev.filter(car => car.id !== deleteTarget));
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       setInfoMessage('❌ Failed to delete. Please try again');
//     }
//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
//           <p className="text-gray-600 mt-1">
//             Manage all vehicle listings in the system
//           </p>
//         </div>
//         <button
//           onClick={() => confirmDelete('all')}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           Delete All Cars
//         </button>
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg ${
//           infoMessage.includes('✅') 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
//           {error}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
//           <p className="mt-1 text-gray-500">
//             No vehicles currently listed in the system
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all flex justify-between"
//             >
//               <div className="p-5 flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {car.make} {car.model}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-lg font-bold text-blue-600">
//                         €{Number(car.price).toLocaleString('de-DE', {
//                           minimumFractionDigits: 2,
//                         })}
//                       </span>
//                       <span className="text-gray-500">•</span>
//                       <span className="text-gray-600">{car.year}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">
//                       {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
//                     </p>
//                   </div>
//                 </div>
                
//                 {car.user_name && (
//                   <p className="mt-3 text-sm text-gray-500 italic">
//                     Owner: {car.user_name}
//                   </p>
//                 )}
                
//                 <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4 flex items-center">
//                 <img
//                   src={
//                     car.image_url ||
//                     (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                   }
//                   alt={`${car.make} ${car.model}`}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.' 
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;



//---dep 6 recht



//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/Dashboard/Settings.jsx

// import { useEffect, useState } from 'react';

// import { fetchAllCarsAdmin, deleteCar, deleteAllCars } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Fetch all cars for admin
//   useEffect(() => {
//     const loadCars = async () => {
//       if (!token) {
//         setError('Please log in to view cars');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetchAllCarsAdmin(token);
//         setCars(res.data || []);
//       } catch (err) {
//         console.error('Error loading cars:', err);
        
//         if (err.response?.status === 403) {
//           setError('You do not have permission to view this page');
//         } else if (err.response?.status === 401) {
//           setError('Session expired. Please log in again');
//         } else {
//           setError('Failed to load car listings');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [token]);

//   const confirmDelete = (target) => {
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars(prev => prev.filter(car => car.id !== deleteTarget));
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
      
//       if (err.response) {
//         if (err.response.status === 403) {
//           setInfoMessage('❌ You do not have permission to delete');
//         } else if (err.response.status === 401) {
//           setInfoMessage('❌ Session expired. Please log in again');
//         } else {
//           setInfoMessage(`❌ ${err.response.data?.message || 'Server error. Please try again later'}`);
//         }
//       } else {
//         setInfoMessage('❌ Failed to delete. Please try again');
//       }
//     }
//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
//           <p className="text-gray-600 mt-1">
//             Manage all vehicle listings in the system
//           </p>
//         </div>
        
//         {/* Always show delete button - backend will validate permissions */}
//         <button
//           onClick={() => confirmDelete('all')}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           Delete All Cars
//         </button>
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg ${
//           infoMessage.includes('✅') 
//             ? 'bg-green-100 text-green-800' 
//             : 'bg-red-100 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
//           {error}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
//           <p className="mt-1 text-gray-500">
//             No vehicles currently listed in the system
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all flex justify-between"
//             >
//               <div className="p-5 flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {car.make} {car.model}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-lg font-bold text-blue-600">
//                         €{Number(car.price).toLocaleString('de-DE', {
//                           minimumFractionDigits: 2,
//                         })}
//                       </span>
//                       <span className="text-gray-500">•</span>
//                       <span className="text-gray-600">{car.year}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">
//                       {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
//                     </p>
//                   </div>
//                 </div>
                
//                 {car.user_name && (
//                   <p className="mt-3 text-sm text-gray-500 italic">
//                     Owner: {car.user_name}
//                   </p>
//                 )}
                
//                 <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                     Edit
//                   </Link>
                  
//                   {/* Delete button - backend handles permissions */}
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4 flex items-center">
//                 <img
//                   src={
//                     car.image_url ||
//                     (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                   }
//                   alt={`${car.make} ${car.model}`}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.' 
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;

//-----up








// // client/src/components/Dashboard/Settings.jsx

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/Dashboard/Settings.jsx
import { useEffect, useState } from 'react';
import { fetchAllCarsAdmin, deleteCar, deleteAllCars, deletePayment, deleteAllPayments } from '../../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const token = user?.token || localStorage.getItem('token');

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [paymentIdInput, setPaymentIdInput] = useState('');

  // Fetch all cars for admin on component load
  useEffect(() => {
    const loadCars = async () => {
      if (!token) {
        setError('Please log in to view cars');
        setLoading(false);
        return;
      }
      try {
        const res = await fetchAllCarsAdmin(token);
        setCars(res.data || []);
      } catch (err) {
        console.error('Error loading cars:', err);
        if (err.response?.status === 403) {
          setError('You do not have permission to view this page');
        } else if (err.response?.status === 401) {
          setError('Session expired. Please log in again');
        } else {
          setError('Failed to load car listings');
        }
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, [token]);

  // Open confirmation modal for deletion (target can be car ID, 'all', payment ID string, etc.)
  const confirmDelete = (target) => {
    setDeleteTarget(target);
    setShowConfirmModal(true);
  };

  // Handle confirmed deletion action
  const handleDeleteConfirmed = async () => {
    setShowConfirmModal(false);
    try {
      if (deleteTarget === 'all') {
        // Delete all cars
        await deleteAllCars(token);
        setCars([]);
        setInfoMessage('✅ All cars have been deleted');
      } else if (deleteTarget === 'all-payments') {
        // Delete all payments
        await deleteAllPayments(token);
        setInfoMessage('✅ All payment records have been deleted');
      } else if (typeof deleteTarget === 'string' && deleteTarget.startsWith('payment:')) {
        // Delete single payment by ID
        const paymentId = deleteTarget.split(':')[1];
        await deletePayment(paymentId, token);
        setInfoMessage('✅ Payment record deleted successfully');
        setPaymentIdInput('');  // clear the input after successful deletion
      } else {
        // Delete single car by ID
        await deleteCar(deleteTarget, token);
        setCars(prev => prev.filter(car => car.id !== deleteTarget));
        setInfoMessage('✅ Car listing deleted successfully');
      }
    } catch (err) {
      console.error('Delete error:', err);
      if (err.response) {
        if (err.response.status === 403) {
          setInfoMessage('❌ You do not have permission to delete');
        } else if (err.response.status === 401) {
          setInfoMessage('❌ Session expired. Please log in again');
        } else {
          // Show server-provided error message if available, otherwise a generic error
          setInfoMessage(`❌ ${err.response.data?.message || 'Server error. Please try again later'}`);
        }
      } else {
        setInfoMessage('❌ Failed to delete. Please try again');
      }
    }
    // Hide the info message after 3 seconds
    setTimeout(() => setInfoMessage(''), 3000);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setDeleteTarget(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Cars Section Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
          <p className="text-gray-600 mt-1">
            Manage all vehicle listings in the system
          </p>
        </div>
        {/* Delete All Cars button (always shown, backend verifies admin) */}
        <button
          onClick={() => confirmDelete('all')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete All Cars
        </button>
      </div>

      {/* Status Message Banner */}
      {infoMessage && (
        <div className={`mb-6 px-4 py-3 rounded-lg ${
          infoMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {infoMessage}
        </div>
      )}

      {/* Display content or messages based on state */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : cars.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
          <p className="mt-1 text-gray-500">No vehicles currently listed in the system</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all flex justify-between">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{car.make} {car.model}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-blue-600">
                        €{Number(car.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{car.year}</span>
                    </div>
                    <p className="text-gray-500 mt-2">
                      {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
                    </p>
                  </div>
                </div>
                {car.user_name && (
                  <p className="mt-3 text-sm text-gray-500 italic">Owner: {car.user_name}</p>
                )}
                <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/edit/${car.id}`} 
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </Link>
                  {/* Delete single car button */}
                  <button 
                    onClick={() => confirmDelete(car.id)} 
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-4 flex items-center">
                <img 
                  src={car.image_url || (car.images?.[0]?.image_url ?? '/default-car.jpg')} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-24 h-24 object-cover rounded-lg" 
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payments Section Header */}
      <div className="flex justify-between items-start mt-12 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Manage all payment records in the system</p>
        </div>
        {/* Delete All Payments button (admin only) */}
        <button
          onClick={() => confirmDelete('all-payments')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete All Payments
        </button>
      </div>

      {/* Delete single payment by ID input */}
      <div className="max-w-sm mb-8">
        <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">
          Delete Payment by ID:
        </label>
        <div className="flex mt-1">
          <input
            type="number"
            id="paymentId"
            value={paymentIdInput}
            onChange={(e) => setPaymentIdInput(e.target.value)}
            className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter payment ID"
          />
          <button
            type="button"
            onClick={() => paymentIdInput && confirmDelete('payment:' + paymentIdInput)}
            className="rounded-r-lg bg-red-600 text-white px-4 py-2 font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!paymentIdInput}
          >
            Delete Payment
          </button>
        </div>
      </div>

      {/* Confirmation Modal for deletions */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-center text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {deleteTarget === 'all'
                  ? 'Are you sure you want to delete ALL cars? This action cannot be undone.'
                  : deleteTarget === 'all-payments'
                  ? 'Are you sure you want to delete ALL payment records? This action cannot be undone.'
                  : (typeof deleteTarget === 'string' && deleteTarget.startsWith('payment:'))
                  ? 'Are you sure you want to delete this payment record?'
                  : 'Are you sure you want to delete this car listing?'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
                >
                  {deleteTarget === 'all' 
                    ? 'Delete All Cars' 
                    : deleteTarget === 'all-payments' 
                    ? 'Delete All Payments' 
                    : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

//. up 2


// // ✅ Settings Component (client/src/components/Dashboard/Settings.jsx)
// import { useEffect, useState } from 'react';
// import {
//   fetchAllCarsAdmin,
//   deleteCar,
//   deleteAllCars,
//   deletePayment,
//   deleteAllPayments,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');
//   const isAdmin = user?.is_admin === true;

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [paymentIdInput, setPaymentIdInput] = useState('');

//   useEffect(() => {
//     const loadCars = async () => {
//       try {
//         const res = await fetchAllCarsAdmin(token);
//         setCars(res.data || []);
//       } catch (err) {
//         if (err.response?.status === 403) {
//           setError('You do not have permission to view this page');
//         } else if (err.response?.status === 401) {
//           setError('Session expired. Please log in again');
//         } else {
//           setError('Failed to load car listings');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) loadCars();
//     else {
//       setError('Please log in to view cars');
//       setLoading(false);
//     }
//   }, [token]);

//   const confirmDelete = (target) => {
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else if (deleteTarget === 'all-payments') {
//         await deleteAllPayments(token);
//         setInfoMessage('✅ All payments have been deleted');
//       } else if (typeof deleteTarget === 'string' && deleteTarget.startsWith('payment:')) {
//         const paymentId = deleteTarget.split(':')[1];
//         await deletePayment(paymentId, token);
//         setInfoMessage('✅ Payment record deleted successfully');
//         setPaymentIdInput('');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars((prev) => prev.filter((car) => car.id !== deleteTarget));
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       if (err.response?.status === 403) {
//         setInfoMessage('❌ You do not have permission to delete');
//       } else if (err.response?.status === 401) {
//         setInfoMessage('❌ Session expired. Please log in again');
//       } else {
//         setInfoMessage(`❌ ${err.response?.data?.message || 'Server error'}`);
//       }
//     } finally {
//       setTimeout(() => setInfoMessage(''), 3000);
//     }
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
//           <p className="text-gray-600 mt-1">Manage all vehicle listings in the system</p>
//         </div>

//         {isAdmin && (
//           <button
//             onClick={() => confirmDelete('all')}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
//           >
//             Delete All Cars
//           </button>
//         )}
//       </div>

//       {infoMessage && (
//         <div
//           className={`mb-6 px-4 py-3 rounded-lg ${infoMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
//         >
//           {infoMessage}
//         </div>
//       )}

//       {/* Cars */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">{error}</div>
//       ) : (
//         <div className="space-y-6">
//           {cars.map((car) => (
//             <div key={car.id} className="bg-white rounded-xl border p-5 shadow-sm flex justify-between">
//               <div>
//                 <h3 className="font-bold text-xl">{car.make} {car.model}</h3>
//                 <p className="text-sm text-gray-500">Owner: {car.user_name}</p>
//                 <div className="mt-2 text-sm text-gray-600">Year: {car.year} • Price: €{car.price}</div>
//               </div>
//               <div className="flex gap-2">
//                 <Link to={`/edit/${car.id}`} className="text-blue-600">Edit</Link>
//                 <button onClick={() => confirmDelete(car.id)} className="text-red-600">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Admin Payment Management */}
//       {isAdmin && (
//         <>
//           <div className="flex justify-between items-start mt-12 mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
//               <p className="text-gray-600 mt-1">Manage all payment records</p>
//             </div>
//             <button
//               onClick={() => confirmDelete('all-payments')}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
//             >
//               Delete All Payments
//             </button>
//           </div>

//           <div className="max-w-sm mb-8">
//             <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">Delete Payment by ID:</label>
//             <div className="flex mt-1">
//               <input
//                 type="number"
//                 id="paymentId"
//                 value={paymentIdInput}
//                 onChange={(e) => setPaymentIdInput(e.target.value)}
//                 className="flex-1 rounded-l-lg border px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter payment ID"
//               />
//               <button
//                 type="button"
//                 onClick={() => paymentIdInput && confirmDelete('payment:' + paymentIdInput)}
//                 className="rounded-r-lg bg-red-600 text-white px-4 py-2 hover:bg-red-700"
//                 disabled={!paymentIdInput}
//               >
//                 Delete Payment
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
//             <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Confirm Deletion</h2>
//             <p className="text-center text-gray-600 mb-6">
//               {deleteTarget === 'all' ? 'Are you sure you want to delete ALL cars?' :
//               deleteTarget === 'all-payments' ? 'Are you sure you want to delete ALL payments?' :
//               deleteTarget?.startsWith('payment:') ? 'Are you sure you want to delete this payment?' :
//               'Are you sure you want to delete this car?'}
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleCancel}
//                 className="flex-1 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
//               >Cancel</button>
//               <button
//                 onClick={handleDeleteConfirmed}
//                 className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700"
//               >Delete</button>
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
//   fetchAllCarsAdmin,
//   deleteCarAdmin,
//   deleteAllCarsAdmin,
// } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   useEffect(() => {
//     const loadCars = async () => {
//       if (!token) {
//         setError('Please log in to view cars');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetchAllCarsAdmin(token);
//         setCars(res.data || []);
//       } catch (err) {
//         console.error('Error loading cars:', err);
//         if (err.response?.status === 403) {
//           setError('You do not have permission to view this page');
//         } else if (err.response?.status === 401) {
//           setError('Session expired. Please log in again');
//         } else {
//           setError('Failed to load car listings');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [token]);

//   const confirmDelete = (target) => {
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCarsAdmin(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else {
//         await deleteCarAdmin(deleteTarget, token);
//         setCars((prev) => prev.filter((car) => car.id !== deleteTarget));
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       if (err.response) {
//         if (err.response.status === 403) {
//           setInfoMessage('❌ You do not have permission to delete');
//         } else if (err.response.status === 401) {
//           setInfoMessage('❌ Session expired. Please log in again');
//         } else {
//           setInfoMessage(
//             `❌ ${err.response.data?.message || 'Server error. Please try again later'}`
//           );
//         }
//       } else {
//         setInfoMessage('❌ Failed to delete. Please try again');
//       }
//     }

//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* header & delete all */}
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
//           <p className="text-gray-600 mt-1">Manage all vehicle listings in the system</p>
//         </div>
//         <button
//           onClick={() => confirmDelete('all')}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           Delete All Cars
//         </button>
//       </div>

//       {/* messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg ${infoMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {infoMessage}
//         </div>
//       )}

//       {/* loading / error / empty / list */}
//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">{error}</div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
//           <p className="mt-1 text-gray-500">No vehicles currently listed in the system</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all flex justify-between"
//             >
//               <div className="p-5 flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {car.make} {car.model}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-lg font-bold text-blue-600">
//                         €{Number(car.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
//                       </span>
//                       <span className="text-gray-500">•</span>
//                       <span className="text-gray-600">{car.year}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">
//                       {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
//                     </p>
//                   </div>
//                 </div>
//                 {car.user_name && (
//                   <p className="mt-3 text-sm text-gray-500 italic">Owner: {car.user_name}</p>
//                 )}
//                 <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
//                   <Link
//                     to={`/edit/${car.id}`}
//                     className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4 flex items-center">
//                 <img
//                   src={car.image_url || (car.images?.[0]?.image_url ?? '/default-car.jpg')}
//                   alt={`${car.make} ${car.model}`}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Confirm Deletion</h2>
//               <p className="text-gray-600 text-center mb-6">
//                 {deleteTarget === 'all'
//                   ? 'Are you sure you want to delete ALL cars? This action cannot be undone.'
//                   : 'Are you sure you want to delete this car listing?'}
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;



//--------dep 7


// import { useEffect, useState } from 'react';
// import { fetchAllCarsAdmin, deleteCar, deleteAllCars } from '../../utils/api';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');
//   const isAdmin = user?.role === 'admin';

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [infoMessage, setInfoMessage] = useState('');
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   // Fetch all cars for admin
//   useEffect(() => {
//     const loadCars = async () => {
//       setError('');
//       setLoading(true);
      
//       if (!token) {
//         setError('Please log in to view cars');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetchAllCarsAdmin(token);
//         setCars(res.data?.map(car => ({ ...car, deleted: false })) || []);
//       } catch (err) {
//         console.error('Error loading cars:', err);
        
//         let errorMsg = 'Failed to load car listings';
//         if (err.response) {
//           if (err.response.status === 403) {
//             errorMsg = 'You do not have permission to view this page';
//           } else if (err.response.status === 401) {
//             errorMsg = 'Session expired. Please log in again';
//           } else if (err.response.data?.message) {
//             errorMsg = err.response.data.message;
//           }
//         }
//         setError(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [token]);

//   const confirmDelete = (target) => {
//     if (!isAdmin) {
//       setInfoMessage('❌ Admin privileges required for deletion');
//       setTimeout(() => setInfoMessage(''), 3000);
//       return;
//     }
//     setDeleteTarget(target);
//     setShowConfirmModal(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowConfirmModal(false);
//     try {
//       if (deleteTarget === 'all') {
//         await deleteAllCars(token);
//         setCars([]);
//         setInfoMessage('✅ All cars have been deleted');
//       } else {
//         await deleteCar(deleteTarget, token);
//         setCars(prev => 
//           prev.map(car => 
//             car.id === deleteTarget ? { ...car, deleted: true } : car
//           )
//         );
//         setInfoMessage('✅ Car listing deleted successfully');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
      
//       let errorMsg = 'Failed to delete. Please try again';
//       if (err.response) {
//         if (err.response.status === 403) {
//           errorMsg = 'You do not have permission to delete';
//         } else if (err.response.status === 401) {
//           errorMsg = 'Session expired. Please log in again';
//         } else if (err.response.data?.message) {
//           errorMsg = err.response.data.message;
//         }
//       }
//       setInfoMessage(`❌ ${errorMsg}`);
//     }
//     setTimeout(() => setInfoMessage(''), 3000);
//   };

//   const handleCancel = () => {
//     setShowConfirmModal(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Vehicle Inventory</h1>
//           <p className="text-gray-600 mt-2">
//             Manage all vehicle listings in the system
//           </p>
//         </div>
        
//         {isAdmin && (
//           <button
//             onClick={() => confirmDelete('all')}
//             className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             Delete All Cars
//           </button>
//         )}
//       </div>

//       {/* Status Messages */}
//       {infoMessage && (
//         <div className={`mb-6 px-4 py-3 rounded-lg border ${
//           infoMessage.includes('✅') 
//             ? 'bg-green-50 border-green-200 text-green-800' 
//             : 'bg-red-50 border-red-200 text-red-800'
//         }`}>
//           {infoMessage}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex flex-col items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
//           <p className="text-gray-600">Loading vehicle inventory...</p>
//         </div>
//       ) : error ? (
//         <div className="bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 text-center">
//           <div className="flex justify-center mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//           {error}
//           {error.includes('log in') && (
//             <Link 
//               to="/login" 
//               className="mt-2 inline-block text-blue-600 hover:underline"
//             >
//               Go to login page
//             </Link>
//           )}
//         </div>
//       ) : cars.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//           </svg>
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No vehicle listings found</h3>
//           <p className="mt-1 text-gray-500">
//             No vehicles currently listed in the system
//           </p>
//           <Link 
//             to="/add-car" 
//             className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Add New Vehicle
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
//                 car.deleted 
//                   ? 'border-red-100 bg-red-50' 
//                   : 'border-gray-200 hover:shadow-md'
//               } transition-all flex flex-col h-full`}
//             >
//               <div className="p-5 flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {car.make} {car.model}
//                     </h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-lg font-bold text-blue-600">
//                         €{Number(car.price).toLocaleString('de-DE', {
//                           minimumFractionDigits: 2,
//                         })}
//                       </span>
//                       <span className="text-gray-500">•</span>
//                       <span className="text-gray-600">{car.year}</span>
//                     </div>
//                     <p className="text-gray-500 mt-2">
//                       {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
//                     </p>
//                   </div>
//                 </div>
                
//                 {car.user_name && (
//                   <p className="mt-3 text-sm text-gray-500 italic">
//                     Owner: {car.user_name}
//                   </p>
//                 )}
//               </div>
              
//               {/* Image area with deletion status */}
//               <div className="relative h-48">
//                 {car.deleted ? (
//                   <div className="h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-red-50 to-red-100">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <h4 className="font-bold text-red-700 text-lg">SOLD OUT</h4>
//                     <p className="text-red-600 mt-1">
//                       This vehicle is no longer available
//                     </p>
//                   </div>
//                 ) : (
//                   <img
//                     src={
//                       car.image_url ||
//                       (car.images?.[0]?.image_url ?? '/default-car.jpg')
//                     }
//                     alt={`${car.make} ${car.model}`}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/default-car.jpg';
//                     }}
//                   />
//                 )}
//               </div>
              
//               {/* Action buttons */}
//               <div className="p-4 border-t border-gray-100 flex justify-end gap-4">
//                 <Link
//                   to={`/edit/${car.id}`}
//                   className={`inline-flex items-center text-sm font-medium ${
//                     car.deleted 
//                       ? 'text-gray-400 pointer-events-none' 
//                       : 'text-blue-600 hover:text-blue-800'
//                   } transition-colors`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                   </svg>
//                   {car.deleted ? 'Unavailable' : 'Edit'}
//                 </Link>
                
//                 {isAdmin && (
//                   <button
//                     onClick={() => confirmDelete(car.id)}
//                     disabled={car.deleted}
//                     className={`inline-flex items-center text-sm font-medium ${
//                       car.deleted 
//                         ? 'text-gray-400 cursor-not-allowed' 
//                         : 'text-red-600 hover:text-red-800'
//                     } transition-colors`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {car.deleted ? 'Deleted' : 'Delete'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in">
//             <div className="p-6">
//               <div className="flex justify-center text-red-500 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
              
//               <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
//                 Confirm Deletion
//               </h2>
              
//               <p className="text-gray-600 text-center mb-6">
//                 {deleteTarget === 'all' 
//                   ? 'Are you sure you want to permanently delete ALL vehicles? This action cannot be undone.' 
//                   : 'Are you sure you want to permanently delete this vehicle listing?'}
//               </p>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCancel}
//                   className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-medium transition-colors shadow-md"
//                 >
//                   {deleteTarget === 'all' ? 'Delete All' : 'Confirm Delete'}
//                 </button>
//               </div>
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






// // ✅ Updated: Settings.jsx with admin delete & sold car toggle
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
//     const confirm = window.confirm(
//       '⚠️ This will permanently delete ALL cars in the system. Are you sure?'
//     );
//     if (!confirm) return;

//     try {
//       const res = await axios.delete('/api/cars/admin/wipe', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(res.data.message || 'All cars deleted successfully');
//       setCars([]);
//     } catch (err) {
//       console.error('Wipe failed:', err);
//       toast.error('You are not authorized to perform this action.');
//     }
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const filteredCars = showSold ? cars : cars.filter((car) => car.status !== 'sold');

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (filteredCars.length === 0) return <p className="text-center mt-10">No car listings match the current filter.</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">⚙️ Car Settings</h2>

//       <div className="flex justify-between items-center mb-6">
//         <label className="flex items-center gap-2">
//           <input type="checkbox" checked={showSold} onChange={() => setShowSold(!showSold)} />
//           Show Sold Cars
//         </label>

//         {user?.isAdmin && (
//           <button
//             onClick={handleDeleteAllCars}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete ALL Cars
//           </button>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCars.map((car) => (
//           <div key={car.id} className="bg-white p-4 rounded shadow">
//             <img src={car.image_url} alt="car" className="w-full h-40 object-cover rounded mb-2" />
//             <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
//             <p className="text-sm text-gray-600">€{car.price}</p>
//             <p className="text-xs text-gray-500 mb-2">Status: {car.status}</p>
//             <div className="flex justify-between">
//               <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
//               {user?.isAdmin && (
//                 <button onClick={() => handleDelete(car.id)} className="text-red-500 text-sm">Delete</button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
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

//--------update 2



// import React from 'react';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext'; // ✅ Fixed import path
// import { toast } from 'react-hot-toast';

// const Settings = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const handleWipeAll = async () => {
//     const confirmed = window.confirm(
//       '⚠️ Are you absolutely sure you want to delete ALL cars and payments? This action is irreversible!'
//     );
//     if (!confirmed) return;

//     try {
//       const response = await axios.delete('/api/admin/wipe', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(response.data.message || 'All data wiped successfully');
//     } catch (err) {
//       console.error('Wipe failed:', err);

//       if (err.response?.status === 403) {
//         toast.error('Access denied: You are not authorized to perform this action.');
//       } else if (err.response?.status === 401) {
//         toast.error('Unauthorized: Your session may have expired.');
//       } else {
//         toast.error('An unexpected error occurred while wiping data.');
//       }
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
//             value={user?.name || 'Admin'}
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

//         <div className="pt-6 mt-6 border-t">
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
