
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/middleware/ensureAdmin.js
const ensureAdmin = (req, res, next) => {
  if (req.user && (req.user.is_admin || req.user.isAdmin)) {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
};

module.exports = { ensureAdmin };