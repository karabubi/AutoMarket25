
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/index.js
require('dotenv').config();
console.log('✅ .env loaded');

// Core dependencies
const express = require('express');
console.log('✅ express loaded');
const cors = require('cors');
console.log('✅ cors loaded');
const morgan = require('morgan');
console.log('✅ morgan loaded');

// Utilities & DB
const logger = require('./utils/logger');
console.log('✅ logger loaded');
const db = require('./utils/db');
console.log('✅ db loaded');

// Routes
const authRoutes = require('./routes/authRoutes');
console.log('✅ authRoutes loaded');
const carRoutes = require('./routes/carRoutes');
console.log('✅ carRoutes loaded');
const userRoutes = require('./routes/userRoutes');
console.log('✅ userRoutes loaded');
const emailRoutes = require('./routes/emailRoutes');
console.log('✅ emailRoutes loaded');
const adminRoutes = require('./routes/adminRoutes');
console.log('✅ adminRoutes loaded');
const paymentRoutes = require('./routes/paymentRoutes'); // ✅ Added payment routes
console.log('✅ paymentRoutes loaded');

// Middleware
const errorHandler = require('./middleware/errorHandler');
console.log('✅ errorHandler loaded');

// Express app
const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Built-in Middleware
app.use(express.json());
app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes); // ✅ Added payment routes endpoint

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ${err.status || 500} - ${err.message}`);
  errorHandler(err, req, res, next);
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try {
    await db.query('SELECT NOW()'); // Check DB connection
    console.log('✅ Connected to PostgreSQL database');
  } catch (err) {
    console.error(`❌ PostgreSQL connection failed: ${err.message}`);
  }
});

// ✅ Global async error catcher
process.on('unhandledRejection', (err) => {
  logger.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

