
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/PriceBox.jsx

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PriceBox = ({ price, carId, make, model }) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // ✅ Email format validator
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendEmail = async () => {
    if (!userName || !userEmail) {
      setStatusMessage(t('priceBox.missingFields'));
      return;
    }

    if (!isValidEmail(userEmail)) {
      setStatusMessage(t('priceBox.invalidEmail'));
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/email/purchase-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userEmail,
          carId,
          make,
          model,
          price,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStatusMessage(t('priceBox.success'));
    } catch (err) {
      console.error('Email send error:', err);
      setStatusMessage(t('priceBox.error'));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border space-y-4 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
        €{price?.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{t('priceBox.negotiable')}</p>

      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder={t('priceBox.namePlaceholder')}
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder={t('priceBox.emailPlaceholder')}
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={handleSendEmail}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        📧 {t('priceBox.sendEmail')}
      </button>

      {statusMessage && (
        <p className={`text-sm ${statusMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default PriceBox;

