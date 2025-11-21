
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
//   const [userMessage, setUserMessage] = useState('');  // New state for the message
//   const [statusMessage, setStatusMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(null);

//   // Validate email format with regex
//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   // Handle email send request
//   const handleSendEmail = async () => {
//     // Validate required fields (name, email, message)
//     if (!userName.trim() || !userEmail.trim() || !userMessage.trim()) {
//       setStatusMessage(t('priceBox.missingFields'));  // e.g. "Please fill in all fields."
//       setIsSuccess(false);
//       return;
//     }

//     // Validate email format
//     if (!isValidEmail(userEmail)) {
//       setStatusMessage(t('priceBox.invalidEmail'));   // e.g. "Invalid email address."
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
//           message: userMessage,    // Include the user's message in the request body
//           carId,
//           make,
//           model,
//           price,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to send');
//       }

//       // If successful:
//       setStatusMessage(t('priceBox.success'));   // e.g. "Message sent successfully!"
//       setIsSuccess(true);
//       // Optionally, clear the form fields upon success:
//       setUserName('');
//       setUserEmail('');
//       setUserMessage('');
//     } catch (error) {
//       console.error('Email send error:', error);
//       setStatusMessage(t('priceBox.error'));     // e.g. "Failed to send message. Please try again."
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
//           placeholder={t('priceBox.namePlaceholder')}    /* e.g. "Your Name" */
//           className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
//                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
//                      placeholder-gray-500 dark:placeholder-gray-400 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
//       </div>

//       {/* Email Input */}
//       <div className="relative">
//         <input
//           type="email"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           placeholder={t('priceBox.emailPlaceholder')}   /* e.g. "Your Email" */
//           className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
//                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
//                      placeholder-gray-500 dark:placeholder-gray-400 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <AtSymbolIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
//       </div>

//       {/* Message Textarea */}
//       <div className="relative">
//         <textarea
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           placeholder={t('priceBox.messagePlaceholder')}  /* e.g. "Your Message" */
//           rows={4}
//           className="w-full min-h-[4rem] max-h-32 pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
//                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
//                      placeholder-gray-500 dark:placeholder-gray-400 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
//         />
//         {/* An icon for message (optional, e.g., a chat icon) could be placed similar to UserIcon if desired */}
//         {/* <ChatBubbleLeftIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" /> */}
//       </div>

//       {/* Send Email Button */}
//       <button
//         onClick={handleSendEmail}
//         className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
//                    text-white font-semibold py-2 px-4 rounded-lg transition 
//                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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


import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  AtSymbolIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const PriceBox = ({ price, carId, make, model }) => {
  const { t } = useTranslation();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendEmail = async () => {
    // Reset status
    setStatusMessage('');
    setIsSuccess(null);

    // Frontend validation
    if (!userName.trim() || !userEmail.trim() || !userMessage.trim()) {
      setStatusMessage(t('priceBox.missingFields') || 'Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    if (!isValidEmail(userEmail)) {
      setStatusMessage(t('priceBox.invalidEmail') || 'Invalid email address.');
      setIsSuccess(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/email/purchase-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userEmail,
          message: userMessage,
          carId,
          make,
          model,
          price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email.');
      }

      setStatusMessage(t('priceBox.success') || 'Message sent successfully.');
      setIsSuccess(true);
      setUserName('');
      setUserEmail('');
      setUserMessage('');
    } catch (error) {
      console.error('Email send error:', error.message);
      setStatusMessage(
        t('priceBox.error') || 'Failed to send message. Please check the email address or try again later.'
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-5">
      {/* Price */}
      <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
        €{price?.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {t('priceBox.negotiable') || 'Negotiable'}
      </p>

      {/* Name Input */}
      <div className="relative">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={t('priceBox.namePlaceholder') || 'Your name'}
          className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Email Input */}
      <div className="relative">
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder={t('priceBox.emailPlaceholder') || 'Your email'}
          className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <AtSymbolIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Message Input */}
      <div className="relative">
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={t('priceBox.messagePlaceholder') || 'Your message'}
          rows={4}
          className="w-full min-h-[4rem] max-h-32 pl-4 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={handleSendEmail}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isLoading
            ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:focus:ring-offset-gray-900'
        }`}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
        <span>{isLoading ? t('priceBox.sending') || 'Sending...' : t('priceBox.sendEmail') || 'Send Email'}</span>
      </button>

      {/* Status Feedback */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg border transition ${
            isSuccess
              ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600'
              : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-600'
          }`}
        >
          {isSuccess ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <XCircleIcon className="h-5 w-5" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};

export default PriceBox;
