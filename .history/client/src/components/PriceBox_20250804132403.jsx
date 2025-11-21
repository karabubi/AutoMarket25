
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/PriceBox.jsx

// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';

// const PriceBox = ({ price, carId, make, model }) => {
//   const { t } = useTranslation();
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [statusMessage, setStatusMessage] = useState('');

//   // ✅ Email format validator
//   const isValidEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleSendEmail = async () => {
//     if (!userName || !userEmail) {
//       setStatusMessage(t('priceBox.missingFields'));
//       return;
//     }

//     if (!isValidEmail(userEmail)) {
//       setStatusMessage(t('priceBox.invalidEmail'));
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5001/api/email/purchase-request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userName,
//           userEmail,
//           carId,
//           make,
//           model,
//           price,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       setStatusMessage(t('priceBox.success'));
//     } catch (err) {
//       console.error('Email send error:', err);
//       setStatusMessage(t('priceBox.error'));
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md border space-y-4 dark:bg-gray-800 dark:border-gray-700">
//       <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
//         €{price?.toLocaleString()}
//       </h3>
//       <p className="text-sm text-gray-500 dark:text-gray-300">{t('priceBox.negotiable')}</p>

//       <input
//         type="text"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//         placeholder={t('priceBox.namePlaceholder')}
//         className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
//       />
//       <input
//         type="email"
//         value={userEmail}
//         onChange={(e) => setUserEmail(e.target.value)}
//         placeholder={t('priceBox.emailPlaceholder')}
//         className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
//       />
//       <button
//         onClick={handleSendEmail}
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         📧 {t('priceBox.sendEmail')}
//       </button>

//       {statusMessage && (
//         <p className={`text-sm ${statusMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
//           {statusMessage}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PriceBox;

// update 4-08-25


// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   CheckCircleIcon,
//   XCircleIcon,
//   UserIcon,
//   AtSymbolIcon,
//   PaperAirplaneIcon,
// } from '@heroicons/react/24/outline';

// const PriceBox = ({ price, carId, make, model }) => {
//   const { t } = useTranslation();
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [statusMessage, setStatusMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(null);

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSendEmail = async () => {
//     if (!userName || !userEmail) {
//       setStatusMessage(t('priceBox.missingFields'));
//       setIsSuccess(false);
//       return;
//     }

//     if (!isValidEmail(userEmail)) {
//       setStatusMessage(t('priceBox.invalidEmail'));
//       setIsSuccess(false);
//       return;
//     }

//     try {
//       const res = await fetch(
//         'http://localhost:5001/api/email/purchase-request',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             userName,
//             userEmail,
//             carId,
//             make,
//             model,
//             price,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       setStatusMessage(t('priceBox.success')); // Should be: ✅ Message was sent successfully
//       setIsSuccess(true);
//     } catch (err) {
//       console.error('Email send error:', err);
//       setStatusMessage(t('priceBox.error'));
//       setIsSuccess(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-5">
//       {/* Price Display */}
//       <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
//         €{price?.toLocaleString()}
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300">
//         {t('priceBox.negotiable')}
//       </p>

//       {/* Name Field */}
//       <div className="relative">
//         <input
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           placeholder={t('priceBox.namePlaceholder')}
//           className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//         <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
//       </div>

//       {/* Email Field */}
//       <div className="relative">
//         <input
//           type="email"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           placeholder={t('priceBox.emailPlaceholder')}
//           className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//         <AtSymbolIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
//       </div>

//       {/* Send Button */}
//       <button
//         onClick={handleSendEmail}
//         className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
//       >
//         <PaperAirplaneIcon className="h-5 w-5" />
//         <span>{t('priceBox.sendEmail')}</span>
//       </button>

//       {/* Message Feedback */}
//       {statusMessage && (
//         <div
//           className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg border transition ${
//             isSuccess
//               ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600'
//               : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-600'
//           }`}
//         >
//           {isSuccess ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <XCircleIcon className="h-5 w-5" />
//           )}
//           <span>{statusMessage}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceBox;



// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   CheckCircleIcon,
//   XCircleIcon,
//   UserIcon,
//   AtSymbolIcon,
//   PaperAirplaneIcon,
// } from '@heroicons/react/24/outline';

// const PriceBox = ({ price, carId, make, model }) => {
//   const { t } = useTranslation();
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [statusMessage, setStatusMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(null);

//   // Validate email format
//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   // Handle email send request
//   const handleSendEmail = async () => {
//     // Validate required fields
//     if (!userName.trim() || !userEmail.trim()) {
//       setStatusMessage(t('priceBox.missingFields'));
//       setIsSuccess(false);
//       return;
//     }

//     // Validate email format
//     if (!isValidEmail(userEmail)) {
//       setStatusMessage(t('priceBox.invalidEmail'));
//       setIsSuccess(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5001/api/email/purchase-request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userName,
//           userEmail,
//           carId,
//           make,
//           model,
//           price,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to send');

//       setStatusMessage(t('priceBox.success')); // Example: "Message sent successfully!"
//       setIsSuccess(true);
//     } catch (error) {
//       console.error('Email send error:', error);
//       setStatusMessage(t('priceBox.error'));
//       setIsSuccess(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-5">
//       {/* Display Price */}
//       <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
//         €{price?.toLocaleString()}
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300">
//         {t('priceBox.negotiable')}
//       </p>

//       {/* Name Input */}
//       <div className="relative">
//         <input
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           placeholder={t('priceBox.namePlaceholder')}
//           className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
//       </div>

//       {/* Email Input */}
//       <div className="relative">
//         <input
//           type="email"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           placeholder={t('priceBox.emailPlaceholder')}
//           className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <AtSymbolIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
//       </div>

//       {/* Send Email Button */}
//       <button
//         onClick={handleSendEmail}
//         className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
//       >
//         <PaperAirplaneIcon className="h-5 w-5" />
//         <span>{t('priceBox.sendEmail')}</span>
//       </button>

//       {/* Status Feedback */}
//       {statusMessage && (
//         <div
//           className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg border transition ${
//             isSuccess
//               ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600'
//               : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-600'
//           }`}
//         >
//           {isSuccess ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <XCircleIcon className="h-5 w-5" />
//           )}
//           <span>{statusMessage}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceBox;
