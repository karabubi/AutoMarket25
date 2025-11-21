
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Dashboard/MyCars.jsx


// import { useEffect, useState } from 'react';
// import { fetchMyCars, updateCar, deleteCar } from '../../utils/api';

// const MyCars = () => {
//   const [cars, setCars] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({});
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchMyCars(token).then((res) => setCars(res.data));
//   }, [token]);

//   const handleEdit = (car) => {
//     setEditing(car.id);
//     setForm(car);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     await updateCar(editing, form, token);
//     setCars(cars.map((c) => (c.id === editing ? { ...form } : c)));
//     setEditing(null);
//   };

//   const handleDelete = async (id) => {
//     await deleteCar(id, token);
//     setCars(cars.filter((c) => c.id !== id));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">My Car Listings</h2>
//       {cars.map((car) => (
//         <div key={car.id} className="border p-4 mb-2 rounded shadow">
//           {editing === car.id ? (
//             <>
//               <input name="make" value={form.make} onChange={handleChange} />
//               <input name="model" value={form.model} onChange={handleChange} />
//               <input name="year" value={form.year} onChange={handleChange} />
//               <input name="price" value={form.price} onChange={handleChange} />
//               <textarea name="description" value={form.description} onChange={handleChange} />
//               <button onClick={handleSave} className="bg-green-500 px-3 py-1 text-white rounded">Save</button>
//             </>
//           ) : (
//             <>
//               <p><strong>{car.make}</strong> {car.model} ({car.year}) – {car.price}€</p>
//               <p>{car.description}</p>
//               <button onClick={() => handleEdit(car)} className="bg-yellow-500 px-3 py-1 mr-2 rounded">Edit</button>
//               <button onClick={() => handleDelete(car.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyCars;
