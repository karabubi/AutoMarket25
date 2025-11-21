// update 

// import React, { useState, useEffect } from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';


// // Register Chart.js components (ArcElement for pie charts)
// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


// const AdminReport = () => {
//  const [cars, setCars] = useState([]);


//  useEffect(() => {
//    // Fetch car data (same endpoint)
//    fetch('/api/cars')
//      .then(res => res.json())
//      .then(data => setCars(data))
//      .catch(err => console.error(err));
//  }, []);


//  // Compute totals for charts
//  const totalPaid = cars.reduce((sum, car) => sum + (car.paid_amount || 0), 0);
//  const totalUnpaid = cars.reduce((sum, car) => sum + (car.not_paid_amount || 0), 0);


//  // Bar chart data (Paid vs Unpaid per car)
//  const barData = {
//    labels: cars.map(car => `${car.make} ${car.model}`),
//    datasets: [
//      {
//        label: 'Paid Amount',
//        data: cars.map(car => car.paid_amount),
//        backgroundColor: 'rgba(34,197,94,0.6)',
//      },
//      {
//        label: 'Not Paid Amount',
//        data: cars.map(car => car.not_paid_amount),
//        backgroundColor: 'rgba(239,68,68,0.6)',
//      },
//    ],
//  };
//  const barOptions = {
//    responsive: true,
//    plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Paid vs Unpaid Per Car' } },
//  };


//  // Pie chart data (Overall totals)
//  const pieData = {
//    labels: ['Total Paid', 'Total Unpaid'],
//    datasets: [
//      {
//        data: [totalPaid, totalUnpaid],
//        backgroundColor: ['#22c55e', '#ef4444'],
//      },
//    ],
//  };
//  const pieOptions = {
//    responsive: true,
//    plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Overall Paid vs Unpaid' } },
//  };


//  return (
//    <div className="p-6 bg-white rounded-lg shadow">
//      <h2 className="text-2xl font-semibold mb-4">Admin Report</h2>
//      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//        {/* Bar Chart */}
//        <div className="bg-gray-50 p-4 rounded">
//          <Bar data={barData} options={barOptions} />
//        </div>
//        {/* Pie Chart */}
//        <div className="bg-gray-50 p-4 rounded">
//          <Pie data={pieData} options={pieOptions} />
//        </div>
//      </div>
//    </div>
//  );
// };


// export default AdminReport;



//----------updat 2



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminReport = () => {
//   const [report, setReport] = useState([]);
//   const [totals, setTotals] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const response = await axios.get('/api/admin/report', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setReport(response.data.report);
//       setTotals(response.data.totals);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching report:', err);
//     }
//   };

//   const handlePaymentUpdate = async (carId, field, value) => {
//     try {
//       const payload = { 
//         paid_amount: field === 'paid' ? value : report.find(r => r.id === carId).paid_amount,
//         not_paid_amount: field === 'unpaid' ? value : report.find(r => r.id === carId).not_paid_amount
//       };
      
//       await axios.put(`/api/admin/payments/${carId}`, payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
      
//       setReport(report.map(item => 
//         item.id === carId ? { ...item, ...payload } : item
//       ));
//     } catch (err) {
//       console.error('Error updating payment:', err);
//     }
//   };

//   const exportCSV = async () => {
//     try {
//       const response = await axios.get('/api/admin/export/csv', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         responseType: 'blob'
//       });
      
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'report.csv');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error('Error exporting CSV:', err);
//     }
//   };

//   const exportPDF = async () => {
//     try {
//       const response = await axios.get('/api/admin/export/pdf', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         responseType: 'blob'
//       });
      
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'report.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error('Error exporting PDF:', err);
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading report...</div>;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-end space-x-4">
//         <button 
//           onClick={exportCSV}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//         >
//           Export CSV
//         </button>
//         <button 
//           onClick={exportPDF}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (€)</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid (€)</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Not Paid (€)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {report.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.make}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.model}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{item.price}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <input
//                     type="number"
//                     value={item.paid_amount}
//                     onChange={e => handlePaymentUpdate(item.id, 'paid', e.target.value)}
//                     className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                   />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <input
//                     type="number"
//                     value={item.not_paid_amount}
//                     onChange={e => handlePaymentUpdate(item.id, 'unpaid', e.target.value)}
//                     className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                   />
//                 </td>
//               </tr>
//             ))}
//             <tr className="bg-gray-50 font-bold">
//               <td className="px-6 py-4 text-sm">TOTAL</td>
//               <td className="px-6 py-4"></td>
//               <td className="px-6 py-4 text-sm">€{totals.totalPrice?.toFixed(2)}</td>
//               <td className="px-6 py-4 text-sm">€{totals.totalPaid?.toFixed(2)}</td>
//               <td className="px-6 py-4 text-sm">€{totals.totalNotPaid?.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;



//-------updat 3



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminReport = () => {
//   const [report, setReport] = useState([]); // ✅ default empty array to avoid map error
//   const [totals, setTotals] = useState({ totalPrice: 0, totalPaid: 0, totalNotPaid: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const response = await axios.get('/api/admin/report', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       setReport(Array.isArray(response.data.report) ? response.data.report : []);
//       setTotals(response.data.totals || {});
//     } catch (err) {
//       console.error('Error fetching report:', err);
//       setError('Failed to load report.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePaymentUpdate = async (carId, field, value) => {
//     try {
//       const original = report.find(r => r.id === carId);
//       if (!original) return;

//       const payload = {
//         paid_amount: field === 'paid' ? value : original.paid_amount,
//         not_paid_amount: field === 'unpaid' ? value : original.not_paid_amount
//       };

//       await axios.put(`/api/admin/payments/${carId}`, payload, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       setReport(report.map(item => 
//         item.id === carId ? { ...item, ...payload } : item
//       ));
//     } catch (err) {
//       console.error('Error updating payment:', err);
//     }
//   };

//   const exportCSV = async () => {
//     try {
//       const response = await axios.get('/api/admin/export/csv', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         responseType: 'blob'
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'report.csv');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error('Error exporting CSV:', err);
//     }
//   };

//   const exportPDF = async () => {
//     try {
//       const response = await axios.get('/api/admin/export/pdf', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         responseType: 'blob'
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'report.pdf');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error('Error exporting PDF:', err);
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading report...</div>;
//   if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

//   return (
//     <div className="space-y-6 p-6 max-w-7xl mx-auto">
//       <div className="flex justify-end space-x-4">
//         <button 
//           onClick={exportCSV}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//         >
//           Export CSV
//         </button>
//         <button 
//           onClick={exportPDF}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Make</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (€)</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid (€)</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Not Paid (€)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {report.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.make}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">{item.model}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">€{item.price}</td>
//                 <td className="px-6 py-4">
//                   <input
//                     type="number"
//                     value={item.paid_amount}
//                     onChange={e => handlePaymentUpdate(item.id, 'paid', e.target.value)}
//                     className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                   />
//                 </td>
//                 <td className="px-6 py-4">
//                   <input
//                     type="number"
//                     value={item.not_paid_amount}
//                     onChange={e => handlePaymentUpdate(item.id, 'unpaid', e.target.value)}
//                     className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                   />
//                 </td>
//               </tr>
//             ))}
//             <tr className="bg-gray-50 font-bold">
//               <td className="px-6 py-4 text-sm">TOTAL</td>
//               <td></td>
//               <td className="px-6 py-4 text-sm">€{totals.totalPrice?.toFixed(2)}</td>
//               <td className="px-6 py-4 text-sm">€{totals.totalPaid?.toFixed(2)}</td>
//               <td className="px-6 py-4 text-sm">€{totals.totalNotPaid?.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;



//-------update 4


//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminReport.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminReport = () => {
//   const [report, setReport] = useState([]);
//   const [totals, setTotals] = useState({ totalPrice: 0, totalPaid: 0, totalNotPaid: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const res = await axios.get('/api/admin/report', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       setReport(Array.isArray(res.data.report) ? res.data.report : []);
//       setTotals(res.data.totals || {});
//     } catch (err) {
//       console.error('Error fetching report:', err);
//       setError('Failed to load report data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading report...</div>;
//   if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

//   return (
//     <div className="space-y-6 p-6 max-w-7xl mx-auto">
//       <div className="flex justify-end space-x-4">
//         <button 
//           onClick={() => alert('CSV Export not yet implemented')}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//         >
//           Export CSV
//         </button>
//         <button 
//           onClick={() => alert('PDF Export not yet implemented')}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Make</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (€)</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid (€)</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Not Paid (€)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {report.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.make}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">{item.model}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">€{Number(item.price).toFixed(2)}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">€{Number(item.paid_amount).toFixed(2)}</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">€{Number(item.not_paid_amount).toFixed(2)}</td>
//               </tr>
//             ))}
//             <tr className="bg-gray-50 font-bold">
//               <td className="px-6 py-4 text-sm">TOTAL</td>
//               <td></td>
//               <td className="px-6 py-4 text-sm">€{totals.totalPrice?.toFixed(2)}</td>
//               <td className="px-6 py-4 text-sm">€{totals.totalPaid?.toFixed(2)}</td>
//               <td className="px-6 py-4 text-sm">€{totals.totalNotPaid?.toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;


//----------update 5




// client/src/pages/AdminReport.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminReport = () => {
//   const [report, setReport] = useState([]);
//   const [totals, setTotals] = useState({ totalPrice: 0, totalPaid: 0, totalNotPaid: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('/api/admin/report', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setReport(response.data.report || []);
//       setTotals(response.data.totals || {});
//     } catch (err) {
//       console.error('Error fetching report:', err);
//       setError('Failed to load report.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading report...</div>;
//   if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-end gap-4 mb-4">
//         <button
//           onClick={() => alert('CSV export coming soon')}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Export CSV
//         </button>
//         <button
//           onClick={() => alert('PDF export coming soon')}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Make</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Model</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Price (€)</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Paid (€)</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Not Paid (€)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {report.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4">{item.make}</td>
//                 <td className="px-6 py-4">{item.model}</td>
//                 <td className="px-6 py-4">€{Number(item.price).toFixed(2)}</td>
//                 <td className="px-6 py-4">€{Number(item.paid_amount).toFixed(2)}</td>
//                 <td className="px-6 py-4">€{Number(item.not_paid_amount).toFixed(2)}</td>
//               </tr>
//             ))}
//             <tr className="font-bold bg-gray-50">
//               <td className="px-6 py-4">TOTAL</td>
//               <td></td>
//               <td className="px-6 py-4">€{Number(totals.totalPrice).toFixed(2)}</td>
//               <td className="px-6 py-4">€{Number(totals.totalPaid).toFixed(2)}</td>
//               <td className="px-6 py-4">€{Number(totals.totalNotPaid).toFixed(2)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;


//-------update 6



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminReport = () => {
//   const [report, setReport] = useState([]);
//   const [totals, setTotals] = useState({
//     totalPrice: 0,
//     totalPaid: 0,
//     totalNotPaid: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('/api/admin/report', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const { report, totals } = response.data;

//       setReport(Array.isArray(report) ? report : []);
//       setTotals({
//         totalPrice: parseFloat(totals?.totalPrice || 0),
//         totalPaid: parseFloat(totals?.totalPaid || 0),
//         totalNotPaid: parseFloat(totals?.totalNotPaid || 0),
//       });
//     } catch (err) {
//       console.error('Error fetching report:', err);
//       setError('Failed to load report.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (value) => {
//     const number = parseFloat(value);
//     return isNaN(number) ? '€0.00' : `€${number.toFixed(2)}`;
//   };

//   if (loading) return <div className="text-center py-10">Loading report...</div>;
//   if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-end gap-4 mb-4">
//         <button
//           onClick={() => alert('CSV export coming soon')}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Export CSV
//         </button>
//         <button
//           onClick={() => alert('PDF export coming soon')}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Make</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Model</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Price (€)</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Paid (€)</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Not Paid (€)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {report.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4">{item.make}</td>
//                 <td className="px-6 py-4">{item.model}</td>
//                 <td className="px-6 py-4">{formatCurrency(item.price)}</td>
//                 <td className="px-6 py-4">{formatCurrency(item.paid_amount)}</td>
//                 <td className="px-6 py-4">{formatCurrency(item.not_paid_amount)}</td>
//               </tr>
//             ))}
//             <tr className="font-bold bg-gray-50">
//               <td className="px-6 py-4">TOTAL</td>
//               <td></td>
//               <td className="px-6 py-4">{formatCurrency(totals.totalPrice)}</td>
//               <td className="px-6 py-4">{formatCurrency(totals.totalPaid)}</td>
//               <td className="px-6 py-4">{formatCurrency(totals.totalNotPaid)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;


//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminReport.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminReport = () => {
//   const [report, setReport] = useState([]);
//   const [totals, setTotals] = useState({ totalPrice: 0, totalPaid: 0, totalNotPaid: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/admin/report', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const reportData = res.data.report || [];
//       const totalsData = res.data.totals || { totalPrice: 0, totalPaid: 0, totalNotPaid: 0 };

//       setReport(reportData);
//       setTotals({
//         totalPrice: parseFloat(totalsData.totalPrice),
//         totalPaid: parseFloat(totalsData.totalPaid),
//         totalNotPaid: parseFloat(totalsData.totalNotPaid),
//       });
//     } catch (err) {
//       console.error('Error fetching report:', err);
//       setError('Failed to load report.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (value) => {
//     const number = parseFloat(value);
//     return isNaN(number) ? '€0.00' : `€${number.toFixed(2)}`;
//   };

//   if (loading) return <div className="text-center py-10">Loading report...</div>;
//   if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-end gap-4 mb-4">
//         <button
//           onClick={() => alert('CSV export coming soon')}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Export CSV
//         </button>
//         <button
//           onClick={() => alert('PDF export coming soon')}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Make</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Model</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Price (€)</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Paid (€)</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-600">Not Paid (€)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {report.length > 0 ? (
//               report.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-6 py-4">{item.make}</td>
//                   <td className="px-6 py-4">{item.model}</td>
//                   <td className="px-6 py-4">{formatCurrency(item.price)}</td>
//                   <td className="px-6 py-4">{formatCurrency(item.paid_amount)}</td>
//                   <td className="px-6 py-4">{formatCurrency(item.not_paid_amount)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">No report data available.</td>
//               </tr>
//             )}
//             <tr className="font-bold bg-gray-50">
//               <td className="px-6 py-4">TOTAL</td>
//               <td></td>
//               <td className="px-6 py-4">{formatCurrency(totals.totalPrice)}</td>
//               <td className="px-6 py-4">{formatCurrency(totals.totalPaid)}</td>
//               <td className="px-6 py-4">{formatCurrency(totals.totalNotPaid)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminReport;


//---------update 


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