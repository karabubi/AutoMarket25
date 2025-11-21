//Users/salehalkarabubi/works/project/AutoMarket25/server/src/controllers/emailController.js

// const transporter = require('../services/emailService');

// exports.purchaseRequest = async (req, res) => {
//   try {
//     const { userName, userEmail, carId, make, model, price } = req.body;

//     // Validate all fields
//     if (!userName || !userEmail || !carId || !make || !model || !price) {
//       return res.status(400).json({ message: 'Missing required fields.' });
//     }

//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to: 'alkarabubi@gmail.com',
//       subject: `Purchase Request: ${make} ${model}`,
//       text: `
// New Purchase Request:

// Name: ${userName}
// Email: ${userEmail}
// Car ID: ${carId}
// Make: ${make}
// Model: ${model}
// Price: €${price}
//       `,
//       html: `
//         <h2>New Purchase Request</h2>
//         <p><strong>Name:</strong> ${userName}</p>
//         <p><strong>Email:</strong> ${userEmail}</p>
//         <p><strong>Car ID:</strong> ${carId}</p>
//         <p><strong>Make:</strong> ${make}</p>
//         <p><strong>Model:</strong> ${model}</p>
//         <p><strong>Price:</strong> €${parseFloat(price).toFixed(2)}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: '✅ Email sent successfully' });
//   } catch (error) {
//     console.error('❌ Email sending failed:', error.message);
//     res.status(500).json({ message: 'Failed to send email.' });
//   }
// };


// 