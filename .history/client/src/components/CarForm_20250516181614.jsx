//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarForm.jsx


// import BaseForm from './BaseForm';
// import axios from 'axios';

// const CarForm = ({ onSuccess }) => {
//   const fields = [
//     { name: 'make', type: 'text', placeholder: 'Make', required: true },
//     { name: 'model', type: 'text', placeholder: 'Model', required: true },
//     { name: 'year', type: 'text', placeholder: 'Year', required: true },
//     { name: 'price', type: 'text', placeholder: 'Price', required: true },
//     { name: 'description', type: 'textarea', placeholder: 'Description', required: true },
//     { name: 'image', type: 'file', placeholder: '', required: true },
//   ];

//   const handleCarSubmit = async (data) => {
//     const token = localStorage.getItem('token');

//     // 1️⃣ Upload image
//     const uploadData = new FormData();
//     uploadData.append('image', data.file);
//     const uploadRes = await axios.post('http://localhost:5001/api/cars/upload', uploadData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // 2️⃣ Post car data
//     const carData = {
//       make: data.make,
//       model: data.model,
//       year: data.year,
//       price: data.price,
//       description: data.description,
//       image_url: uploadRes.data.url,
//     };
//     await axios.post('http://localhost:5001/api/cars', carData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     alert('✅ Car added!');
//     if (onSuccess) onSuccess();
//   };

//   return (
//     <BaseForm
//       fields={fields}
//       onSubmit={handleCarSubmit}
//       buttonText="Submit Car"
//     />
//   );
// };

// export default CarForm;
