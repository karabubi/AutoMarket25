
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/utils/api.js

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/api',
// });

// /* ---------------------- Auth ---------------------- */
// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);

// /* ---------------------- Cars ---------------------- */
// export const fetchCars = () => API.get('/cars');
// export const fetchCarById = (id) => API.get(`/cars/${id}`);
// export const addCar = (data, token) =>
//   API.post('/cars', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const fetchMyCars = (token) =>
//   API.get('/cars/my', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* ---------------------- Car Images ---------------------- */
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   formData.append('car_id', carId);
//   files.forEach((file) => formData.append('images', file));

//   return API.post('/cars/images/upload', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// export const fetchCarImages = (carId) => API.get(`/cars/${carId}/images`);

// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* ---------------------- Default ---------------------- */
// export default API;



//--------update 


// //Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/utils/api.js
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/api',
// });

// /* ---------------------- Auth ---------------------- */
// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);

// /* ---------------------- Cars ---------------------- */
// export const fetchCars = () => API.get('/cars');
// export const fetchCarById = (id) => API.get(`/cars/${id}`);

// export const addCar = (data, token) =>
//   API.post('/cars', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const fetchMyCars = (token) =>
//   API.get('/cars/my', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteAllCars = (token) =>
//   API.delete('/admin/cars', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* ---------------------- Car Images ---------------------- */
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   formData.append('car_id', carId);
//   files.forEach((file) => formData.append('images', file));

//   return API.post('/cars/images/upload', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// export const fetchCarImages = (carId) => API.get(`/cars/${carId}/images`);

// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* ---------------------- Default ---------------------- */
// export default API;


//---------update 2




// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/api',
// });

// /* ---------------------- Auth ---------------------- */
// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);

// /* ---------------------- Cars ---------------------- */
// export const fetchCars = () => API.get('/cars');
// export const fetchCarById = (id) => API.get(`/cars/${id}`);

// export const addCar = (data, token) =>
//   API.post('/cars', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const fetchMyCars = (token) =>
//   API.get('/cars/my', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // ✅ NEW: Admin-only fetch of all cars
// export const fetchAllCarsAdmin = (token) =>
//   API.get('/admin/cars', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteAllCars = (token) =>
//   API.delete('/admin/cars', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* ---------------------- Car Images ---------------------- */
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   formData.append('car_id', carId);
//   files.forEach((file) => formData.append('images', file));

//   return API.post('/cars/images/upload', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// export const fetchCarImages = (carId) => API.get(`/cars/${carId}/images`);

// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* ---------------------- Default ---------------------- */
// export default API;


//


// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/api',
// });

// /* 🔐 AUTHENTICATION */
// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);

// /* 🚗 CARS */

// // 🔓 Public
// export const fetchCars = () => API.get('/cars');
// export const fetchCarById = (id) => API.get(`/cars/${id}`);

// // 🔒 User-specific
// export const fetchMyCars = (token) =>
//   API.get('/cars/my', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const addCar = (data, token) =>
//   API.post('/cars', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 👑 Admin-only
// export const fetchAllCarsAdmin = (token) =>
//   API.get('/cars', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteAllCars = (token) =>
//   API.delete('/cars/admin/wipe', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 🖼️ CAR IMAGES */

// // Upload multiple images
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   formData.append('car_id', carId);
//   files.forEach((file) => formData.append('images', file));

//   return API.post('/cars/images/upload', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// // Get images for a car
// export const fetchCarImages = (carId) =>
//   API.get(`/cars/${carId}/images`);

// // Delete single image
// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 📦 DEFAULT EXPORT */
// export default API;


//. dep

// //Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/utils/api.js


// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/api',
// });

// /* 🔐 AUTHENTICATION */
// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);

// /* 🚗 CARS */

// // 🔓 Public
// export const fetchCars = () => API.get('/cars');
// export const fetchCarById = (id) => API.get(`/cars/${id}`);

// // 🔒 User-specific
// export const fetchMyCars = (token) =>
//   API.get('/cars/my', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const addCar = (data, token) =>
//   API.post('/cars', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 👑 Admin-only
// export const fetchAllCarsAdmin = (token) =>
//   API.get('/cars', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteAllCars = (token) =>
//   API.delete('/cars/admin/wipe', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 💰 PAYMENTS */

// // 👑 Admin-only payment operations
// export const fetchAllPaymentsAdmin = (token) =>
//   API.get('/payments', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deletePayment = (paymentId, token) =>
//   API.delete(`/payments/${paymentId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteAllPayments = (token) =>
//   API.delete('/payments/admin/wipe', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 🖼️ CAR IMAGES */

// // Upload multiple images
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   formData.append('car_id', carId);
//   files.forEach((file) => formData.append('images', file));

//   return API.post('/cars/images/upload', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// // Get images for a car
// export const fetchCarImages = (carId) =>
//   API.get(`/cars/${carId}/images`);

// // Delete single image
// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 📦 DEFAULT EXPORT */
// export default API;

//--------up

// //Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/utils/api.js
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5001/api',
// });

// /* 🔐 AUTHENTICATION */
// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);

// /* 🚗 CARS */

// // 🔓 Public
// export const fetchCars = () => API.get('/cars');
// export const fetchCarById = (id) => API.get(`/cars/${id}`);

// // 🔒 User-specific
// export const fetchMyCars = (token) =>
//   API.get('/cars/my', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const addCar = (data, token) =>
//   API.post('/cars', data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 👑 Admin-only
// export const fetchAllCarsAdmin = (token) =>
//   API.get('/cars', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deleteAllCars = (token) =>
//   API.delete('/cars/admin/wipe', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 💰 PAYMENTS */

// // 👑 Admin-only payment operations
// export const fetchAllPaymentsAdmin = (token) =>
//   API.get('/payments', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const deletePayment = (paymentId, token) =>
//   API.delete(`/payments/${paymentId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Support both `/payments/admin/wipe` and `/payments` for deleting all
// export const deleteAllPayments = (token, useWipeRoute = true) => {
//   const path = useWipeRoute ? '/payments/admin/wipe' : '/payments';
//   return API.delete(path, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// /* 🖼️ CAR IMAGES */

// // Upload multiple images
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   formData.append('car_id', carId);
//   files.forEach((file) => formData.append('images', file));

//   return API.post('/cars/images/upload', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// // Get images for a car
// export const fetchCarImages = (carId) =>
//   API.get(`/cars/${carId}/images`);

// // Delete single image
// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 📦 DEFAULT EXPORT */
// export default API;
