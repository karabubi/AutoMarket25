
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Dashboard/listings.jsx



import { useEffect, useState } from 'react';
import { fetchMyCars, deleteCar } from '../../utils/api';
import { Link } from 'react-router-dom';

const Listings = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCars = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('⚠️ Please log in to view your car listings.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetchMyCars(token);
      setCars(res.data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError('❌ Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      await deleteCar(id, token);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch {
      alert('Failed to delete car.');
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  if (loading) return <p className="text-center p-8">⏳ Loading your listings...</p>;
  if (error) return <p className="text-center p-8 text-red-600">{error}</p>;
  if (cars.length === 0) return <p className="text-center p-8">You haven’t listed any cars yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📋 My Car Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={car.image_url || (car.images && car.images[0]?.image_url)}
              alt={`${car.make} ${car.model}`}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
            <p className="text-gray-600 text-sm">Year: {car.year}</p>
            <p className="text-gray-600 text-sm mb-2">Price: €{car.price}</p>
            <div className="flex justify-between">
              <Link
                to={`/edit/${car.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(car.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
