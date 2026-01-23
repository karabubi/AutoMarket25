
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

// // 🔒 User-specific (requires user to be logged in, e.g. for managing their own cars)
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
// export const fetchCarImages = (carId) =>
//   API.get(`/cars/${carId}/images`);
// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/cars/images/${imageId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// /* 📦 DEFAULT EXPORT */
// export default API;




// /client/src/utils/api.js
import axios from "axios";
const isDev = import.meta.env.MODE === "development";

const API_BASE =
  isDev
    ? "/api"
    : `${import.meta.env.VITE_API_URL || ""}/api`.replace(/\/+$/, ""); // remove trailing slash

if (!isDev && !import.meta.env.VITE_API_URL) {
  // This helps you notice missing env on Vercel quickly
  console.warn("⚠️ VITE_API_URL is missing in production environment variables.");
}

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // ok even if you use JWT headers
  timeout: 20000,
});

/* 🔐 AUTHENTICATION */
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

/* 🚗 CARS */
// 🔓 Public
export const fetchCars = (params = {}) =>
  API.get("/cars", { params }); // supports filters as query params if backend supports it

export const fetchCarById = (id) => API.get(`/cars/${id}`);

// 🔒 User-specific
export const fetchMyCars = (token) =>
  API.get("/cars/my", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addCar = (data, token) =>
  API.post("/cars", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteCar = (id, token) =>
  API.delete(`/cars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 👑 Admin-only
export const fetchAllCarsAdmin = (token) =>
  API.get("/cars", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAllCars = (token) =>
  API.delete("/cars/admin/wipe", {
    headers: { Authorization: `Bearer ${token}` },
  });

/* 💰 PAYMENTS */
export const fetchAllPaymentsAdmin = (token) =>
  API.get("/payments", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deletePayment = (paymentId, token) =>
  API.delete(`/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAllPayments = (token) =>
  API.delete("/payments/admin/wipe", {
    headers: { Authorization: `Bearer ${token}` },
  });

/* 🖼️ CAR IMAGES */
export const uploadCarImages = (carId, files, token) => {
  const formData = new FormData();
  formData.append("car_id", carId);
  files.forEach((file) => formData.append("images", file));

  return API.post("/cars/images/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchCarImages = (carId) => API.get(`/cars/${carId}/images`);

export const deleteCarImage = (imageId, token) =>
  API.delete(`/cars/images/${imageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;
