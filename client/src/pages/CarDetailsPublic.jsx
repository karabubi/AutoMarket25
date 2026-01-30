
// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetailsPublic.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// ✅ use api.js instead of localhost axios (works on Vercel + localhost)
import { fetchCarById } from "../utils/api";

import CarImagesGallery from "../components/CarImagesGallery";
import CarTitle from "../components/CarTitle";
import PriceBox from "../components/PriceBox";
import DealerCard from "../components/DealerCard";

const CarDetailsPublic = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ merged: safer loading (mounted flag) + keeps i18n messages + removes localhost hardcode
  useEffect(() => {
    let mounted = true;

    const fetchCarDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchCarById(id);
        if (!mounted) return;
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car details:", err?.response?.data || err);
        if (!mounted) return;
        setError(t("carDetails.loadError"));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchCarDetails();

    return () => {
      mounted = false;
    };
  }, [id, t]);

  if (loading) return <div className="p-6 text-gray-600">{t("carDetails.loading")}</div>;
  if (error || !car) return <div className="p-6 text-red-500">{error || t("carDetails.notFound")}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <CarImagesGallery carId={id} />

      <CarTitle
        title={`${car.make ?? ""} ${car.model ?? ""}`.trim()}
        subtitle={car.description || ""}
        location={car.location || t("carDetails.unknownLocation")}
      />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <PriceBox price={car.price} carId={car.id} make={car.make} model={car.model} />
        <DealerCard
          dealer={
            car.dealer || {
              name: "AutoMarkt25",
              phone: "+4917655105979",
              email: "karabubi66@yahoo.com",
              rating: 4.5,
              logoUrl: "/logo.png",
            }
          }
        />
      </div>

      {/* ✅ kept from existing file: Technical Specifications table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">{t("carDetails.specsTitle")}</h3>
        <table className="table-auto w-full text-sm">
          <tbody>
            {[
              ["mileage", car.mileage],
              ["engineSize", car.engine_size],
              ["powerKW", car.power_kw],
              ["powerHP", car.power_hp],
              ["driveType", car.drive_type],
              ["fuelType", car.fuel_type],
              ["consumption", car.consumption_combined],
              ["co2", car.co2_emission],
              ["seats", car.seats],
              ["doors", car.doors],
              ["transmission", car.transmission],
              ["emissionClass", car.emission_class],
              ["firstRegistration", car.first_registration],
              ["climateControl", car.climate_control],
              ["color", car.color],
              ["interior", car.interior],
              ["trailerWeightBraked", car.trailer_weight_braked],
              ["trailerWeightUnbraked", car.trailer_weight_unbraked],
              ["weight", car.weight],
              ["cylinders", car.cylinders],
              ["tankSize", car.tank_size],
            ].map(([key, value]) =>
              value ? (
                <tr key={key} className="border-b">
                  <td className="font-medium py-2 pr-4 text-gray-700">{t(`carDetails.${key}`)}</td>
                  <td className="py-2 text-gray-900">{value}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarDetailsPublic;

