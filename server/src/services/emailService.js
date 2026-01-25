
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/services/emailService.js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});
module.exports = transporter;