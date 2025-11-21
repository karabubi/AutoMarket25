// server/src/utils/logger.js

// const winston = require('winston');
// const path = require('path');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.printf(({ timestamp, level, message }) => {
//       return `${timestamp} [${level.toUpperCase()}] - ${message}`;
//     })
//   ),
//   transports: [
//     new winston.transports.Console(), // log to console
//     new winston.transports.File({ filename: path.join(__dirname, '../../logs/app.log') }) // log to file
//   ],
// });

// module.exports = logger;
//-----------------


// /server/src/utils/logger.js
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
