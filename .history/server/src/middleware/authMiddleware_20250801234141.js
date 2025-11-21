
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded.id; // 🔑 Important for identifying the user
//       next();
//     } catch (err) {
//       console.error('JWT verification error:', err.message);
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Token missing' });
//   }
// };

// module.exports = protect;

//-----update 
