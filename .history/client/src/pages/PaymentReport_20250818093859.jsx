// ---------update  



//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/PaymentReport.jsx


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const PaymentReport = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get('/api/admin/payments', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPayments(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch payment data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchPayments();
//   }, [token]);

//   const totals = payments.reduce(
//     (acc, p) => {
//       acc.paid += Number(p.paid_amount) || 0;
//       acc.unpaid += Number(p.not_paid_amount) || 0;
//       return acc;
//     },
//     { paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: payments.map((p) => `Car #${p.car_id}`),
//     datasets: [
//       {
//         label: 'Paid Amount',
//         data: payments.map((p) => Number(p.paid_amount)),
//         backgroundColor: 'rgba(34,197,94,0.6)',
//       },
//       {
//         label: 'Not Paid Amount',
//         data: payments.map((p) => Number(p.not_paid_amount)),
//         backgroundColor: 'rgba(239,68,68,0.6)',
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Payment Summary Per Car' },
//     },
//   };

//   if (loading) return <div className="p-6 text-center text-lg">Loading payment data...</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Payment Report</h1>
//         <Link
//           to="/dashboard/admin"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Back to Admin Dashboard
//         </Link>
//       </div>

//       {error && <div className="text-red-600 mb-6 font-semibold">{error}</div>}

//       <div className="overflow-x-auto mb-10">
//         <table className="min-w-full bg-white rounded shadow text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Payment ID</th>
//               <th className="px-4 py-2 text-left">Car ID</th>
//               <th className="px-4 py-2 text-right">Paid</th>
//               <th className="px-4 py-2 text-right">Unpaid</th>
//               <th className="px-4 py-2 text-right">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((p) => (
//               <tr key={p.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{p.id}</td>
//                 <td className="px-4 py-2">#{p.car_id}</td>
//                 <td className="px-4 py-2 text-right">€{Number(p.paid_amount).toFixed(2)}</td>
//                 <td className="px-4 py-2 text-right">€{Number(p.not_paid_amount).toFixed(2)}</td>
//                 <td className="px-4 py-2 text-right">
//                   {new Date(p.created_at).toLocaleDateString('de-DE')}<br />
//                   <span className="text-xs text-gray-500">
//                     {new Date(p.created_at).toLocaleTimeString('de-DE')}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot className="bg-gray-50 font-semibold">
//             <tr>
//               <td className="px-4 py-2">Totals</td>
//               <td></td>
//               <td className="px-4 py-2 text-right">€{totals.paid.toFixed(2)}</td>
//               <td className="px-4 py-2 text-right">€{totals.unpaid.toFixed(2)}</td>
//               <td></td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>

//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Chart Overview</h2>
//         {payments.length > 0 ? (
//           <Bar data={barData} options={barOptions} />
//         ) : (
//           <p className="text-center text-gray-500">No payment data to display.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentReport;


//---------update 1

