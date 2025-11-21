
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
// import { CheckCircleIcon, XCircleIcon, UserIcon, AtSymbolIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

// const PriceBox = ({ price, carId, make, model }) => {
//   const { t } = useTranslation();
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [statusMessage, setStatusMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(null);

//   // Email format validator (returns true if email is valid)
//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSendEmail = async () => {
//     // Validate required fields
//     if (!userName || !userEmail) {
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
//       const res = await fetch('http://localhost:5001/api/email/purchase-request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userName, userEmail, carId, make, model, price }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       // Success: display success message
//       setStatusMessage(t('priceBox.success'));
//       setIsSuccess(true);
//     } catch (err) {
//       console.error('Email send error:', err);
//       // Error: display failure message
//       setStatusMessage(t('priceBox.error'));
//       setIsSuccess(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
//       {/* Price Display */}
//       <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
//         €{price?.toLocaleString()}
//       </h3>
//       <p className="text-sm text-gray-500 dark:text-gray-300">
//         {t('priceBox.negotiable')}
//       </p>

//       {/* Name Input with Icon */}
//       <div className="relative">
//         <input
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           placeholder={t('priceBox.namePlaceholder')}
//           className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <UserIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//         </div>
//       </div>

//       {/* Email Input with Icon */}
//       <div className="relative">
//         <input
//           type="email"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           placeholder={t('priceBox.emailPlaceholder')}
//           className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <AtSymbolIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//         </div>
//       </div>

//       {/* Send Email Button */}
//       <button
//         onClick={handleSendEmail}
//         className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
//       >
//         <PaperAirplaneIcon className="h-5 w-5" />
//         <span>{t('priceBox.sendEmail')}</span>
//       </button>

//       {/* Status Message Alert (success or error) */}
//       {statusMessage && (
//         <div
//           className={
//             "flex items-center text-sm font-medium p-2 rounded border " +
//             (isSuccess 
//               ? "bg-green-50 text-green-700 border-green-400 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-200 dark:border-green-400" 
//               : "bg-red-50 text-red-700 border-red-400 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-200 dark:border-red-400")
//           }
//         >
//           {isSuccess ? (
//             <CheckCircleIcon className="h-5 w-5 mr-2" />
//           ) : (
//             <XCircleIcon className="h-5 w-5 mr-2" />
//           )}
//           <span>{statusMessage}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceBox;
