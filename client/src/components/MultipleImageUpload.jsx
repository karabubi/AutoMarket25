
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/MultipleImageUpload.jsx

import { useState } from 'react';
import { uploadCarImages } from '../utils/api';

const MultipleImageUpload = ({ carId, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!files.length) return;
    const token = localStorage.getItem('token');
    try {
      setUploading(true);
      const res = await uploadCarImages(carId, files, token);
      onUploadComplete(res.data.map((img) => img.image_url));
      setFiles([]);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
};

export default MultipleImageUpload;
