

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
//   image_urls: z.array(z.string().url()).optional(), // NEU: array für mehrere Bilder
// });

// const AddCar = () => {
//   const [message, setMessage] = useState('');
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
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
//           image_urls: uploadedImages, // Bild-URLs mitschicken
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to add car');
//       }

//       setMessage('✅ Car added successfully!');
//       reset();
//       setUploadedImages([]); // Zurücksetzen
//     } catch (err) {
//       setMessage(`❌ ${err.message}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add New Car</h2>
//       {message && <p className="text-center text-sm mb-4">{message}</p>}

//       <input {...register('make')} placeholder="Make" className="mb-2 p-2 border w-full" />
//       {errors.make && <p className="text-red-500">{errors.make.message}</p>}

//       <input {...register('model')} placeholder="Model" className="mb-2 p-2 border w-full" />
//       {errors.model && <p className="text-red-500">{errors.model.message}</p>}

//       <input {...register('year', { valueAsNumber: true })} type="number" placeholder="Year" className="mb-2 p-2 border w-full" />
//       {errors.year && <p className="text-red-500">{errors.year.message}</p>}

//       <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price" className="mb-2 p-2 border w-full" />
//       {errors.price && <p className="text-red-500">{errors.price.message}</p>}

//       <textarea {...register('description')} placeholder="Description" className="mb-2 p-2 border w-full" />

//       {/* ✅ Einzelbild-Upload (optional) */}
//       <ImageUpload onUploadSuccess={(url) => setValue('image_url', url)} />
//       {errors.image_url && <p className="text-red-500">{errors.image_url.message}</p>}

//       {/* ✅ Mehrfachbild-Upload */}
//       <MultipleImageUpload onUploadComplete={(urls) => setUploadedImages(urls)} />

//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Add Car</button>
//     </form>
//   );
// };

// export default AddCar;



