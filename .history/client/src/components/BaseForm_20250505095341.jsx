
/
import { useState } from 'react';

const BaseForm = ({ fields, onSubmit, buttonText }) => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubmit({ ...formState, file });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-2">
      {fields.map((field) =>
        field.type === 'file' ? (
          <input
            key={field.name}
            type="file"
            name={field.name}
            onChange={handleFileChange}
            className="border p-2 w-full"
            required={field.required}
          />
        ) : field.type === 'textarea' ? (
          <textarea
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border p-2 w-full"
            required={field.required}
          />
        ) : (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border p-2 w-full"
            required={field.required}
          />
        )
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : buttonText}
      </button>
    </form>
  );
};

export default BaseForm;
