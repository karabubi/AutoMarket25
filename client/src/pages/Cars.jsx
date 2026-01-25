

///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/Cars.jsx

import { useEffect, useState } from "react";
import CarList from "../components/CarList";
import CarFilter from "../components/CarFilter";
import { fetchCars } from "../utils/api";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchCars(filters);
        const allCars = Array.isArray(response.data) ? response.data : [];

        const filtered = filters.search
          ? allCars.filter((car) =>
              `${car.make} ${car.model}`.toLowerCase().includes(filters.search.toLowerCase())
            )
          : allCars;

        setCars(filtered);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        setError("❌ Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🚗 Alle Fahrzeuge</h1>

      <CarFilter onFilterChange={setFilters} />

      {loading && <p className="text-center text-gray-600 mt-6">⏳ Lade Fahrzeuge...</p>}
      {error && <p className="text-center text-red-600 mt-6">{error}</p>}
      {!loading && !error && <CarList cars={cars} />}
    </div>
  );
};

export default Cars;
