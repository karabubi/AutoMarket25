//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarForm.jsx


import BaseForm from "./BaseForm";
import API, { addCar, uploadCarImages } from "../utils/api";

const CarForm = ({ onSuccess }) => {
  const fields = [
    { name: "make", type: "text", placeholder: "Marke", required: true },
    { name: "model", type: "text", placeholder: "Modell", required: true },
    { name: "year", type: "number", placeholder: "Baujahr", required: true },
    { name: "price", type: "number", placeholder: "Preis in Euro", required: true },
    { name: "mileage", type: "number", placeholder: "Kilometerstand", required: false },
    { name: "engine_size", type: "number", placeholder: "Hubraum in L", required: false },
    { name: "power_kw", type: "number", placeholder: "Leistung in kW", required: false },
    { name: "fuel_type", type: "text", placeholder: "Kraftstoffart", required: false },
    { name: "drive_type", type: "text", placeholder: "Antriebsart", required: false },
    { name: "transmission", type: "text", placeholder: "Getriebe", required: false },
    { name: "color", type: "text", placeholder: "Farbe", required: false },
    { name: "seats", type: "number", placeholder: "Sitzplätze", required: false },
    { name: "doors", type: "number", placeholder: "Türen", required: false },
    { name: "description", type: "textarea", placeholder: "Beschreibung", required: false },
    { name: "image", type: "file", placeholder: "", required: true }, // BaseForm should give data.image or data.file
  ];

  const handleCarSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Nicht eingeloggt.");
      return;
    }

    try {
      // BaseForm sometimes gives file as data.file or data.image. Support both:
      const pickedFile = data.file || data.image || data.image?.[0];
      if (!pickedFile) {
        alert("❌ Bitte ein Bild auswählen.");
        return;
      }

      // 1) Create car first (WITHOUT image_url)
      const carPayload = {
        make: data.make,
        model: data.model,
        year: Number(data.year),
        price: Number(data.price),
        description: data.description || "",
        mileage: data.mileage ? Number(data.mileage) : undefined,
        engine_size: data.engine_size ? Number(data.engine_size) : undefined,
        power_kw: data.power_kw ? Number(data.power_kw) : undefined,
        fuel_type: data.fuel_type || "",
        drive_type: data.drive_type || "",
        transmission: data.transmission || "",
        color: data.color || "",
        seats: data.seats ? Number(data.seats) : undefined,
        doors: data.doors ? Number(data.doors) : undefined,
      };

      const createdRes = await addCar(carPayload, token);

      // accept common response shapes
      const carId =
        createdRes.data?.id ||
        createdRes.data?.data?.id ||
        createdRes.data?.car?.id ||
        createdRes.data?.data?.car?.id;

      if (!carId) {
        console.log("Create car response:", createdRes.data);
        throw new Error("Car created but ID not returned.");
      }

      // 2) Upload image(s) to /cars/:carId/images
      const uploadRes = await uploadCarImages(carId, [pickedFile], token);

      // uploadCarImages returns axios response; your backend returns array rows or {images:...}
      const uploaded =
        uploadRes.data?.images ||
        uploadRes.data ||
        [];

      const firstUrl =
        Array.isArray(uploaded) ? uploaded?.[0]?.image_url : uploaded?.[0]?.image_url;

      // 3) OPTIONAL: set cars.image_url to the first uploaded image (if your backend has PUT/PATCH)
      // If you don't have this route, remove this block safely.
      if (firstUrl) {
        try {
          await API.put(
            `/cars/${carId}`,
            { image_url: firstUrl },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (e) {
          // Not fatal if update route doesn't exist
          console.warn("Could not update main image_url on car. Safe to ignore.", e?.response?.data || e.message);
        }
      }

      alert("✅ Fahrzeug erfolgreich hinzugefügt!");
      onSuccess?.();
    } catch (err) {
      console.error("❌ Fehler beim Hinzufügen:", err);
      alert(`❌ Fahrzeug konnte nicht hinzugefügt werden. ${err?.message || ""}`);
    }
  };

  return <BaseForm fields={fields} onSubmit={handleCarSubmit} buttonText="Fahrzeug speichern" />;
};

export default CarForm;
