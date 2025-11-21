//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/MultipleImageUpload.jsx

import { useState } from 'react';
import { uploadCarImages } from '../utils/api';

const MultipleImageUpload = ({ onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setFiles([...e.target.files]);

  const handleUpload = async () => {
    const token = localStorage.getItem('token');
    const car_id = 0; // Platzhalter

    const formData = new FormData();
    formData.append('car_id', car_id);
    files.forEach((file) => formData.append('images', file));

    try {
      setUploading(true);
      const res = await uploadCarImages(car_id, files, token);
      const urls = res.data.map((img) => img.image_url);
      onUploadComplete(urls);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded">
      <input type="file" multiple onChange={handleChange} />
      <button
        type="button"
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        disabled={uploading}
        onClick={handleUpload}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default MultipleImageUpload;
