

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

// client/src/pages/Dashboard/AddCar.jsx

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useState } from 'react';
// import ImageUpload from './ImageUpload';
// import MultipleImageUpload from '../../components/MultipleImageUpload';

// const schema = z.object({
//   make: z.string().min(1, 'Make is required'),
//   model: z.string().min(1, 'Model is required'),
//   year: z.number().min(1886, 'Year must be valid'),
//   price: z.number().positive('Price must be positive'),
//   description: z.string().optional(),
//   image_url: z.string().url('Invalid image URL').optional(),
//   image_urls: z.array(z.string().url()).optional(),

//   // Optional technical fields
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

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset
//   } = useForm({
//     resolver: zodResolver(schema)
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
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
//       <h2 className="text-2xl font-bold mb-2">Add New Car</h2>
//       {message && <p className="text-sm text-center mb-4">{message}</p>}

//       {/* Basic Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input {...register('make')} placeholder="Make" className="p-2 border rounded w-full" />
//         <input {...register('model')} placeholder="Model" className="p-2 border rounded w-full" />
//         <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="p-2 border rounded w-full" />
//         <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price (€)" className="p-2 border rounded w-full" />
//       </div>

//       {/* Optional Specs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input {...register('mileage', { valueAsNumber: true })} type="number" placeholder="Mileage (km)" className="p-2 border rounded w-full" />
//         <input {...register('engine_size', { valueAsNumber: true })} type="number" step="0.1" placeholder="Engine Size (L)" className="p-2 border rounded w-full" />
//         <input {...register('power_kw', { valueAsNumber: true })} type="number" placeholder="Power (kW)" className="p-2 border rounded w-full" />
//         <input {...register('power_hp', { valueAsNumber: true })} type="number" placeholder="Power (PS)" className="p-2 border rounded w-full" />
//         <input {...register('seats', { valueAsNumber: true })} type="number" placeholder="Seats" className="p-2 border rounded w-full" />
//         <input {...register('doors', { valueAsNumber: true })} type="number" placeholder="Doors" className="p-2 border rounded w-full" />
//         <input {...register('transmission')} placeholder="Transmission" className="p-2 border rounded w-full" />
//         <input {...register('fuel_type')} placeholder="Fuel Type" className="p-2 border rounded w-full" />
//         <input {...register('drive_type')} placeholder="Drive Type" className="p-2 border rounded w-full" />
//         <input {...register('color')} placeholder="Color" className="p-2 border rounded w-full" />
//         <input {...register('interior')} placeholder="Interior" className="p-2 border rounded w-full" />
//       </div>

//       {/* Description */}
//       <textarea {...register('description')} placeholder="Description" className="p-2 border rounded w-full" rows={3} />

//       {/* 📸 Upload Main Image */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Main Image Upload</h3>
//         <ImageUpload onUploadSuccess={(url) => setValue('image_url', url)} />
//       </div>

//       {/* 📤 Upload Additional Images */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-2">Upload Additional Images</h3>
//         <MultipleImageUpload onUploadComplete={(urls) => setUploadedImages(urls)} />
//       </div>

//       {/* Submit */}
//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//         Add Car
//       </button>
//     </form>
//   );
// };

// export default AddCar;


// client/src/pages/Dashboard/AddCar.jsx


// client/src/pages/Dashboard/AddCar.jsx

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useState } from 'react';
// import ImageUpload from './ImageUpload';
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
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
//       <h2 className="text-2xl font-bold">Add New Car</h2>
//       {message && <p className="text-center text-sm text-red-600">{message}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input {...register('make')} placeholder="Make" className="p-2 border rounded" />
//         <input {...register('model')} placeholder="Model" className="p-2 border rounded" />
//         <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="p-2 border rounded" />
//         <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price (€)" className="p-2 border rounded" />
//         <input {...register('mileage', { valueAsNumber: true })} type="number" placeholder="Mileage (km)" className="p-2 border rounded" />
//         <input {...register('engine_size', { valueAsNumber: true })} type="number" step="0.1" placeholder="Engine Size (L)" className="p-2 border rounded" />
//         <input {...register('power_kw', { valueAsNumber: true })} type="number" placeholder="Power (kW)" className="p-2 border rounded" />
//         <input {...register('power_hp', { valueAsNumber: true })} type="number" placeholder="Power (PS)" className="p-2 border rounded" />
//         <input {...register('consumption_combined', { valueAsNumber: true })} type="number" step="0.1" placeholder="Consumption (L/100km)" className="p-2 border rounded" />
//         <input {...register('co2_emission', { valueAsNumber: true })} type="number" placeholder="CO2 Emission (g/km)" className="p-2 border rounded" />
//         <input {...register('seats', { valueAsNumber: true })} type="number" placeholder="Seats" className="p-2 border rounded" />
//         <input {...register('doors', { valueAsNumber: true })} type="number" placeholder="Doors" className="p-2 border rounded" />
//         <input {...register('transmission')} placeholder="Transmission" className="p-2 border rounded" />
//         <input {...register('emission_class')} placeholder="Emission Class" className="p-2 border rounded" />
//         <input {...register('first_registration')} type="date" className="p-2 border rounded" />
//         <input {...register('climate_control')} placeholder="Climate Control" className="p-2 border rounded" />
//         <input {...register('color')} placeholder="Color" className="p-2 border rounded" />
//         <input {...register('interior')} placeholder="Interior" className="p-2 border rounded" />
//         <input {...register('trailer_weight_braked', { valueAsNumber: true })} type="number" placeholder="Trailer Weight (Braked)" className="p-2 border rounded" />
//         <input {...register('trailer_weight_unbraked', { valueAsNumber: true })} type="number" placeholder="Trailer Weight (Unbraked)" className="p-2 border rounded" />
//         <input {...register('weight', { valueAsNumber: true })} type="number" placeholder="Weight (kg)" className="p-2 border rounded" />
//         <input {...register('cylinders', { valueAsNumber: true })} type="number" placeholder="Cylinders" className="p-2 border rounded" />
//         <input {...register('tank_size', { valueAsNumber: true })} type="number" placeholder="Tank Size (L)" className="p-2 border rounded" />
//       </div>

//       <select {...register('drive_type')} className="p-2 border rounded w-full">
//         <option value="">Drive Type</option>
//         <option value="Front">Front</option>
//         <option value="Rear">Rear</option>
//         <option value="All-Wheel">All-Wheel</option>
//       </select>

//       <select {...register('fuel_type')} className="p-2 border rounded w-full">
//         <option value="">Fuel Type</option>
//         <option value="Petrol">Petrol</option>
//         <option value="Diesel">Diesel</option>
//         <option value="Electric">Electric</option>
//         <option value="Hybrid">Hybrid</option>
//       </select>

//       <textarea {...register('description')} placeholder="Description" className="w-full p-2 border rounded" rows={3} />

//       {/* Upload Sections */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Main Image Upload</h3>
//         <ImageUpload onUploadSuccess={(url) => setValue('image_url', url)} />
//       </div>

//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-2">Upload Additional Images</h3>
//         <MultipleImageUpload onUploadComplete={(urls) => setUploadedImages(urls)} />
//       </div>

//       <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//         Add Car
//       </button>
//     </form>
//   );
// };

// export default AddCar;


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ImageUpload from './ImageUpload';
import { useState } from 'react';
import MultipleImageUpload from '../../components/MultipleImageUpload';

const schema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1886, 'Year must be valid'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
  image_url: z.string().url('Invalid image URL').optional(),
  image_urls: z.array(z.string().url()).optional(),
  mileage: z.number().int().optional(),
  engine_size: z.number().optional(),
  power_kw: z.number().optional(),
  power_hp: z.number().optional(),
  drive_type: z.string().optional(),
  fuel_type: z.string().optional(),
  consumption_combined: z.number().optional(),
  co2_emission: z.number().optional(),
  seats: z.number().int().optional(),
  doors: z.number().int().optional(),
  transmission: z.string().optional(),
  emission_class: z.string().optional(),
  first_registration: z.string().optional(),
  climate_control: z.string().optional(),
  color: z.string().optional(),
  interior: z.string().optional(),
  trailer_weight_braked: z.number().optional(),
  trailer_weight_unbraked: z.number().optional(),
  weight: z.number().optional(),
  cylinders: z.number().optional(),
  tank_size: z.number().optional()
});

const AddCar = () => {
  const [message, setMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: zodResolver(schema),
  });

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
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Car</h2>
      {message && <p className="text-center text-sm mb-4">{message}</p>}

      {/* Basic Fields */}
      <input {...register('make')} placeholder="Make" className="mb-2 p-2 border w-full" />
      <input {...register('model')} placeholder="Model" className="mb-2 p-2 border w-full" />
      <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="mb-2 p-2 border w-full" />
      <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price" className="mb-2 p-2 border w-full" />

      {/* Extended Technical Fields */}
      <input {...register('mileage', { valueAsNumber: true })} type="number" placeholder="Mileage (km)" className="mb-2 p-2 border w-full" />
      <input {...register('engine_size', { valueAsNumber: true })} type="number" step="0.1" placeholder="Engine Size (L)" className="mb-2 p-2 border w-full" />
      <input {...register('power_kw', { valueAsNumber: true })} type="number" placeholder="Power (kW)" className="mb-2 p-2 border w-full" />
      <input {...register('power_hp', { valueAsNumber: true })} type="number" placeholder="Power (PS)" className="mb-2 p-2 border w-full" />
      <input {...register('consumption_combined', { valueAsNumber: true })} type="number" step="0.1" placeholder="Consumption (L/100km)" className="mb-2 p-2 border w-full" />
      <input {...register('co2_emission', { valueAsNumber: true })} type="number" placeholder="CO2 Emission (g/km)" className="mb-2 p-2 border w-full" />
      <input {...register('seats', { valueAsNumber: true })} type="number" placeholder="Seats" className="mb-2 p-2 border w-full" />
      <input {...register('doors', { valueAsNumber: true })} type="number" placeholder="Doors" className="mb-2 p-2 border w-full" />
      <input {...register('transmission')} placeholder="Transmission" className="mb-2 p-2 border w-full" />
      <input {...register('emission_class')} placeholder="Emission Class" className="mb-2 p-2 border w-full" />
      <input {...register('first_registration')} type="date" className="mb-2 p-2 border w-full" />
      <input {...register('climate_control')} placeholder="Climate Control" className="mb-2 p-2 border w-full" />
      <input {...register('color')} placeholder="Color" className="mb-2 p-2 border w-full" />
      <input {...register('interior')} placeholder="Interior" className="mb-2 p-2 border w-full" />
      <input {...register('trailer_weight_braked', { valueAsNumber: true })} type="number" placeholder="Trailer Weight (Braked)" className="mb-2 p-2 border w-full" />
      <input {...register('trailer_weight_unbraked', { valueAsNumber: true })} type="number" placeholder="Trailer Weight (Unbraked)" className="mb-2 p-2 border w-full" />
      <input {...register('weight', { valueAsNumber: true })} type="number" placeholder="Weight (kg)" className="mb-2 p-2 border w-full" />
      <input {...register('cylinders', { valueAsNumber: true })} type="number" placeholder="Cylinders" className="mb-2 p-2 border w-full" />
      <input {...register('tank_size', { valueAsNumber: true })} type="number" placeholder="Tank Size (L)" className="mb-2 p-2 border w-full" />

      {/* Select Fields */}
      <select {...register('drive_type')} className="mb-2 p-2 border w-full">
        <option value="">Drive Type</option>
        <option value="Front">Front</option>
        <option value="Rear">Rear</option>
        <option value="All-Wheel">All-Wheel</option>
      </select>

      <select {...register('fuel_type')} className="mb-2 p-2 border w-full">
        <option value="">Fuel Type</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      {/* Description */}
      <textarea {...register('description')} placeholder="Description" className="mb-2 p-2 border w-full" />

      {/* 📷 Main Image Upload */}
      <ImageUpload onUploadSuccess={(url) => setValue('image_url', url)} />

      {/* 🖼 Upload Additional Images Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mt-4 mb-2">Upload Additional Images</h3>
        <MultipleImageUpload onUploadComplete={(urls) => setUploadedImages(urls)} />
      </div>

      {/* Submit */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
        Add Car
      </button>
    </form>
  );
};

export default AddCar;
