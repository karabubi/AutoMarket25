
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] - ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    colorize(),        // Adds colors in console
    customFormat
  ),
  transports: [
    new transports.Console(),                  // Logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Only errors
    new transports.File({ filename: 'logs/combined.log' }),              // All logs
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ]
});

module.exports = logger;
