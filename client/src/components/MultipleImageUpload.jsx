///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/MultipleImageUpload.jsx


// import { useState } from 'react';
// import { uploadCarImages } from '../utils/api';

// const MultipleImageUpload = ({ carId, onUploadComplete }) => {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleUpload = async () => {
//     if (!files.length) return;
//     const token = localStorage.getItem('token');
//     try {
//       setUploading(true);
//       const res = await uploadCarImages(carId, files, token);
//       onUploadComplete(res.data.map((img) => img.image_url));
//       setFiles([]);
//     } catch (err) {
//       console.error('Upload error:', err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded mb-4">
//       <input type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         {uploading ? 'Uploading...' : 'Upload Images'}
//       </button>
//     </div>
//   );
// };

// export default MultipleImageUpload;


// client/src/components/MultipleImageUpload.jsx
import { useEffect, useMemo, useState } from "react";
import { uploadCarImages } from "../utils/api";

const MAX_MB = 8;

export default function MultipleImageUpload({
  carId, // optional (if provided => can upload)
  onUploadComplete, // optional (for upload mode)
  onFilesChange, // optional (picker mode)
  disabled = false,
  label = "Upload Images",
}) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  const handlePick = (e) => {
    const selected = Array.from(e.target.files || []);
    const valid = selected.filter((f) => f.size <= MAX_MB * 1024 * 1024);

    if (valid.length !== selected.length) {
      setError(`❌ Some files are too large (max ${MAX_MB}MB)`);
    } else {
      setError("");
    }

    setFiles(valid);

    // ✅ picker mode support
    if (onFilesChange) onFilesChange(valid);
  };

  const handleUpload = async () => {
    if (!carId) {
      setError("❌ carId missing (upload mode needs carId)");
      return;
    }
    if (!files.length) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("❌ Please log in.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const res = await uploadCarImages(carId, files, token);

      // server returns: { message, carId, images: [...] }
      const images = res.data?.images || res.data || [];
      const urls = images.map((img) => img.image_url).filter(Boolean);

      if (onUploadComplete) onUploadComplete(urls);

      setFiles([]);
      if (onFilesChange) onFilesChange([]);
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || err.message || "Upload failed"}`);
    } finally {
      setUploading(false);
    }
  };

  const canUpload = Boolean(carId && onUploadComplete);

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <label className="block font-medium mb-2">{label}</label>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePick}
        disabled={disabled || uploading}
        className="w-full text-sm"
      />

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {previews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              className="w-24 h-16 object-cover rounded border"
            />
          ))}
        </div>
      )}

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* ✅ only show upload button if used in upload-mode */}
      {canUpload && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={disabled || uploading || !files.length}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      )}
    </div>
  );
}
