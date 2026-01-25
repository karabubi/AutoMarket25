
////Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/Dashboard/AddCar.jsx

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MultipleImageUpload from "../../components/MultipleImageUpload";
import API, { uploadCarImages } from "../../utils/api";

// ✅ helper: allow empty numeric input without crashing
const numOptional = () =>
  z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z.number().optional()
  );

const numRequired = (min, msg) =>
  z.preprocess((v) => Number(v), z.number().min(min, msg));

const schema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: numRequired(1886, "Year must be valid"),
  price: z.preprocess((v) => Number(v), z.number().positive("Price must be positive")),

  description: z.string().optional(),
  fuel_type: z.string().optional(),
  drive_type: z.string().optional(),

  mileage: numOptional(),
  engine_size: numOptional(),
  power_kw: numOptional(),
  power_hp: numOptional(),
  consumption_combined: numOptional(),
  co2_emission: numOptional(),
  seats: numOptional(),
  doors: numOptional(),
  transmission: z.string().optional(),
  emission_class: z.string().optional(),
  first_registration: z.string().optional(),
  climate_control: z.string().optional(),
  color: z.string().optional(),
  interior: z.string().optional(),
  trailer_weight_braked: numOptional(),
  trailer_weight_unbraked: numOptional(),
  weight: numOptional(),
  cylinders: numOptional(),
  tank_size: numOptional(),
  battery_capacity: numOptional(),
});

function extractCarId(payload) {
  return payload?.id || payload?.data?.id || payload?.car?.id || payload?.data?.car?.id || null;
}

export default function AddCar() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // main image + extra images picked before submit
  const [mainFile, setMainFile] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [extraFiles, setExtraFiles] = useState([]);

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { year: new Date().getFullYear() },
  });

  const fuelType = watch("fuel_type");
  const showBattery = useMemo(() => fuelType === "Electric", [fuelType]);

  useEffect(() => {
    return () => {
      if (mainPreview) URL.revokeObjectURL(mainPreview);
    };
  }, [mainPreview]);

  const onPickMainImage = (e) => {
    const file = e.target.files?.[0] || null;
    setMainFile(file);

    if (mainPreview) URL.revokeObjectURL(mainPreview);
    setMainPreview(file ? URL.createObjectURL(file) : "");
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) return setMessage("❌ Please log in.");

    setSubmitting(true);
    setMessage("");

    try {
      // ✅ 1) Create car FIRST (Axios uses correct baseURL in prod)
      const createdRes = await API.post("/cars", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const carId = extractCarId(createdRes.data);
      if (!carId) throw new Error("Car created but carId not returned.");

      // ✅ 2) Upload images (main first so it becomes cars.image_url on server)
      const allToUpload = [];
      if (mainFile) allToUpload.push(mainFile);
      if (extraFiles.length) allToUpload.push(...extraFiles);

      if (allToUpload.length) {
        await uploadCarImages(carId, allToUpload, token);
      }

      setMessage("✅ Car created and images uploaded successfully!");
      reset({ year: new Date().getFullYear() });

      setMainFile(null);
      if (mainPreview) URL.revokeObjectURL(mainPreview);
      setMainPreview("");
      setExtraFiles([]);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong while saving the car.";
      setMessage(`❌ ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🚘 Add New Car</h2>

        {message && (
          <p className={`text-center mb-4 font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input {...register("make")} placeholder="Make" className="input" />
            <input {...register("model")} placeholder="Model" className="input" />
            <input {...register("year")} type="number" placeholder="Year" className="input" />
            <input {...register("price")} type="number" placeholder="Price (€)" className="input" />

            <select {...register("fuel_type")} className="input">
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            {showBattery && (
              <input
                {...register("battery_capacity")}
                type="number"
                placeholder="Battery Capacity (kWh)"
                className="input"
              />
            )}

            <input {...register("power_kw")} type="number" placeholder="Power (kW)" className="input" />
            <input {...register("power_hp")} type="number" placeholder="Power (PS)" className="input" />
            <input {...register("mileage")} type="number" placeholder="Mileage (km)" className="input" />
            <input {...register("engine_size")} type="number" placeholder="Engine Size (L)" className="input" />
            <input {...register("co2_emission")} type="number" placeholder="CO₂ Emission (g/km)" className="input" />
            <input {...register("consumption_combined")} type="number" placeholder="Consumption (L/100km)" className="input" />
            <input {...register("seats")} type="number" placeholder="Seats" className="input" />
            <input {...register("doors")} type="number" placeholder="Doors" className="input" />
            <input {...register("transmission")} placeholder="Transmission" className="input" />
            <input {...register("emission_class")} placeholder="Emission Class" className="input" />
            <input {...register("first_registration")} type="date" className="input" />
            <input {...register("climate_control")} placeholder="Climate Control" className="input" />
            <input {...register("color")} placeholder="Color" className="input" />
            <input {...register("interior")} placeholder="Interior" className="input" />
            <input {...register("trailer_weight_braked")} type="number" placeholder="Trailer Weight (Braked)" className="input" />
            <input {...register("trailer_weight_unbraked")} type="number" placeholder="Trailer Weight (Unbraked)" className="input" />
            <input {...register("weight")} type="number" placeholder="Weight (kg)" className="input" />
            <input {...register("cylinders")} type="number" placeholder="Cylinders" className="input" />
            <input {...register("tank_size")} type="number" placeholder="Tank Size (L)" className="input" />

            <select {...register("drive_type")} className="input">
              <option value="">Drive Type</option>
              <option value="Front">Front</option>
              <option value="Rear">Rear</option>
              <option value="All-Wheel">All-Wheel</option>
            </select>
          </div>

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring"
            rows="4"
          />

          {/* ✅ Main image */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <label className="block font-medium mb-2">Main Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={onPickMainImage}
              disabled={submitting}
              className="w-full text-sm"
            />
            {mainPreview && (
              <img
                src={mainPreview}
                alt="Main preview"
                className="w-40 h-28 object-cover rounded border mt-2"
              />
            )}
            <p className="text-xs text-gray-600 mt-2">
              Main image uploads when you click <b>Submit Car</b>.
            </p>
          </div>

          {/* ✅ Extra images picker */}
          <MultipleImageUpload
            onFilesChange={(files) => setExtraFiles(files)}
            disabled={submitting}
            label="Upload Additional Images (optional)"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Submit Car"}
          </button>
        </form>
      </div>
    </section>
  );
}
