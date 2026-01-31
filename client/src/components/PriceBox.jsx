
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/PriceBox.jsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  AtSymbolIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

// ✅ IMPORTANT: use the shared API helper (works on localhost + Vercel)
import { sendPurchaseRequest } from "../utils/api";

const PriceBox = ({ price, carId, make, model }) => {
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // Validate email format with regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendEmail = async () => {
    // reset old status
    setStatusMessage("");
    setIsSuccess(null);

    // Validate required fields
    if (!userName.trim() || !userEmail.trim() || !userMessage.trim()) {
      setStatusMessage(t("priceBox.missingFields"));
      setIsSuccess(false);
      return;
    }

    // Validate email format
    if (!isValidEmail(userEmail)) {
      setStatusMessage(t("priceBox.invalidEmail"));
      setIsSuccess(false);
      return;
    }

    setIsSending(true);

    try {
      // ✅ Send via API helper (baseURL handles dev/prod)
      await sendPurchaseRequest({
        userName: userName.trim(),
        userEmail: userEmail.trim(),
        message: userMessage.trim(),
        carId,
        make,
        model,
        price,
      });

      // success
      setStatusMessage(t("priceBox.success"));
      setIsSuccess(true);

      // clear fields
      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (err) {
      // ✅ Better error message extraction
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        null;

      console.error("Email send error:", err?.response?.data || err);

      setStatusMessage(serverMsg || t("priceBox.error"));
      setIsSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-5">
      {/* Display Price */}
      <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
        €{price?.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {t("priceBox.negotiable")}
      </p>

      {/* Name Input */}
      <div className="relative">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={t("priceBox.namePlaceholder")}
          className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <UserIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Email Input */}
      <div className="relative">
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder={t("priceBox.emailPlaceholder")}
          className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <AtSymbolIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Message Textarea */}
      <div className="relative">
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={t("priceBox.messagePlaceholder")}
          rows={4}
          className="w-full min-h-[4rem] max-h-32 pl-11 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      {/* Send Email Button */}
      <button
        onClick={handleSendEmail}
        disabled={isSending}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
                   disabled:opacity-60 disabled:cursor-not-allowed
                   text-white font-semibold py-2 px-4 rounded-lg transition 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
        <span>{isSending ? t("priceBox.sending") || "Sending..." : t("priceBox.sendEmail")}</span>
      </button>

      {/* Status Feedback */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg border transition ${
            isSuccess
              ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-600"
              : "bg-red-100 text-red-800 border-red-300 dark:bg-red-800 dark:text-red-100 dark:border-red-600"
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
