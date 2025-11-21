//----update 

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/middleware/isAdmin.js
// update 1-08-25

// isAdmin.js
module.exports = (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only.' });
  }
};
