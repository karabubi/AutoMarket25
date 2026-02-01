
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/index.js
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

// ✅ NEW: Car Images Routes
const carImageRoutes = require("./routes/carImageRoutes");
console.log("✅ carImageRoutes loaded");

// Error handler middleware
const errorHandler = require("./middleware/errorHandler");
console.log("✅ errorHandler loaded");

const app = express();

/**
 * ✅ CORS (Local + Vercel + optional CLIENT_URL)
 */
const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    process.env.CLIENT_URL, // ex: https://auto-market25.vercel.app
  ].filter(Boolean)
);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);

    const isAllowed =
      allowedOrigins.has(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);

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

// Request logging
app.use(
  morgan("dev", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

/**
 * ✅ Health check endpoint
 */
const healthHandler = async (req, res) => {
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
};

app.get("/health", healthHandler);
app.get("/api/health", healthHandler); // ✅ added (fixes your curl /api/health)

/**
 * ✅ Root route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "AutoMarket25 API is running",
    health: "/health",
  });
});

// ✅ API Routes (keep existing)
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ NEW: Car Image Routes
// This enables:
// POST   /api/cars/:carId/images
// GET    /api/cars/:carId/images
// DELETE /api/car-images/:id
app.use("/api", carImageRoutes);

/**
 * ✅ 404 handler for unknown routes
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
 */
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ${err.status || 500} - ${err.message}`);

  if (err.message && err.message.startsWith("CORS blocked")) {
    return res.status(403).json({ ok: false, error: err.message });
  }

  errorHandler(err, req, res, next);
});

// ✅ Start server
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
  //process.exit(1);
});
