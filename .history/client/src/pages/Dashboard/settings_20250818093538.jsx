
// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Dashboard/settings.jsx

import { useEffect, useState } from 'react';
import { fetchMyCars, deleteCar } from '../../utils/api';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCars = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('❌ Please log in to view your cars.');

    try {
      const res = await fetchMyCars(token);
      setCars(res.data);
    } catch (err) {
      console.error('❌ Error fetching user cars:', err);
      setError('❌ Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Not authenticated');
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      await deleteCar(id, token);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('❌ Failed to delete car.');
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading your cars...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (cars.length === 0) return <p className="text-center mt-10">You have no car listings yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">⚙️ My Car Settings</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded shadow">
            <img src={car.image_url} alt="car" className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
            <p className="text-sm text-gray-600 mb-2">€{car.price}</p>
            <div className="flex justify-between">
              <Link to={`/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
              <button onClick={() => handleDelete(car.id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
