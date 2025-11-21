
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/authController.js

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const generateToken = require('../utils/token');

// exports.register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const existingUser = await User.findByEmail(email);
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const user = await User.create({ name, email, password });
//     const token = generateToken(user.id);
//     res.json({ user, token });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = generateToken(user.id);
//     res.json({ user, token });
//   } catch (err) {
//     next(err);
//   }
// };

// // ✅ NEW: Return current authenticated user
// exports.getMe = async (req, res, next) => {
//   try {
//     const userId = req.user?.id; // `req.user` is set by protect middleware
//     if (!userId) return res.status(401).json({ message: 'Unauthorized' });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };


//-----update 


// //Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/authController.js
// const asyncHandler = require('express-async-handler');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const db = require('../utils/db');

// // Helper to generate JWT token
// const generateToken = (payload) =>
//   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, is_admin } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error('Please include all required fields');
//   }

//   // Check if user already exists
//   const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
//   if (existing.rows.length > 0) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const result = await db.query(
//     `INSERT INTO users (name, email, password, is_admin)
//      VALUES ($1, $2, $3, $4)
//      RETURNING id, name, email, is_admin`,
//     [name, email, hashedPassword, is_admin || false]
//   );

//   const user = result.rows[0];
//   const token = generateToken({ id: user.id, is_admin: user.is_admin });

//   res.status(201).json({ ...user, token });
// });

// // @desc    Authenticate user and get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
//   const user = result.rows[0];

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }

//   const token = generateToken({ id: user.id, is_admin: user.is_admin });

//   res.json({
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     is_admin: user.is_admin,
//     token,
//   });
// });

// module.exports = { registerUser, loginUser };