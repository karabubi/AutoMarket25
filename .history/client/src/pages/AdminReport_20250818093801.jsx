
//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminReport.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AdminReport = () => {
  const [report, setReport] = useState([]);
  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalPaid: 0,
    totalNotPaid: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/report', {
        headers: { Authorization: `Bearer ${token}` },
      });

      processReportData(res.data.report || []);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load report. Please try again later.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const processReportData = (rawData) => {
    if (!rawData.length) {
      setLoading(false);
      return;
    }

    let totalPrice = 0;
    let totalPaid = 0;
    let totalNotPaid = 0;

    const processedData = rawData.map((item) => {
      const price = parseNumber(item.price);
      const paid = parseNumber(item.paid_amount);
      const not_paid_amount = paid < price ? roundToTwo(price - paid) : null;

      totalPrice = roundToTwo(totalPrice + price);
      totalPaid = roundToTwo(totalPaid + paid);
      if (not_paid_amount !== null) {
        totalNotPaid = roundToTwo(totalNotPaid + not_paid_amount);
      }

      return {
        ...item,
        price,
        paid_amount: paid,
        not_paid_amount,
      };
    });

    setReport(processedData);
    setTotals({ 
      totalPrice, 
      totalPaid,
      totalNotPaid: Math.max(0, totalNotPaid)
    });
    setLoading(false);
  };

  const parseNumber = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;
    
    const cleanValue = value
      .replace(/[^\d.-]/g, '')
      .replace(/,/g, '');
    
    const number = parseFloat(cleanValue);
    return isNaN(number) ? 0 : roundToTwo(number);
  };

  const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '—';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  if (loading) return <div className="text-center py-10">Loading report...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => alert('CSV export coming soon')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Export CSV
        </button>
        <button
          onClick={() => alert('PDF export coming soon')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Export PDF
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Make</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Model</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Paid</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Not Paid</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {report.length > 0 ? (
              report.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{item.make || '—'}</td>
                  <td className="px-6 py-4">{item.model || '—'}</td>
                  <td className="px-6 py-4">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-4">{formatCurrency(item.paid_amount)}</td>
                  <td className="px-6 py-4">
                    {item.not_paid_amount === null ? '—' : formatCurrency(item.not_paid_amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No report data available.
                </td>
              </tr>
            )}
            <tr className="font-bold bg-gray-50">
              <td className="px-6 py-4">TOTAL</td>
              <td></td>
              <td className="px-6 py-4">{formatCurrency(totals.totalPrice)}</td>
              <td className="px-6 py-4">{formatCurrency(totals.totalPaid)}</td>
              <td className="px-6 py-4">{formatCurrency(totals.totalNotPaid)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;