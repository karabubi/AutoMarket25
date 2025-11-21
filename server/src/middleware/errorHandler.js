
//Users/salehalkarabubi/works/project/AutoMarket25/server/src/middleware/errorHandler.js

const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error with Winston, including method and URL
  logger.error(`${req.method} ${req.url} ${err.status || 500} - ${err.message}`);

  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
