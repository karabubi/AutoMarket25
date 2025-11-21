//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx

// import CarList from '../components/CarList';

// const cars = [
//   { id: 1, make: 'Toyota', model: 'Corolla', price: 10000, image_url: '/Users/salehalkarabubi/Desktop/Autos/7b1cfd89-5736-4f07-97f7-032f89cafd6e_1b7ca333-d522-4e4c-b93f-2b1f46740e14.webp' },
//   { id: 2, make: 'Honda', model: 'Civic', price: 12000, image_url: '/Users/salehalkarabubi/Desktop/Autos/597472a0-9bd5-44ee-8826-d33027b050f5_7e61c3c9-f43e-4837-b451-10eb9bcdde08.webp' },
// ];

// const Home = () => <CarList cars={cars} />;

// export default Home;

//--------------------------v2 5-5


import { useEffect, useState } from 'react';
import CarList from '../components/CarList';
import axios from 'axios';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('https://your-backend.com/api/cars');
        setCars(res.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-6 mb-4">Available Cars</h1>
      <CarList cars={cars} />
    </div>
  );
};

export default Home;
