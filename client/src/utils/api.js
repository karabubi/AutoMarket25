
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/utils/api.js

// import axios from "axios";

// const isDev = import.meta.env.MODE === "development";

// /**
//  * Base URL rules:
//  * - Dev: use "/api" so Vite proxy works
//  * - Prod: use VITE_API_URL from Vercel, then append "/api"
//  */
// const RAW_BASE = import.meta.env.VITE_API_URL || "";
// const CLEAN_BASE = RAW_BASE.replace(/\/$/, "");
// const API_BASE = isDev ? "/api" : `${CLEAN_BASE}/api`;

// if (!isDev && !import.meta.env.VITE_API_URL) {
//   console.warn("⚠️ VITE_API_URL is missing in Vercel Environment Variables.");
// }

// const API = axios.create({
//   baseURL: API_BASE,
//   timeout: 20000,
// });

// /** Optional helper */
// export const authHeader = (token) => ({
//   headers: { Authorization: `Bearer ${token}` },
// });

// /* 🔐 AUTHENTICATION */
// export const login = (data) => API.post("/auth/login", data);
// export const register = (data) => API.post("/auth/register", data);

// /* 🚗 CARS */
// export const fetchCars = (params = {}) => API.get("/cars", { params });
// export const fetchCarById = (id) => API.get(`/cars/${id}`);

// /* 🔒 User-specific */
// export const fetchMyCars = (token) => API.get("/cars/my", authHeader(token));

// export const addCar = (data, token) =>
//   API.post("/cars", data, authHeader(token));

// export const deleteCar = (id, token) =>
//   API.delete(`/cars/${id}`, authHeader(token));

// /* 👑 Admin-only */
// export const fetchAllCarsAdmin = (token) => API.get("/cars", authHeader(token));

// export const deleteAllCars = (token) =>
//   API.delete("/cars/admin/wipe", authHeader(token));

// /* 💰 PAYMENTS */
// export const fetchAllPaymentsAdmin = (token) =>
//   API.get("/payments", authHeader(token));

// export const deletePayment = (paymentId, token) =>
//   API.delete(`/payments/${paymentId}`, authHeader(token));

// export const deleteAllPayments = (token) =>
//   API.delete("/payments/admin/wipe", authHeader(token));

// /* 🖼️ CAR IMAGES */
// export const uploadCarImages = (carId, files, token) => {
//   const formData = new FormData();
//   files.forEach((file) => formData.append("images", file)); // ✅ key must be "images"

//   return API.post(`/cars/${carId}/images`, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       // ✅ DO NOT set Content-Type manually
//     },
//   });
// };

// export const fetchCarImages = (carId) => API.get(`/cars/${carId}/images`);

// export const deleteCarImage = (imageId, token) =>
//   API.delete(`/car-images/${imageId}`, authHeader(token));

// export default API;

// 31-01-2026



// /Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/utils/api.js
import axios from "axios";

const isDev = import.meta.env.MODE === "development";

/**
 * Base URL rules:
 * - Dev: use "/api" so Vite proxy works
 * - Prod: use VITE_API_URL from Vercel, then append "/api"
 */
const RAW_BASE = import.meta.env.VITE_API_URL || "";
const CLEAN_BASE = RAW_BASE.replace(/\/$/, "");
const API_BASE = isDev ? "/api" : `${CLEAN_BASE}/api`;

if (!isDev && !import.meta.env.VITE_API_URL) {
  console.warn("⚠️ VITE_API_URL is missing in Vercel Environment Variables.");
}

const API = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
});

/** Optional helper */
export const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

/* 🔐 AUTHENTICATION */
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

/* 🚗 CARS */
export const fetchCars = (params = {}) => API.get("/cars", { params });
export const fetchCarById = (id) => API.get(`/cars/${id}`);

/* 🔒 User-specific */
export const fetchMyCars = (token) => API.get("/cars/my", authHeader(token));

export const addCar = (data, token) => API.post("/cars", data, authHeader(token));

export const deleteCar = (id, token) => API.delete(`/cars/${id}`, authHeader(token));

/* 👑 Admin-only */
export const fetchAllCarsAdmin = (token) => API.get("/cars", authHeader(token));

export const deleteAllCars = (token) => API.delete("/cars/admin/wipe", authHeader(token));

/* 💰 PAYMENTS */
export const fetchAllPaymentsAdmin = (token) => API.get("/payments", authHeader(token));

export const deletePayment = (paymentId, token) =>
  API.delete(`/payments/${paymentId}`, authHeader(token));

export const deleteAllPayments = (token) =>
  API.delete("/payments/admin/wipe", authHeader(token));

/* 🖼️ CAR IMAGES */
export const uploadCarImages = (carId, files, token) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file)); // ✅ key must be "images"

  return API.post(`/cars/${carId}/images`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // ✅ DO NOT set Content-Type manually
    },
  });
};

export const fetchCarImages = (carId) => API.get(`/cars/${carId}/images`);

export const deleteCarImage = (imageId, token) =>
  API.delete(`/car-images/${imageId}`, authHeader(token));

/* ✉️ EMAIL */
export const sendPurchaseRequest = (data) =>
  API.post("/email/purchase-request", data);

export default API;

