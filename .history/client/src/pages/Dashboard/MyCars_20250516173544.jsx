
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




// Fully extended MyCars.jsx for editing full car details
import { useEffect, useState } from 'react';
import { fetchMyCars, updateCar, deleteCar } from '../../utils/api';

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMyCars(token).then((res) => setCars(res.data));
  }, [token]);

  const handleEdit = (car) => {
    setEditing(car.id);
    setForm(car);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateCar(editing, form, token);
    setCars(cars.map((c) => (c.id === editing ? { ...form } : c)));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await deleteCar(id, token);
    setCars(cars.filter((c) => c.id !== id));
  };

  const fields = [
    'make', 'model', 'year', 'price', 'description', 'mileage',
    'engine_size', 'power_kw', 'power_hp', 'drive_type', 'fuel_type',
    'consumption_combined', 'co2_emission', 'seats', 'doors',
    'transmission', 'emission_class', 'first_registration',
    'climate_control', 'color', 'interior', 'trailer_weight_braked',
    'trailer_weight_unbraked', 'weight', 'cylinders', 'tank_size'
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Car Listings</h2>
      {cars.map((car) => (
        <div key={car.id} className="border p-4 mb-4 rounded shadow space-y-2">
          {editing === car.id ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fields.map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field] ?? ''}
                  onChange={handleChange}
                  placeholder={field.replace(/_/g, ' ')}
                  className="p-2 border rounded"
                />
              ))}
              <textarea
                name="description"
                value={form.description || ''}
                onChange={handleChange}
                className="p-2 border rounded col-span-2"
                placeholder="Description"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 px-3 py-1 text-white rounded col-span-2"
              >Save</button>
            </div>
          ) : (
            <div>
              <p className="font-bold text-lg">{car.make} {car.model} ({car.year}) – €{car.price}</p>
              <p className="text-gray-600">{car.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(car)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >Edit</button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCars;


