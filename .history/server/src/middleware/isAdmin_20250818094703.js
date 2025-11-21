//----update 

// //Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/middleware/isAdmin.js

// module.exports = (req, res, next) => {
//   if (req.user && req.user.is_admin) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Admin access only.' });
//   }
// };

// updat 3-08-25

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/middleware/isAdmin.js
module.exports = (req, res, next) => {
  // 🚨 Check explicitly for true
  if (req.user && req.user.is_admin === true) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only.' });
  }
};
