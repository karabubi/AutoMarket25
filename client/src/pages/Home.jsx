

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx

import { useEffect, useState } from "react";
import CarList from "../components/CarList";
import { useTranslation } from "react-i18next";
import { fetchCars } from "../utils/api";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchCars(); // ✅ uses API baseURL (dev proxy / prod render)
        setCars(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(t("home.error"));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [t]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        🚗 <span className="underline decoration-blue-500">{t("home.availableCars")}</span>
      </h1>

      {loading && <p className="text-center text-gray-500 text-lg">⏳ {t("home.loading")}</p>}

      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {!loading && !error && cars.length === 0 && (
        <p className="text-center text-gray-500 text-lg">{t("home.noCars")}</p>
      )}

      {!loading && !error && cars.length > 0 && <CarList cars={cars} publicView />}
    </div>
  );
};

export default Home;
