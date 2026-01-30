
// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/CarDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ use api.js instead of localhost axios
import { fetchCarById } from "../utils/api";

import CarImagesGallery from "../components/CarImagesGallery";
import CarTitle from "../components/CarTitle";
import PriceBox from "../components/PriceBox";
import DealerCard from "../components/DealerCard";
import MultipleImageUpload from "../components/MultipleImageUpload";

const CarDetails = () => {
  const { id } = useParams();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ merged: safer loading (mounted flag) + uses fetchCarById
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

        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "❌ Failed to load car details.";

        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchCarDetails();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-6 text-gray-600">Loading car details...</div>;
  if (error || !car) return <div className="p-6 text-red-500">{error || "Car not found."}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Car Image Gallery */}
      <CarImagesGallery carId={id} />

      {/* Title and Description */}
      <CarTitle
        title={`${car.make ?? ""} ${car.model ?? ""}`.trim()}
        subtitle={car.description || ""}
        location={car.location || "Unbekannt"}
      />

      {/* Price and Dealer Info */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <PriceBox price={car.price} />
        <DealerCard
          dealer={
            car.dealer || {
              name: "Automarkt25",
              phone: "+4917655105979",
              email: "karabubi66@yahoo.com",
              rating: 4.5,
              logoUrl: "/logo.png",
            }
          }
        />
      </div>

      {/* Technical Specifications (kept from existing file) */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
        <table className="table-auto w-full text-sm">
          <tbody>
            {[
              ["Mileage (km)", car.mileage],
              ["Engine Size (L)", car.engine_size],
              ["Power (kW)", car.power_kw],
              ["Power (PS)", car.power_hp],
              ["Drive Type", car.drive_type],
              ["Fuel Type", car.fuel_type],
              ["Consumption (L/100km)", car.consumption_combined],
              ["CO2 Emission (g/km)", car.co2_emission],
              ["Seats", car.seats],
              ["Doors", car.doors],
              ["Transmission", car.transmission],
              ["Emission Class", car.emission_class],
              ["First Registration", car.first_registration],
              ["Climate Control", car.climate_control],
              ["Color", car.color],
              ["Interior", car.interior],
              ["Trailer Weight (Braked)", car.trailer_weight_braked],
              ["Trailer Weight (Unbraked)", car.trailer_weight_unbraked],
              ["Weight (kg)", car.weight],
              ["Cylinders", car.cylinders],
              ["Tank Size (L)", car.tank_size],
            ].map(([label, value]) =>
              value ? (
                <tr key={label} className="border-b">
                  <td className="font-medium py-2 pr-4 text-gray-700">{label}</td>
                  <td className="py-2 text-gray-900">{value}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Additional Images - Only visible when logged in */}
      {isLoggedIn && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Upload Additional Images</h3>
          <MultipleImageUpload carId={id} onUploadComplete={() => window.location.reload()} />
        </div>
      )}
    </div>
  );
};

export default CarDetails;
