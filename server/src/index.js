
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/index.js

// require('dotenv').config();
// console.log('✅ .env loaded');

// // Core dependencies
// const express = require('express');
// console.log('✅ express loaded');
// const cors = require('cors');
// console.log('✅ cors loaded');
// const morgan = require('morgan');
// console.log('✅ morgan loaded');

// // Utilities & DB
// const logger = require('./utils/logger');
// console.log('✅ logger loaded');
// const db = require('./utils/db');
// console.log('✅ db loaded');

// // Routes
// const authRoutes = require('./routes/authRoutes');
// console.log('✅ authRoutes loaded');
// const carRoutes = require('./routes/carRoutes');
// console.log('✅ carRoutes loaded');
// const userRoutes = require('./routes/userRoutes');
// console.log('✅ userRoutes loaded');
// const emailRoutes = require('./routes/emailRoutes');
// console.log('✅ emailRoutes loaded');
// const adminRoutes = require('./routes/adminRoutes');
// console.log('✅ adminRoutes loaded');
// const paymentRoutes = require('./routes/paymentRoutes'); // ✅ Added payment routes
// console.log('✅ paymentRoutes loaded');

// // Middleware
// const errorHandler = require('./middleware/errorHandler');
// console.log('✅ errorHandler loaded');

// // Express app
// const app = express();

// // ✅ CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// // ✅ Built-in Middleware
// app.use(express.json());
// app.use(
//   morgan('dev', {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );

// // ✅ API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/email', emailRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/payments', paymentRoutes); // ✅ Added payment routes endpoint

// // ✅ Global Error Handling
// app.use((err, req, res, next) => {
//   logger.error(`${req.method} ${req.originalUrl} ${err.status || 500} - ${err.message}`);
//   errorHandler(err, req, res, next);
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5001;

// app.listen(PORT, async () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   try {
//     await db.query('SELECT NOW()'); // Check DB connection
//     console.log('✅ Connected to PostgreSQL database');
//   } catch (err) {
//     console.error(`❌ PostgreSQL connection failed: ${err.message}`);
//   }
// });

// // ✅ Global async error catcher
// process.on('unhandledRejection', (err) => {
//   logger.error('❌ Unhandled Rejection:', err);
//   process.exit(1);
// });


///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/index.js

// require("dotenv").config();
// console.log("✅ .env loaded");

// // Core dependencies
// const express = require("express");
// console.log("✅ express loaded");
// const cors = require("cors");
// console.log("✅ cors loaded");
// const morgan = require("morgan");
// console.log("✅ morgan loaded");

// // Utilities & DB
// const logger = require("./utils/logger");
// console.log("✅ logger loaded");
// const db = require("./utils/db");
// console.log("✅ db loaded");

// // Routes
// const authRoutes = require("./routes/authRoutes");
// console.log("✅ authRoutes loaded");
// const carRoutes = require("./routes/carRoutes");
// console.log("✅ carRoutes loaded");
// const userRoutes = require("./routes/userRoutes");
// console.log("✅ userRoutes loaded");
// const emailRoutes = require("./routes/emailRoutes");
// console.log("✅ emailRoutes loaded");
// const adminRoutes = require("./routes/adminRoutes");
// console.log("✅ adminRoutes loaded");
// const paymentRoutes = require("./routes/paymentRoutes"); // ✅ Added payment routes
// console.log("✅ paymentRoutes loaded");

// // Middleware
// const errorHandler = require("./middleware/errorHandler");
// console.log("✅ errorHandler loaded");

// // Express app
// const app = express();

// /**
//  * ✅ CORS configuration (Local + Vercel + optional CLIENT_URL)
//  * - Local dev: http://localhost:5173
//  * - Production: set CLIENT_URL in Render to your Vercel domain
//  * - Also allow Vercel preview domains (*.vercel.app)
//  */
// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.CLIENT_URL, // e.g. https://auto-market25.vercel.app
// ].filter(Boolean);

// const corsOptions = {
//   origin: (origin, callback) => {
//     // allow requests like Postman/curl (no origin)
//     if (!origin) return callback(null, true);

//     // allow listed origins OR any vercel preview domain
//     if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
//       return callback(null, true);
//     }

//     return callback(new Error(`CORS blocked: ${origin}`), false);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // ✅ Built-in Middleware
// app.use(express.json());
// app.use(
//   morgan("dev", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );

// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/cars", carRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/payments", paymentRoutes);

// // ✅ Global Error Handling
// app.use((err, req, res, next) => {
//   logger.error(
//     `${req.method} ${req.originalUrl} ${err.status || 500} - ${err.message}`
//   );
//   errorHandler(err, req, res, next);
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5001;

// app.listen(PORT, async () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   try {
//     await db.query("SELECT NOW()");
//     console.log("✅ Connected to PostgreSQL database");
//   } catch (err) {
//     console.error(`❌ PostgreSQL connection failed: ${err.message}`);
//   }
// });

// // ✅ Global async error catcher
// process.on("unhandledRejection", (err) => {
//   logger.error("❌ Unhandled Rejection:", err);
//   process.exit(1);
// });



// /server/src/index.js
// ✅ Production-ready Express entry (Render + Local + Vercel) without breaking existing routes

require("dotenv").config();
console.log("✅ .env loaded");

// Core
const express = require("express");
console.log("✅ express loaded");
const cors = require("cors");
console.log("✅ cors loaded");
const morgan = require("morgan");
console.log("✅ morgan loaded");

// Utilities & DB
const logger = require("./utils/logger");
console.log("✅ logger loaded");
const db = require("./utils/db");
console.log("✅ db loaded");

// Routes
const authRoutes = require("./routes/authRoutes");
console.log("✅ authRoutes loaded");
const carRoutes = require("./routes/carRoutes");
console.log("✅ carRoutes loaded");
const userRoutes = require("./routes/userRoutes");
console.log("✅ userRoutes loaded");
const emailRoutes = require("./routes/emailRoutes");
console.log("✅ emailRoutes loaded");
const adminRoutes = require("./routes/adminRoutes");
console.log("✅ adminRoutes loaded");
const paymentRoutes = require("./routes/paymentRoutes");
console.log("✅ paymentRoutes loaded");

// Error handler middleware
const errorHandler = require("./middleware/errorHandler");
console.log("✅ errorHandler loaded");

const app = express();

/**
 * ✅ CORS (Local + Vercel + optional CLIENT_URL)
 *
 * Why:
 * - Your Vercel frontend runs on https://auto-market25.vercel.app (or preview *.vercel.app)
 * - If backend only allows localhost, browser will block API calls -> "Failed to fetch" / "Failed to load cars"
 *
 * What to set in Render:
 * - CLIENT_URL = https://auto-market25.vercel.app
 */
const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    process.env.CLIENT_URL, // ex: https://auto-market25.vercel.app
  ].filter(Boolean)
);

const corsOptions = {
  origin: (origin, cb) => {
    // allow server-to-server tools (curl/postman) that send no Origin
    if (!origin) return cb(null, true);

    const isAllowed =
      allowedOrigins.has(origin) ||
      // allow Vercel Preview domains
      /^https:\/\/.*\.vercel\.app$/.test(origin);

    if (isAllowed) return cb(null, true);

    return cb(new Error(`CORS blocked: ${origin}`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Parse JSON
app.use(express.json());

// Request logging (keeps your existing logger)
app.use(
  morgan("dev", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

/**
 * ✅ Health check endpoint
 * - Fixes: "Cannot GET /health"
 * - Useful for Render monitoring and quick DB check
 */
app.get("/health", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() as now");
    res.status(200).json({
      ok: true,
      service: "AutoMarket25 API",
      time: result.rows?.[0]?.now ?? null,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * ✅ Root route (optional but helpful)
 * - Fixes: GET / 404 in Render logs
 * - Doesn’t break anything; just gives a friendly response
 */
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "AutoMarket25 API is running",
    health: "/health",
  });
});

// ✅ API Routes (unchanged)
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

/**
 * ✅ 404 handler for unknown routes (keeps errors clean)
 * - Helps debugging when frontend hits wrong endpoint
 */
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

/**
 * ✅ Global Error Handling
 * - Keeps your existing errorHandler, but ensures CORS errors also return JSON
 */
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ${err.status || 500} - ${err.message}`);

  // Handle CORS errors clearly
  if (err.message && err.message.startsWith("CORS blocked")) {
    return res.status(403).json({ ok: false, error: err.message });
  }

  errorHandler(err, req, res, next);
});

// ✅ Start server (Render uses PORT)
const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try {
    await db.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL database");
  } catch (err) {
    console.error(`❌ PostgreSQL connection failed: ${err.message}`);
  }
});

// ✅ Global async error catcher
process.on("unhandledRejection", (err) => {
  logger.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});
