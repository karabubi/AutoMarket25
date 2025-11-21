//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarForm.jsx


import BaseForm from './BaseForm';
import axios from 'axios';

const CarForm = ({ onSuccess }) => {
  const fields = [
    { name: 'make', type: 'text', placeholder: 'Marke', required: true },
    { name: 'model', type: 'text', placeholder: 'Modell', required: true },
    { name: 'year', type: 'number', placeholder: 'Baujahr', required: true },
    { name: 'price', type: 'number', placeholder: 'Preis in Euro', required: true },
    { name: 'mileage', type: 'number', placeholder: 'Kilometerstand', required: false },
    { name: 'engine_size', type: 'number', placeholder: 'Hubraum in L', required: false },
    { name: 'power_kw', type: 'number', placeholder: 'Leistung in kW', required: false },
    { name: 'fuel_type', type: 'text', placeholder: 'Kraftstoffart', required: false },
    { name: 'drive_type', type: 'text', placeholder: 'Antriebsart', required: false },
    { name: 'transmission', type: 'text', placeholder: 'Getriebe', required: false },
    { name: 'color', type: 'text', placeholder: 'Farbe', required: false },
    { name: 'seats', type: 'number', placeholder: 'Sitzplätze', required: false },
    { name: 'doors', type: 'number', placeholder: 'Türen', required: false },
    { name: 'description', type: 'textarea', placeholder: 'Beschreibung', required: false },
    { name: 'image', type: 'file', placeholder: '', required: true },
  ];

  const handleCarSubmit = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('❌ Nicht eingeloggt.');
      return;
    }

    try {
      // 1️⃣ Upload image
      const uploadData = new FormData();
      uploadData.append('image', data.file);
      const uploadRes = await axios.post('http://localhost:5001/api/cars/upload', uploadData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2️⃣ Prepare car data
      const carData = {
        make: data.make,
        model: data.model,
        year: parseInt(data.year),
        price: parseFloat(data.price),
        description: data.description,
        image_url: uploadRes.data.url,
        mileage: data.mileage ? parseInt(data.mileage) : null,
        engine_size: data.engine_size ? parseFloat(data.engine_size) : null,
        power_kw: data.power_kw ? parseInt(data.power_kw) : null,
        fuel_type: data.fuel_type,
        drive_type: data.drive_type,
        transmission: data.transmission,
        color: data.color,
        seats: data.seats ? parseInt(data.seats) : null,
        doors: data.doors ? parseInt(data.doors) : null,
      };

      await axios.post('http://localhost:5001/api/cars', carData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('✅ Fahrzeug erfolgreich hinzugefügt!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('❌ Fehler beim Hinzufügen:', err);
      alert('❌ Fahrzeug konnte nicht hinzugefügt werden.');
    }
  };

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleCarSubmit}
      buttonText="Fahrzeug speichern"
    />
  );
};

export default CarForm;
