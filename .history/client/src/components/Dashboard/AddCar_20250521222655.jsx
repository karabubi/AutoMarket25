

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Dashboard/AddCar.jsx

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import ImageUpload from './ImageUpload';
// import { useState } from 'react';
// import MultipleImageUpload from '../../components/MultipleImageUpload';

// const schema = z.object({
//   make: z.string().min(1, 'Make is required'),
//   model: z.string().min(1, 'Model is required'),
//   year: z.number().min(1886, 'Year must be valid'),
//   price: z.number().positive('Price must be positive'),
//   description: z.string().optional(),
//   image_url: z.string().url('Invalid image URL').optional(),
//   image_urls: z.array(z.string().url()).optional(),
//   mileage: z.number().int().optional(),
//   engine_size: z.number().optional(),
//   power_kw: z.number().optional(),
//   power_hp: z.number().optional(),
//   drive_type: z.string().optional(),
//   fuel_type: z.string().optional(),
//   consumption_combined: z.number().optional(),
//   co2_emission: z.number().optional(),
//   seats: z.number().int().optional(),
//   doors: z.number().int().optional(),
//   transmission: z.string().optional(),
//   emission_class: z.string().optional(),
//   first_registration: z.string().optional(),
//   climate_control: z.string().optional(),
//   color: z.string().optional(),
//   interior: z.string().optional(),
//   trailer_weight_braked: z.number().optional(),
//   trailer_weight_unbraked: z.number().optional(),
//   weight: z.number().optional(),
//   cylinders: z.number().optional(),
//   tank_size: z.number().optional()
// });

// const AddCar = () => {
//   const [message, setMessage] = useState('');
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const { register, handleSubmit, setValue, reset } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     const token = localStorage.getItem('token');
//     if (!token) return setMessage('❌ Please log in.');

//     try {
//       const res = await fetch('/api/cars', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...data,
//           image_urls: uploadedImages,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to add car');
//       }

//       setMessage('✅ Car added successfully!');
//       reset();
//       setUploadedImages([]);
//     } catch (err) {
//       setMessage(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add New Car</h2>
//       {message && <p className="text-center text-sm mb-4">{message}</p>}

//       {/* Basic Fields */}
//       <input {...register('make')} placeholder="Make" className="mb-2 p-2 border w-full" />
//       <input {...register('model')} placeholder="Model" className="mb-2 p-2 border w-full" />
//       <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="mb-2 p-2 border w-full" />
//       <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price" className="mb-2 p-2 border w-full" />

//       {/* Extended Technical Fields */}
//       <input {...register('mileage', { valueAsNumber: true })} type="number" placeholder="Mileage (km)" className="mb-2 p-2 border w-full" />
//       <input {...register('engine_size', { valueAsNumber: true })} type="number" step="0.1" placeholder="Engine Size (L)" className="mb-2 p-2 border w-full" />
//       <input {...register('power_kw', { valueAsNumber: true })} type="number" placeholder="Power (kW)" className="mb-2 p-2 border w-full" />
//       <input {...register('power_hp', { valueAsNumber: true })} type="number" placeholder="Power (PS)" className="mb-2 p-2 border w-full" />
//       <input {...register('consumption_combined', { valueAsNumber: true })} type="number" step="0.1" placeholder="Consumption (L/100km)" className="mb-2 p-2 border w-full" />
//       <input {...register('co2_emission', { valueAsNumber: true })} type="number" placeholder="CO2 Emission (g/km)" className="mb-2 p-2 border w-full" />
//       <input {...register('seats', { valueAsNumber: true })} type="number" placeholder="Seats" className="mb-2 p-2 border w-full" />
//       <input {...register('doors', { valueAsNumber: true })} type="number" placeholder="Doors" className="mb-2 p-2 border w-full" />
//       <input {...register('transmission')} placeholder="Transmission" className="mb-2 p-2 border w-full" />
//       <input {...register('emission_class')} placeholder="Emission Class" className="mb-2 p-2 border w-full" />
//       <input {...register('first_registration')} type="date" className="mb-2 p-2 border w-full" />
//       <input {...register('climate_control')} placeholder="Climate Control" className="mb-2 p-2 border w-full" />
//       <input {...register('color')} placeholder="Color" className="mb-2 p-2 border w-full" />
//       <input {...register('interior')} placeholder="Interior" className="mb-2 p-2 border w-full" />
//       <input {...register('trailer_weight_braked', { valueAsNumber: true })} type="number" placeholder="Trailer Weight (Braked)" className="mb-2 p-2 border w-full" />
//       <input {...register('trailer_weight_unbraked', { valueAsNumber: true })} type="number" placeholder="Trailer Weight (Unbraked)" className="mb-2 p-2 border w-full" />
//       <input {...register('weight', { valueAsNumber: true })} type="number" placeholder="Weight (kg)" className="mb-2 p-2 border w-full" />
//       <input {...register('cylinders', { valueAsNumber: true })} type="number" placeholder="Cylinders" className="mb-2 p-2 border w-full" />
//       <input {...register('tank_size', { valueAsNumber: true })} type="number" placeholder="Tank Size (L)" className="mb-2 p-2 border w-full" />

//       {/* Select Fields */}
//       <select {...register('drive_type')} className="mb-2 p-2 border w-full">
//         <option value="">Drive Type</option>
//         <option value="Front">Front</option>
//         <option value="Rear">Rear</option>
//         <option value="All-Wheel">All-Wheel</option>
//       </select>

//       <select {...register('fuel_type')} className="mb-2 p-2 border w-full">
//         <option value="">Fuel Type</option>
//         <option value="Petrol">Petrol</option>
//         <option value="Diesel">Diesel</option>
//         <option value="Electric">Electric</option>
//         <option value="Hybrid">Hybrid</option>
//       </select>

//       {/* Description + Images */}
//       <textarea {...register('description')} placeholder="Description" className="mb-2 p-2 border w-full" />
//       <ImageUpload onUploadSuccess={(url) => setValue('image_url', url)} />
//       <MultipleImageUpload onUploadComplete={(urls) => setUploadedImages(urls)} />

//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Add Car</button>
//     </form>
//   );
// };

// export default AddCar;



// client/src/components/Dashboard/AddCar.jsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import MultipleImageUpload from '../../components/MultipleImageUpload';

const schema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1886, 'Year must be valid'),
  price: z.number().positive('Price must be positive'),
  fuel_type: z.string().min(1, 'Fuel type is required'),
  power_kw: z.number().optional(),
  battery_capacity: z.number().optional(), // Conditional
  image_url: z.string().url('Invalid image URL').optional(),
  image_urls: z.array(z.string().url()).optional(),
});

const AddCar = () => {
  const [message, setMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [fuelType, setFuelType] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const watchFuel = watch('fuel_type');

  useEffect(() => {
    setFuelType(watchFuel);
  }, [watchFuel]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) return setMessage('❌ Please log in.');

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          image_urls: uploadedImages,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add car');
      }

      setMessage('✅ Car added successfully!');
      reset();
      setUploadedImages([]);
      setPreviewImages([]);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleUploadComplete = (urls) => {
    setUploadedImages(urls);
    setPreviewImages(urls);
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🚘 Add New Car</h2>
        {message && (
          <p className={`text-center mb-4 font-semibold ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input {...register('make')} placeholder="Make" className="input" />
            <input {...register('model')} placeholder="Model" className="input" />
            <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="input" />
            <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price (€)" className="input" />
            <select {...register('fuel_type')} className="input">
              <option value="">Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input {...register('power_kw', { valueAsNumber: true })} type="number" placeholder="Power (kW)" className="input" />
            {fuelType === 'Electric' && (
              <input {...register('battery_capacity', { valueAsNumber: true })} type="number" placeholder="Battery Capacity (kWh)" className="input" />
            )}
          </div>

          <textarea {...register('description')} placeholder="Description" className="w-full p-3 border rounded-md focus:outline-none focus:ring" rows="4" />

          <ImageUpload onUploadSuccess={(url) => setValue('image_url', url)} />

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Additional Images</h3>
            <MultipleImageUpload onUploadComplete={handleUploadComplete} />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {previewImages.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preview ${idx}`}
                    className="rounded-lg w-full h-40 object-cover shadow"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Car
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddCar;
