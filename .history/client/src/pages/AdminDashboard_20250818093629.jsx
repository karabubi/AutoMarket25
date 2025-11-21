//---------update 1


//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminDashboard.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//  Chart as ChartJS,
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  Title,
//  Tooltip,
//  Legend,
//  ArcElement
// } from 'chart.js';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom'; // ✅ Neu hinzugefügt


// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


// const AdminDashboard = () => {
//  const { user } = useAuth();
//  const [cars, setCars] = useState([]);
//  const [error, setError] = useState('');
//  const [loading, setLoading] = useState(true);
//  const token = user?.token || localStorage.getItem('token');


//  useEffect(() => {
//    const fetchCars = async () => {
//      try {
//        const res = await axios.get('/api/admin/cars', {
//          headers: { Authorization: `Bearer ${token}` },
//        });
//        const carsWithPayments = await Promise.all(
//          res.data.map(async (car) => {
//            try {
//              const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                headers: { Authorization: `Bearer ${token}` },
//              });
//              const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//              return {
//                ...car,
//                paid_amount: payment?.paid_amount?.toString() || '0',
//                not_paid_amount: payment?.not_paid_amount?.toString() || car.price.toString(),
//                payment_id: payment?.id || null,
//              };
//            } catch {
//              return {
//                ...car,
//                paid_amount: '0',
//                not_paid_amount: car.price.toString(),
//                payment_id: null,
//              };
//            }
//          })
//        );
//        setCars(carsWithPayments);
//      } catch (err) {
//        console.error(err);
//        setError('Error loading cars');
//      } finally {
//        setLoading(false);
//      }
//    };
//    if (token) fetchCars();
//  }, [token]);


//  const handleInputChange = (id, field, value) => {
//    setCars((prev) =>
//      prev.map((car) => (car.id === id ? { ...car, [field]: value } : car))
//    );
//  };


//  const handleSave = async (car) => {
//    const paid = parseFloat(car.paid_amount);
//    const unpaid = parseFloat(car.not_paid_amount);
//    if (isNaN(paid) || isNaN(unpaid) || paid < 0 || unpaid < 0) {
//      setError('Amounts must be valid and non-negative.');
//      return;
//    }


//    const payload = { paid_amount: paid, not_paid_amount: unpaid };
//    try {
//      setError('');
//      if (car.payment_id) {
//        await axios.put(`/api/admin/payments/${car.payment_id}`, payload, {
//          headers: { Authorization: `Bearer ${token}` },
//        });
//      } else {
//        const res = await axios.post(`/api/admin/cars/${car.id}/payments`, payload, {
//          headers: { Authorization: `Bearer ${token}` },
//        });
//        setCars((prev) =>
//          prev.map((c) => (c.id === car.id ? { ...c, payment_id: res.data.id } : c))
//        );
//      }
//    } catch (err) {
//      console.error(err);
//      setError('Save failed. Check data and try again.');
//    }
//  };


//  const exportPDF = () => {
//    const doc = new jsPDF();
//    doc.text('Car Payment Report', 14, 15);
//    doc.setFontSize(10);
//    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);


//    const headers = [['Make', 'Model', 'Price', 'Paid', 'Not Paid']];
//    const rows = cars.map((car) => [
//      car.make,
//      car.model,
//      car.price,
//      car.paid_amount,
//      car.not_paid_amount,
//    ]);


//    const totalPrice = cars.reduce((a, c) => a + (Number(c.price) || 0), 0);
//    const totalPaid = cars.reduce((a, c) => a + (Number(c.paid_amount) || 0), 0);
//    const totalUnpaid = cars.reduce((a, c) => a + (Number(c.not_paid_amount) || 0), 0);


//    rows.push([
//      'Total',
//      '',
//      totalPrice.toFixed(2),
//      totalPaid.toFixed(2),
//      totalUnpaid.toFixed(2),
//    ]);


//    autoTable(doc, {
//      head: headers,
//      body: rows,
//      startY: 30,
//    });


//    doc.save('car_report.pdf');
//  };


//  const totals = cars.reduce(
//    (acc, car) => {
//      acc.price += Number(car.price) || 0;
//      acc.paid += Number(car.paid_amount) || 0;
//      acc.unpaid += Number(car.not_paid_amount) || 0;
//      return acc;
//    },
//    { price: 0, paid: 0, unpaid: 0 }
//  );


//  const barData = {
//    labels: cars.map(car => `${car.make} ${car.model}`),
//    datasets: [
//      {
//        label: 'Paid Amount',
//        data: cars.map(car => Number(car.paid_amount)),
//        backgroundColor: 'rgba(34,197,94,0.6)',
//      },
//      {
//        label: 'Not Paid Amount',
//        data: cars.map(car => Number(car.not_paid_amount)),
//        backgroundColor: 'rgba(239,68,68,0.6)',
//      },
//    ],
//  };


//  const barOptions = {
//    responsive: true,
//    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Paid vs Unpaid' } },
//  };


//  if (loading) return <div className="p-4 text-center text-lg">Loading...</div>;


//  return (
//    <div className="p-6 max-w-7xl mx-auto">
//      <div className="flex justify-between items-center mb-6">
//        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//        <div className="flex gap-3">
//          <button
//            onClick={exportPDF}
//            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//          >
//            Export PDF
//          </button>
//          <Link
//            to="/payment-report"
//            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//          >
//            View Payment Report
//          </Link>
//        </div>
//      </div>


//      {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}


//      <div className="overflow-x-auto">
//        <table className="min-w-full bg-white rounded shadow text-sm">
//          <thead className="bg-gray-100">
//            <tr>
//              <th className="px-4 py-2 text-left">Make</th>
//              <th className="px-4 py-2 text-left">Model</th>
//              <th className="px-4 py-2 text-right">Price</th>
//              <th className="px-4 py-2 text-right">Paid</th>
//              <th className="px-4 py-2 text-right">Unpaid</th>
//              <th className="px-4 py-2 text-center">Actions</th>
//            </tr>
//          </thead>
//          <tbody>
//            {cars.map((car) => (
//              <tr key={car.id} className="border-t hover:bg-gray-50">
//                <td className="px-4 py-2">{car.make}</td>
//                <td className="px-4 py-2">{car.model}</td>
//                <td className="px-4 py-2 text-right">€{Number(car.price).toFixed(2)}</td>
//                <td className="px-4 py-2 text-right">
//                  <input
//                    type="number"
//                    className="border p-1 w-24 text-right"
//                    value={car.paid_amount}
//                    onChange={(e) => handleInputChange(car.id, 'paid_amount', e.target.value)}
//                  />
//                </td>
//                <td className="px-4 py-2 text-right">
//                  <input
//                    type="number"
//                    className="border p-1 w-24 text-right"
//                    value={car.not_paid_amount}
//                    onChange={(e) => handleInputChange(car.id, 'not_paid_amount', e.target.value)}
//                  />
//                </td>
//                <td className="px-4 py-2 text-center">
//                  <button
//                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                    onClick={() => handleSave(car)}
//                  >
//                    Save
//                  </button>
//                </td>
//              </tr>
//            ))}
//          </tbody>
//          <tfoot className="bg-gray-50 font-semibold">
//            <tr>
//              <td className="px-4 py-2">Totals</td>
//              <td></td>
//              <td className="px-4 py-2 text-right">€{totals.price.toFixed(2)}</td>
//              <td className="px-4 py-2 text-right">€{totals.paid.toFixed(2)}</td>
//              <td className="px-4 py-2 text-right">€{totals.unpaid.toFixed(2)}</td>
//              <td></td>
//            </tr>
//          </tfoot>
//        </table>
//      </div>


//      <div className="mt-10 bg-white p-6 rounded shadow">
//        <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//        <Bar data={barData} options={barOptions} />
//      </div>
//    </div>
//  );
// };


// export default AdminDashboard;



//-------update 2




// // AdminDashboard.jsx (Fixed Version with clear error + fallback + backend endpoint notice)

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// } from 'chart.js';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const token = user?.token || localStorage.getItem('token');

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get('/api/admin/cars', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const carsWithPayments = await Promise.all(
//           res.data.map(async (car) => {
//             try {
//               const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//               return {
//                 ...car,
//                 paid_amount: payment?.paid_amount?.toString() || '0',
//                 not_paid_amount: payment?.not_paid_amount?.toString() || car.price.toString(),
//                 payment_id: payment?.id || null,
//               };
//             } catch {
//               return {
//                 ...car,
//                 paid_amount: '0',
//                 not_paid_amount: car.price.toString(),
//                 payment_id: null,
//               };
//             }
//           })
//         );
//         setCars(carsWithPayments);
//       } catch (err) {
//         console.error(err);
//         setError('Error loading cars');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchCars();
//   }, [token]);

//   const handleInputChange = (id, field, value) => {
//     setCars((prev) =>
//       prev.map((car) => (car.id === id ? { ...car, [field]: value.replace(',', '.') } : car))
//     );
//   };

//   const handleSave = async (car) => {
//     const paid = parseFloat(car.paid_amount);
//     const unpaid = parseFloat(car.not_paid_amount);
//     if (isNaN(paid) || isNaN(unpaid) || paid < 0 || unpaid < 0) {
//       setError('Amounts must be valid and non-negative.');
//       return;
//     }

//     const payload = { paid_amount: paid, not_paid_amount: unpaid };
//     try {
//       setError('');
//       if (car.payment_id) {
//         await axios.put(`/api/admin/payments/${car.payment_id}`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         const res = await axios.post(`/api/admin/cars/${car.id}/payments`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCars((prev) =>
//           prev.map((c) => (c.id === car.id ? { ...c, payment_id: res.data.id } : c))
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Save failed. Check if backend route /api/admin/payments/:id exists.');
//     }
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Car Payment Report', 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

//     const headers = [['Make', 'Model', 'Price', 'Paid', 'Not Paid']];
//     const rows = cars.map((car) => [
//       car.make,
//       car.model,
//       car.price,
//       car.paid_amount,
//       car.not_paid_amount,
//     ]);

//     const totalPrice = cars.reduce((a, c) => a + (Number(c.price) || 0), 0);
//     const totalPaid = cars.reduce((a, c) => a + (Number(c.paid_amount) || 0), 0);
//     const totalUnpaid = cars.reduce((a, c) => a + (Number(c.not_paid_amount) || 0), 0);

//     rows.push([
//       'Total',
//       '',
//       totalPrice.toFixed(2),
//       totalPaid.toFixed(2),
//       totalUnpaid.toFixed(2),
//     ]);

//     autoTable(doc, { head: headers, body: rows, startY: 30 });
//     doc.save('car_report.pdf');
//   };

//   const totals = cars.reduce(
//     (acc, car) => {
//       acc.price += Number(car.price) || 0;
//       acc.paid += Number(car.paid_amount) || 0;
//       acc.unpaid += Number(car.not_paid_amount) || 0;
//       return acc;
//     },
//     { price: 0, paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: cars.map((car) => `${car.make} ${car.model}`),
//     datasets: [
//       {
//         label: 'Paid Amount',
//         data: cars.map((car) => Number(car.paid_amount)),
//         backgroundColor: 'rgba(34,197,94,0.6)',
//       },
//       {
//         label: 'Not Paid Amount',
//         data: cars.map((car) => Number(car.not_paid_amount)),
//         backgroundColor: 'rgba(239,68,68,0.6)',
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     plugins: { legend: { position: 'top' }, title: { display: true, text: 'Paid vs Unpaid' } },
//   };

//   if (loading) return <div className="p-4 text-center text-lg">Loading...</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <div className="flex gap-3">
//           <button
//             onClick={exportPDF}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Export PDF
//           </button>
//           <Link
//             to="/payment-report"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             View Payment Report
//           </Link>
//         </div>
//       </div>

//       {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Make</th>
//               <th className="px-4 py-2 text-left">Model</th>
//               <th className="px-4 py-2 text-right">Price</th>
//               <th className="px-4 py-2 text-right">Paid</th>
//               <th className="px-4 py-2 text-right">Unpaid</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars.map((car) => (
//               <tr key={car.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{car.make}</td>
//                 <td className="px-4 py-2">{car.model}</td>
//                 <td className="px-4 py-2 text-right">€{Number(car.price).toFixed(2)}</td>
//                 <td className="px-4 py-2 text-right">
//                   <input
//                     type="text"
//                     className="border p-1 w-24 text-right"
//                     value={car.paid_amount}
//                     onChange={(e) => handleInputChange(car.id, 'paid_amount', e.target.value)}
//                   />
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   <input
//                     type="text"
//                     className="border p-1 w-24 text-right"
//                     value={car.not_paid_amount}
//                     onChange={(e) => handleInputChange(car.id, 'not_paid_amount', e.target.value)}
//                   />
//                 </td>
//                 <td className="px-4 py-2 text-center">
//                   <button
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     onClick={() => handleSave(car)}
//                   >
//                     Save
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot className="bg-gray-50 font-semibold">
//             <tr>
//               <td className="px-4 py-2">Totals</td>
//               <td></td>
//               <td className="px-4 py-2 text-right">€{totals.price.toFixed(2)}</td>
//               <td className="px-4 py-2 text-right">€{totals.paid.toFixed(2)}</td>
//               <td className="px-4 py-2 text-right">€{totals.unpaid.toFixed(2)}</td>
//               <td></td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>

//       <div className="mt-10 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//         <Bar data={barData} options={barOptions} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



//-------update 3






// AdminDashboard.jsx (Rewritten version with success/error messages and proper edit/save flow)


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const token = user?.token || localStorage.getItem('token');

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get('/api/admin/cars', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const enrichedCars = await Promise.all(
//           res.data.map(async (car) => {
//             try {
//               const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//               return {
//                 ...car,
//                 paid_amount: payment?.paid_amount?.toString() || '0',
//                 not_paid_amount: payment?.not_paid_amount?.toString() || car.price.toString(),
//                 payment_id: payment?.id || null,
//               };
//             } catch {
//               return {
//                 ...car,
//                 paid_amount: '0',
//                 not_paid_amount: car.price.toString(),
//                 payment_id: null,
//               };
//             }
//           })
//         );

//         setCars(enrichedCars);
//       } catch (err) {
//         console.error(err);
//         setMessage({ type: 'error', text: 'Error loading cars' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchCars();
//   }, [token]);

//   const handleInputChange = (id, field, value) => {
//     setCars((prev) =>
//       prev.map((car) => (car.id === id ? { ...car, [field]: value.replace(',', '.') } : car))
//     );
//   };

//   const handleSave = async (car) => {
//     const paid = parseFloat(car.paid_amount);
//     const unpaid = parseFloat(car.not_paid_amount);
//     if (isNaN(paid) || isNaN(unpaid) || paid < 0 || unpaid < 0) {
//       setMessage({ type: 'error', text: 'Amounts must be valid and non-negative.' });
//       return;
//     }

//     try {
//       let response;
//       if (car.payment_id) {
//         response = await axios.put(`/api/admin/payments/${car.payment_id}`, {
//           paid_amount: paid,
//           not_paid_amount: unpaid,
//         }, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         response = await axios.post(`/api/admin/cars/${car.id}/payments`, {
//           paid_amount: paid,
//           not_paid_amount: unpaid,
//         }, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCars((prev) =>
//           prev.map((c) => (c.id === car.id ? { ...c, payment_id: response.data.id } : c))
//         );
//       }

//       setMessage({ type: 'success', text: 'Payment updated successfully.' });
//     } catch (err) {
//       console.error(err);
//       setMessage({ type: 'error', text: 'Save failed. Check if backend route exists.' });
//     }
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Car Payment Report', 14, 15);
//     autoTable(doc, {
//       head: [['Make', 'Model', 'Price', 'Paid', 'Not Paid']],
//       body: cars.map((car) => [
//         car.make,
//         car.model,
//         car.price,
//         car.paid_amount,
//         car.not_paid_amount,
//       ]),
//       startY: 25,
//     });
//     doc.save('car_report.pdf');
//   };

//   const totals = cars.reduce(
//     (acc, car) => {
//       acc.price += Number(car.price) || 0;
//       acc.paid += Number(car.paid_amount) || 0;
//       acc.unpaid += Number(car.not_paid_amount) || 0;
//       return acc;
//     },
//     { price: 0, paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: cars.map((car) => `${car.make} ${car.model}`),
//     datasets: [
//       {
//         label: 'Paid Amount',
//         data: cars.map((car) => Number(car.paid_amount)),
//         backgroundColor: 'rgba(34,197,94,0.6)',
//       },
//       {
//         label: 'Unpaid Amount',
//         data: cars.map((car) => Number(car.not_paid_amount)),
//         backgroundColor: 'rgba(239,68,68,0.6)',
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     plugins: { legend: { position: 'top' }, title: { display: true, text: 'Paid vs Unpaid' } },
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <div className="flex gap-3">
//           <button
//             onClick={exportPDF}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Export PDF
//           </button>
//           <Link
//             to="/payment-report"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             View Payment Report
//           </Link>
//         </div>
//       </div>

//       {message.text && (
//         <div className={`mb-4 font-semibold ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
//           {message.text}
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded shadow text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Make</th>
//                 <th className="px-4 py-2 text-left">Model</th>
//                 <th className="px-4 py-2 text-right">Price</th>
//                 <th className="px-4 py-2 text-right">Paid</th>
//                 <th className="px-4 py-2 text-right">Unpaid</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.map((car) => (
//                 <tr key={car.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-2">{car.make}</td>
//                   <td className="px-4 py-2">{car.model}</td>
//                   <td className="px-4 py-2 text-right">€{Number(car.price).toFixed(2)}</td>
//                   <td className="px-4 py-2 text-right">
//                     <input
//                       type="text"
//                       className="border p-1 w-24 text-right"
//                       value={car.paid_amount}
//                       onChange={(e) => handleInputChange(car.id, 'paid_amount', e.target.value)}
//                     />
//                   </td>
//                   <td className="px-4 py-2 text-right">
//                     <input
//                       type="text"
//                       className="border p-1 w-24 text-right"
//                       value={car.not_paid_amount}
//                       onChange={(e) => handleInputChange(car.id, 'not_paid_amount', e.target.value)}
//                     />
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleSave(car)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       Save
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="bg-gray-50 font-semibold">
//               <tr>
//                 <td className="px-4 py-2">Totals</td>
//                 <td></td>
//                 <td className="px-4 py-2 text-right">€{totals.price.toFixed(2)}</td>
//                 <td className="px-4 py-2 text-right">€{totals.paid.toFixed(2)}</td>
//                 <td className="px-4 py-2 text-right">€{totals.unpaid.toFixed(2)}</td>
//                 <td></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       )}

//       <div className="mt-10 bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//         <Bar data={barData} options={barOptions} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


//-----update 4


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/AdminDashboard.jsx



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [savedId, setSavedId] = useState(null);

//   // 🧮 German EUR formatter
//   const formatCurrency = (num) =>
//     new Intl.NumberFormat('de-DE', {
//       style: 'currency',
//       currency: 'EUR',
//       minimumFractionDigits: 2,
//     }).format(num); // "1.234,56 €" :contentReference[oaicite:5]{index=5}

//   const showSuccess = () => {
//     toast.success('Payment saved successfully!', { position: 'top-right', autoClose: 3000 });
//   };

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get('/api/admin/cars', { headers: { Authorization: `Bearer ${token}` } });
//         const carsWithPayments = await Promise.all(
//           res.data.map(async (car) => {
//             try {
//               const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//               return {
//                 ...car,
//                 paid_amount: payment?.paid_amount?.toString() || '0',
//                 not_paid_amount: payment?.not_paid_amount?.toString() || car.price.toString(),
//                 payment_id: payment?.id || null,
//               };
//             } catch {
//               return {
//                 ...car,
//                 paid_amount: '0',
//                 not_paid_amount: car.price.toString(),
//                 payment_id: null,
//               };
//             }
//           })
//         );
//         setCars(carsWithPayments);
//       } catch {
//         setError('Error loading cars');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchCars();
//   }, [token]);

//   const normalize = (str) => str.replace(',', '.');

//   const isRowValid = (car) => {
//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const price = parseFloat(car.price);
//     if (Number.isNaN(paid) || Number.isNaN(unpaid)) return false;
//     if (paid < 0 || unpaid < 0) return false;
//     if ((paid + unpaid).toFixed(2) !== price.toFixed(2)) return false;
//     return true;
//   };

//   const handleInputChange = (id, field, value) => {
//     setCars((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
//     );
//   };

//   const handleSave = async (car) => {
//     setError('');
//     if (!isRowValid(car)) {
//       setError('Invalid input: ensure non-negative numbers and Paid + Unpaid = Price');
//       return;
//     }

//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const payload = { paid_amount: paid, not_paid_amount: unpaid };

//     setSavingId(car.id);
//     try {
//       let resp;
//       if (car.payment_id) {
//         resp = await axios.put(`/api/admin/payments/${car.payment_id}`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         resp = await axios.post(`/api/admin/cars/${car.id}/payments`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }
//       showSuccess(); // 🍞 on success :contentReference[oaicite:6]{index=6}
//       setSavedId(car.id);
//       setTimeout(() => setSavedId(null), 2000);

//       if (!car.payment_id && resp?.data?.id) {
//         setCars((prev) =>
//           prev.map((c) => (c.id === car.id ? { ...c, payment_id: resp.data.id } : c))
//         );
//       }
//     } catch {
//       setError('Save failed. Try again.');
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Car Payment Report', 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

//     const headers = [['Make', 'Model', 'Price', 'Paid', 'Not Paid']];
//     const rows = cars.map((c) => [
//       c.make,
//       c.model,
//       c.price.toString(),
//       normalize(c.paid_amount),
//       normalize(c.not_paid_amount),
//     ]);

//     const totals = cars.reduce(
//       (a, c) => {
//         a.price += parseFloat(c.price) || 0;
//         a.paid += parseFloat(normalize(c.paid_amount)) || 0;
//         a.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//         return a;
//       },
//       { price: 0, paid: 0, unpaid: 0 }
//     );

//     rows.push(['Total', '', totals.price.toFixed(2), totals.paid.toFixed(2), totals.unpaid.toFixed(2)]);

//     autoTable(doc, { head: headers, body: rows, startY: 30 });
//     doc.save('car_report.pdf');
//   };

//   const totals = cars.reduce(
//     (a, c) => {
//       a.price += parseFloat(c.price) || 0;
//       a.paid += parseFloat(normalize(c.paid_amount)) || 0;
//       a.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//       return a;
//     },
//     { price: 0, paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: cars.map((c) => `${c.make} ${c.model}`),
//     datasets: [
//       { label: 'Paid Amount', data: cars.map((c) => parseFloat(normalize(c.paid_amount))), backgroundColor: 'rgba(34,197,94,0.6)' },
//       { label: 'Not Paid Amount', data: cars.map((c) => parseFloat(normalize(c.not_paid_amount))), backgroundColor: 'rgba(239,68,68,0.6)' },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     plugins: { legend: { position: 'top' }, title: { display: true, text: 'Paid vs Unpaid' } },
//   };

//   if (loading) return <div className="p-4 text-center text-lg">Loading...</div>;

//   return (
//     <>
//       <ToastContainer />
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <div className="flex gap-3">
//             <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//               Export PDF
//             </button>
//             <Link to="/payment-report" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               View Payment Report
//             </Link>
//           </div>
//         </div>

//         {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded shadow text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Make</th>
//                 <th className="px-4 py-2 text-left">Model</th>
//                 <th className="px-4 py-2 text-right">Price</th>
//                 <th className="px-4 py-2 text-right">Paid</th>
//                 <th className="px-4 py-2 text-right">Unpaid</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.map((car) => {
//                 const valid = isRowValid(car);
//                 return (
//                   <tr key={car.id} className={`border-t hover:bg-gray-50 ${!valid ? 'bg-red-50' : ''}`}>
//                     <td className="px-4 py-2">{car.make}</td>
//                     <td className="px-4 py-2">{car.model}</td>
//                     <td className="px-4 py-2 text-right">{formatCurrency(parseFloat(car.price))}</td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         type="text"
//                         className={`border p-1 w-24 text-right ${!valid ? 'border-red-500' : ''}`}
//                         value={car.paid_amount}
//                         onChange={(e) => handleInputChange(car.id, 'paid_amount', e.target.value)}
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         type="text"
//                         className={`border p-1 w-24 text-right ${!valid ? 'border-red-500' : ''}`}
//                         value={car.not_paid_amount}
//                         onChange={(e) => handleInputChange(car.id, 'not_paid_amount', e.target.value)}
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-center flex items-center justify-center">
//                       <button
//                         className={`px-3 py-1 rounded text-white ${savingId === car.id ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//                         onClick={() => handleSave(car)}
//                         disabled={savingId === car.id || !valid}
//                       >
//                         {savingId === car.id ? 'Saving...' : 'Save'}
//                       </button>
//                       {savedId === car.id && <span className="ml-2 text-green-600">✅</span>}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot className="bg-gray-50 font-semibold">
//               <tr>
//                 <td className="px-4 py-2">Totals</td>
//                 <td></td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.price)}</td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.paid)}</td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.unpaid)}</td>
//                 <td></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         <div className="mt-10 bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//           <Bar data={barData} options={barOptions} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [savedId, setSavedId] = useState(null);

//   const formatCurrency = (num) =>
//     new Intl.NumberFormat('de-DE', {
//       style: 'currency',
//       currency: 'EUR',
//       minimumFractionDigits: 2,
//     }).format(num);

//   const showSuccess = () => {
//     toast.success('Payment saved successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get('/api/admin/cars', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const carsWithPayments = await Promise.all(
//           res.data.map(async (car) => {
//             try {
//               const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//               return {
//                 ...car,
//                 paid_amount: payment?.paid_amount?.toString() || '0',
//                 not_paid_amount:
//                   payment?.not_paid_amount?.toString() || car.price.toString(),
//                 payment_id: payment?.id || null,
//               };
//             } catch {
//               return {
//                 ...car,
//                 paid_amount: '0',
//                 not_paid_amount: car.price.toString(),
//                 payment_id: null,
//               };
//             }
//           })
//         );
//         setCars(carsWithPayments);
//       } catch (err) {
//         console.error('Fetch cars error:', err);
//         setError('Error loading cars');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchCars();
//   }, [token]);

//   const normalize = (str) => str.replace(',', '.');

//   const isRowValid = (car) => {
//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const price = parseFloat(car.price);
//     return (
//       !Number.isNaN(paid) &&
//       !Number.isNaN(unpaid) &&
//       paid >= 0 &&
//       unpaid >= 0 &&
//       (paid + unpaid).toFixed(2) === price.toFixed(2)
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setCars((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
//     );
//   };

//   const handleSave = async (car) => {
//     setError('');
//     if (!isRowValid(car)) {
//       setError('Invalid input: ensure non-negative numbers and Paid + Unpaid = Price');
//       return;
//     }

//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const payload = { paid_amount: paid, not_paid_amount: unpaid };

//     setSavingId(car.id);
//     try {
//       const resp = car.payment_id
//         ? await axios.put(`/api/admin/payments/${car.payment_id}`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         : await axios.post(`/api/admin/cars/${car.id}/payments`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//       // Success UX
//       showSuccess();
//       setSavedId(car.id);
//       setTimeout(() => setSavedId(null), 2000);

//       // If it's a new payment, update the payment_id in state
//       if (!car.payment_id && resp.data?.id) {
//         setCars((prev) =>
//           prev.map((c) => (c.id === car.id ? { ...c, payment_id: resp.data.id } : c))
//         );
//       }
//     } catch (err) {
//       console.error('Save error:', err);
//       setError('Save failed: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Car Payment Report', 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

//     const headers = [['Make', 'Model', 'Price', 'Paid', 'Not Paid']];
//     const rows = cars.map((c) => [
//       c.make,
//       c.model,
//       c.price.toString(),
//       normalize(c.paid_amount),
//       normalize(c.not_paid_amount),
//     ]);

//     const totals = cars.reduce(
//       (acc, c) => {
//         acc.price += parseFloat(c.price) || 0;
//         acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
//         acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//         return acc;
//       },
//       { price: 0, paid: 0, unpaid: 0 }
//     );
//     rows.push([
//       'Total',
//       '',
//       totals.price.toFixed(2),
//       totals.paid.toFixed(2),
//       totals.unpaid.toFixed(2),
//     ]);

//     autoTable(doc, { head: headers, body: rows, startY: 30 });
//     doc.save('car_report.pdf');
//   };

//   const totals = cars.reduce(
//     (acc, c) => {
//       acc.price += parseFloat(c.price) || 0;
//       acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
//       acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//       return acc;
//     },
//     { price: 0, paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: cars.map((c) => `${c.make} ${c.model}`),
//     datasets: [
//       {
//         label: 'Paid Amount',
//         data: cars.map((c) => parseFloat(normalize(c.paid_amount))),
//         backgroundColor: 'rgba(34,197,94,0.6)',
//       },
//       {
//         label: 'Not Paid Amount',
//         data: cars.map((c) => parseFloat(normalize(c.not_paid_amount))),
//         backgroundColor: 'rgba(239,68,68,0.6)',
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Paid vs Unpaid' },
//     },
//   };

//   if (loading) return <div className="p-4 text-center text-lg">Loading...</div>;

//   return (
//     <>
//       <ToastContainer />
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <div className="flex gap-3">
//             <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//               Export PDF
//             </button>
//             <Link to="/payment-report" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               View Payment Report
//             </Link>
//           </div>
//         </div>

//         {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}

//         <div className="overflow-x-auto mb-6">
//           <table className="min-w-full bg-white rounded shadow text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Make</th>
//                 <th className="px-4 py-2 text-left">Model</th>
//                 <th className="px-4 py-2 text-right">Price</th>
//                 <th className="px-4 py-2 text-right">Paid</th>
//                 <th className="px-4 py-2 text-right">Unpaid</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.map((car) => {
//                 const valid = isRowValid(car);
//                 return (
//                   <tr key={car.id} className={`border-t hover:bg-gray-50 ${!valid ? 'bg-red-50' : ''}`}>
//                     <td className="px-4 py-2">{car.make}</td>
//                     <td className="px-4 py-2">{car.model}</td>
//                     <td className="px-4 py-2 text-right">{formatCurrency(parseFloat(car.price))}</td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         type="text"
//                         className={`border p-1 w-24 text-right ${!valid ? 'border-red-500' : ''}`}
//                         value={car.paid_amount}
//                         onChange={(e) => handleInputChange(car.id, 'paid_amount', e.target.value)}
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         type="text"
//                         className={`border p-1 w-24 text-right ${!valid ? 'border-red-500' : ''}`}
//                         value={car.not_paid_amount}
//                         onChange={(e) => handleInputChange(car.id, 'not_paid_amount', e.target.value)}
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-center flex items-center justify-center">
//                       <button
//                         className={`px-3 py-1 rounded text-white ${
//                           savingId === car.id ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
//                         }`}
//                         onClick={() => handleSave(car)}
//                         disabled={savingId === car.id || !valid}
//                       >
//                         {savingId === car.id ? 'Saving...' : 'Save'}
//                       </button>
//                       {savedId === car.id && <span className="ml-2 text-green-600">✅</span>}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot className="bg-gray-50 font-semibold">
//               <tr>
//                 <td className="px-4 py-2">Totals</td>
//                 <td></td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.price)}</td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.paid)}</td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.unpaid)}</td>
//                 <td></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//           <Bar data={barData} options={barOptions} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [savedId, setSavedId] = useState(null);

//   const formatCurrency = (num) =>
//     new Intl.NumberFormat('de-DE', {
//       style: 'currency',
//       currency: 'EUR',
//       minimumFractionDigits: 2,
//     }).format(num);

//   const showSuccess = () => {
//     toast.success('Payment saved successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   // FETCH
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         console.log('🔍 Fetching cars...');
//         const res = await axios.get('/api/admin/cars', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const carsWithPayments = await Promise.all(
//           res.data.map(async (car) => {
//             try {
//               const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//               return {
//                 ...car,
//                 paid_amount: payment?.paid_amount?.toString() || '0',
//                 not_paid_amount: payment?.not_paid_amount?.toString() || car.price.toString(),
//                 payment_id: payment?.id || null,
//               };
//             } catch (err) {
//               console.warn(`No payment for car ${car.id}`, err);
//               return {
//                 ...car,
//                 paid_amount: '0',
//                 not_paid_amount: car.price.toString(),
//                 payment_id: null,
//               };
//             }
//           })
//         );
//         setCars(carsWithPayments);
//       } catch (err) {
//         console.error('Fetch cars error:', err);
//         setError('Error loading cars. Check backend route/auth.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchCars();
//   }, [token]);

//   const normalize = (str) => str?.replace(',', '.') ?? '';

//   const isRowValid = (car) => {
//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const price = parseFloat(car.price);
//     return (
//       !isNaN(paid) &&
//       !isNaN(unpaid) &&
//       paid >= 0 &&
//       unpaid >= 0 &&
//       (paid + unpaid).toFixed(2) === price.toFixed(2)
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setCars((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
//     );
//   };

//   const handleSave = async (car) => {
//     console.log('🛠 handleSave clicked for car', car.id);
//     setError('');
//     if (!isRowValid(car)) {
//       setError('Invalid input: non-negative and sum must match price');
//       return;
//     }

//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const payload = { paid_amount: paid, not_paid_amount: unpaid };

//     console.log('➡️ About to send', car.payment_id ? 'PUT' : 'POST', car.id, payload);

//     setSavingId(car.id);
//     try {
//       const resp = car.payment_id
//         ? await axios.put(`/api/admin/payments/${car.payment_id}`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         : await axios.post(`/api/admin/cars/${car.id}/payments`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//       console.log('✅ Save succeeded', resp.data);
//       showSuccess();
//       setSavedId(car.id);
//       setTimeout(() => setSavedId(null), 2000);

//       if (!car.payment_id && resp.data?.id) {
//         setCars((prev) =>
//           prev.map((c) => (c.id === car.id ? { ...c, payment_id: resp.data.id } : c))
//         );
//       }
//     } catch (err) {
//       console.error('❌ Save failed:', err.response || err);
//       setError('Save error: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Car Payment Report', 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

//     const headers = [['Make', 'Model', 'Price', 'Paid', 'Not Paid']];
//     const rows = cars.map((c) => [
//       c.make,
//       c.model,
//       normalize(c.price),
//       normalize(c.paid_amount),
//       normalize(c.not_paid_amount),
//     ]);

//     const totals = cars.reduce(
//       (acc, c) => {
//         acc.price += parseFloat(c.price) || 0;
//         acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
//         acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//         return acc;
//       },
//       { price: 0, paid: 0, unpaid: 0 }
//     );
//     rows.push([
//       'Total',
//       '',
//       totals.price.toFixed(2),
//       totals.paid.toFixed(2),
//       totals.unpaid.toFixed(2),
//     ]);

//     autoTable(doc, { head: headers, body: rows, startY: 30 });
//     doc.save('car_report.pdf');
//   };

//   const totals = cars.reduce(
//     (acc, c) => {
//       acc.price += parseFloat(c.price) || 0;
//       acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
//       acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//       return acc;
//     },
//     { price: 0, paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: cars.map((c) => `${c.make} ${c.model}`),
//     datasets: [
//       {
//         label: 'Paid',
//         data: cars.map((c) => parseFloat(normalize(c.paid_amount))),
//         backgroundColor: 'rgba(34,197,94,0.6)',
//       },
//       {
//         label: 'Not Paid',
//         data: cars.map((c) => parseFloat(normalize(c.not_paid_amount))),
//         backgroundColor: 'rgba(239,68,68,0.6)',
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     plugins: { legend: { position: 'top' }, title: { display: true, text: 'Paid vs Unpaid' } },
//   };

//   if (loading) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <>
//       <ToastContainer />
//       <div className="p-6 max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <div className="flex gap-3">
//             <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded">Export PDF</button>
//             <Link to="/payment-report" className="bg-blue-600 text-white px-4 py-2 rounded">View Payment Report</Link>
//           </div>
//         </div>

//         {error && <div className="text-red-600 mb-4">{error}</div>}

//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Make</th>
//                 <th className="px-4 py-2 text-left">Model</th>
//                 <th className="px-4 py-2 text-right">Price</th>
//                 <th className="px-4 py-2 text-right">Paid</th>
//                 <th className="px-4 py-2 text-right">Unpaid</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.map((c) => {
//                 const valid = isRowValid(c);
//                 return (
//                   <tr key={c.id} className={!valid ? 'bg-red-50' : ''}>
//                     <td className="px-4 py-2">{c.make}</td>
//                     <td className="px-4 py-2">{c.model}</td>
//                     <td className="px-4 py-2 text-right">{formatCurrency(parseFloat(c.price))}</td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         className={`border p-1 w-24 text-right ${!valid ? 'border-red-500' : ''}`}
//                         value={c.paid_amount}
//                         onChange={(e) => handleInputChange(c.id, 'paid_amount', e.target.value)}
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         className={`border p-1 w-24 text-right ${!valid ? 'border-red-500' : ''}`}
//                         value={c.not_paid_amount}
//                         onChange={(e) => handleInputChange(c.id, 'not_paid_amount', e.target.value)}
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-center">
//                       <button
//                         className={`px-3 py-1 rounded text-white ${
//                           savingId === c.id ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
//                         }`}
//                         onClick={() => handleSave(c)}
//                         disabled={savingId === c.id || !valid}
//                       >
//                         {savingId === c.id ? 'Saving...' : 'Save'}
//                       </button>
//                       {savedId === c.id && <span className="ml-2 text-green-600">✅</span>}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot className="bg-gray-50 font-semibold">
//               <tr>
//                 <td className="px-4 py-2">Totals</td>
//                 <td></td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.price)}</td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.paid)}</td>
//                 <td className="px-4 py-2 text-right">{formatCurrency(totals.unpaid)}</td>
//                 <td></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         <div className="mt-6 bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//           <Bar data={barData} options={barOptions} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;


//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminDashboard.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const token = user?.token || localStorage.getItem('token');

//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [savedId, setSavedId] = useState(null);

//   const formatCurrency = (num) =>
//     new Intl.NumberFormat('de-DE', {
//       style: 'currency',
//       currency: 'EUR',
//       minimumFractionDigits: 2,
//     }).format(num);

//   const showSuccess = () => {
//     toast.success('Saved successfully!', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   };

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         console.log('🔍 Fetching cars...');
//         const res = await axios.get('/api/admin/cars', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const enriched = await Promise.all(
//           res.data.map(async (car) => {
//             try {
//               const p = await axios.get(`/api/admin/cars/${car.id}/payments`, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const payment = Array.isArray(p.data) ? p.data[0] : p.data;
//               return {
//                 ...car,
//                 paid_amount: payment?.paid_amount?.toString() || '0',
//                 not_paid_amount: payment?.not_paid_amount?.toString() || car.price.toString(),
//                 payment_id: payment?.id || null,
//               };
//             } catch {
//               return {
//                 ...car,
//                 paid_amount: '0',
//                 not_paid_amount: car.price.toString(),
//                 payment_id: null,
//               };
//             }
//           })
//         );
//         setCars(enriched);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Error loading cars. Check backend/auth.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchCars();
//   }, [token]);

//   const normalize = (str = '') => str.replace(',', '.');

//   const isRowValid = (car) => {
//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const price = parseFloat(car.price);
//     return (
//       !isNaN(paid) &&
//       !isNaN(unpaid) &&
//       paid >= 0 &&
//       unpaid >= 0 &&
//       (paid + unpaid).toFixed(2) === price.toFixed(2)
//     );
//   };

//   const handleInput = (id, field, value) => {
//     setCars((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
//     );
//   };

//   const handleSave = async (car) => {
//     console.log('🛠 Save clicked:', car.id);
//     setError('');
//     if (!isRowValid(car)) {
//       setError('Invalid values: non‑negative and Paid + Unpaid must equal Price.');
//       return;
//     }

//     const paid = parseFloat(normalize(car.paid_amount));
//     const unpaid = parseFloat(normalize(car.not_paid_amount));
//     const payload = { paid_amount: paid, not_paid_amount: unpaid };

//     setSavingId(car.id);
//     try {
//       const resp = car.payment_id
//         ? await axios.put(`/api/admin/payments/${car.payment_id}`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         : await axios.post(`/api/admin/cars/${car.id}/payments`, payload, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//       console.log('✅ Save OK:', resp.data);
//       showSuccess();
//       setSavedId(car.id);
//       setTimeout(() => setSavedId(null), 2000);

//       if (!car.payment_id && resp.data?.id) {
//         setCars((prev) =>
//           prev.map((c) =>
//             c.id === car.id ? { ...c, payment_id: resp.data.id } : c
//           )
//         );
//       }
//     } catch (err) {
//       console.error('❌ Save failed:', err.response || err);
//       setError('Save error: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Car Payment Report', 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

//     const headers = [['Make', 'Model', 'Price', 'Paid', 'Not Paid']];
//     const rows = cars.map((c) => [
//       c.make,
//       c.model,
//       normalize(c.price),
//       normalize(c.paid_amount),
//       normalize(c.not_paid_amount),
//     ]);

//     const totals = cars.reduce(
//       (acc, c) => {
//         acc.price += parseFloat(c.price) || 0;
//         acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
//         acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//         return acc;
//       },
//       { price: 0, paid: 0, unpaid: 0 }
//     );

//     rows.push([
//       'Total',
//       '',
//       totals.price.toFixed(2),
//       totals.paid.toFixed(2),
//       totals.unpaid.toFixed(2),
//     ]);

//     autoTable(doc, { head: headers, body: rows, startY: 30 });
//     doc.save('car_report.pdf');
//   };

//   const totals = cars.reduce(
//     (acc, c) => {
//       acc.price += parseFloat(c.price) || 0;
//       acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
//       acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
//       return acc;
//     },
//     { price: 0, paid: 0, unpaid: 0 }
//   );

//   const barData = {
//     labels: cars.map((c) => `${c.make} ${c.model}`),
//     datasets: [
//       {
//         label: 'Paid',
//         data: cars.map((c) => parseFloat(normalize(c.paid_amount))),
//         backgroundColor: 'rgba(34,197,94,0.6)',
//       },
//       {
//         label: 'Unpaid',
//         data: cars.map((c) => parseFloat(normalize(c.not_paid_amount))),
//         backgroundColor: 'rgba(239,68,68,0.6)',
//       },
//     ],
//   };

//   const barOpts = {
//     responsive: true,
//     plugins: { legend: { position: 'top' }, title: { display: true, text: 'Paid vs Unpaid' } },
//   };

//   if (loading) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <>
//       <ToastContainer />
//       <div className="p-6 max-w-5xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <div className="flex gap-3">
//             <button
//               onClick={exportPDF}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Export PDF
//             </button>
//             <Link
//               //to="/payment-report"
//               to="/PaymentReport"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               View Payment Report
//             </Link>
//           </div>
//         </div>

//         {error && <div className="text-red-600 mb-4">{error}</div>}

//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Make</th>
//                 <th className="px-4 py-2 text-left">Model</th>
//                 <th className="px-4 py-2 text-right">Price</th>
//                 <th className="px-4 py-2 text-right">Paid</th>
//                 <th className="px-4 py-2 text-right">Unpaid</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.map((c) => {
//                 const valid = isRowValid(c);
//                 return (
//                   <tr key={c.id} className={!valid ? 'bg-red-50' : ''}>
//                     <td className="px-4 py-2">{c.make}</td>
//                     <td className="px-4 py-2">{c.model}</td>
//                     <td className="px-4 py-2 text-right">
//                       {formatCurrency(parseFloat(c.price))}
//                     </td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         className={`border p-1 w-24 text-right ${
//                           !valid ? 'border-red-500' : ''
//                         }`}
//                         value={c.paid_amount}
//                         onChange={(e) =>
//                           handleInput(c.id, 'paid_amount', e.target.value)
//                         }
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-right">
//                       <input
//                         className={`border p-1 w-24 text-right ${
//                           !valid ? 'border-red-500' : ''
//                         }`}
//                         value={c.not_paid_amount}
//                         onChange={(e) =>
//                           handleInput(c.id, 'not_paid_amount', e.target.value)
//                         }
//                       />
//                     </td>
//                     <td className="px-4 py-2 text-center">
//                       <button
//                         className={`px-3 py-1 rounded text-white ${
//                           savingId === c.id
//                             ? 'bg-gray-400'
//                             : 'bg-blue-600 hover:bg-blue-700'
//                         }`}
//                         onClick={() => handleSave(c)}
//                         disabled={savingId === c.id || !valid}
//                       >
//                         {savingId === c.id ? 'Saving...' : 'Save'}
//                       </button>
//                       {savedId === c.id && (
//                         <span className="ml-2 text-green-600">✅</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot className="bg-gray-50 font-semibold">
//               <tr>
//                 <td className="px-4 py-2">Totals</td>
//                 <td></td>
//                 <td className="px-4 py-2 text-right">
//                   {formatCurrency(totals.price)}
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   {formatCurrency(totals.paid)}
//                 </td>
//                 <td className="px-4 py-2 text-right">
//                   {formatCurrency(totals.unpaid)}
//                 </td>
//                 <td></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         <div className="mt-6 bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
//           <Bar data={barData} options={barOpts} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;



//------update 3

