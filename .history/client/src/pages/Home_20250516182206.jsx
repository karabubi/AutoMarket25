//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx

// import { useEffect, useState } from 'react';
// import CarList from '../components/CarList';
// import axios from 'axios';

// const Home = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/api/cars');
//         setCars(res.data);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       }
//     };
//     fetchCars();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
//         🚗 <span className="underline decoration-blue-500">Available Cars</span>
//       </h1>
//       <CarList cars={cars} />
//     </div>
//   );
// };

// export default Home;
