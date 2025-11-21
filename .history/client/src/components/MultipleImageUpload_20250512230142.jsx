//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/MultipleImageUpload.jsx
// import { useState } from 'react';
// import { uploadCarImages } from '../utils/api';

// const MultipleImageUpload = ({ onUploadComplete }) => {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleChange = (e) => setFiles([...e.target.files]);

//   const handleUpload = async () => {
//     const token = localStorage.getItem('token');
//     const formData = new FormData();

//     files.forEach((file) => formData.append('images', file));
//     formData.append('car_id', 0); // Dummy car_id (falls nötig)

//     try {
//       setUploading(true);
//       const res = await uploadCarImages(0, files, token); // Passe car_id an
//       const urls = res.data.map((img) => img.image_url);
//       onUploadComplete(urls);
//     } catch (err) {
//       console.error('Upload error:', err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-50 rounded mb-4">
//       <label className="block mb-2">Upload Multiple Images</label>
//       <input type="file" multiple onChange={handleChange} />
//       <button
//         type="button"
//         onClick={handleUpload}
//         disabled={uploading}
//         className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//     </div>
//   );
// };

// export default MultipleImageUpload;
