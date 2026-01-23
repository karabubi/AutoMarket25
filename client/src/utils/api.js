
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/utils/api.js

import axios from "axios";

const isDev = import.meta.env.MODE === "development";

/**
 * Base URL rules:
 * - Dev: use "/api" so Vite proxy works (vite.config.js -> localhost:5001)
 * - Prod: use VITE_API_URL from Vercel, then append "/api"
 */
const RAW_BASE = import.meta.env.VITE_API_URL || "";

// remove trailing slash ONLY from base, not from "/api"
const CLEAN_BASE = RAW_BASE.replace(/\/$/, "");

const API_BASE = isDev ? "/api" : `${CLEAN_BASE}/api`;

if (!isDev && !import.meta.env.VITE_API_URL) {
  console.warn("⚠️ VITE_API_URL is missing in Vercel Environment Variables.");
}

const API = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  // withCredentials: false, // enable ONLY if you use cookies
});

/* 🔐 AUTHENTICATION */
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

/* 🚗 CARS */
export const fetchCars = (params = {}) => API.get("/cars", { params });
export const fetchCarById = (id) => API.get(`/cars/${id}`);

/* 🔒 User-specific */
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

/* 👑 Admin-only */
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
