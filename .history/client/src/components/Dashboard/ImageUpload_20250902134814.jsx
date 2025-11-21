
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Dashboard/ImageUpload.jsx
import { useState } from 'react';

const ImageUpload = ({ carId, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const validFiles = selected.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
    if (validFiles.length !== selected.length) {
      setError('❌ Some files were too large (max 5MB)');
    } else {
      setError('');
    }

    setFiles(validFiles);
    setPreviews(validFiles.map(file => URL.createObjectURL(file)));
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError('❌ No files selected.');
      return;
    }

    if (!carId) {
      setError('❌ Missing carId.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/cars/upload-multiple/${carId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      onUploadComplete(data.urls); // assuming server returns array of image URLs
      setSuccess('✅ Images uploaded successfully!');
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded shadow-sm mb-4">
      <label className="block font-medium mb-2">Upload Car Images:</label>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2 w-full text-sm"
      />

      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {previews.map((src, idx) => (
            <img key={idx} src={src} alt={`preview-${idx}`} className="w-24 h-16 object-cover rounded border" />
          ))}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`px-4 py-2 rounded text-white ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>

      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
