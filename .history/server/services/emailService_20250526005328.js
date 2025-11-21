//Users/salehalkarabubi/works/project/AutoMarket25/server/services/emailService.js
// services/emailService.js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});
module.exports = transporter;
