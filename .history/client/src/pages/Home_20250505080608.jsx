//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx
import CarList from '../components/CarList';

const cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', price: 10000, image_url: '/car1.jpg' },
  { id: 2, make: 'Honda', model: 'Civic', price: 12000, image_url: '/Users/salehalkarabubi/Desktop/Autos/597472a0-9bd5-44ee-8826-d33027b050f5_7e61c3c9-f43e-4837-b451-10eb9bcdde08.webp' },
];

const Home = () => <CarList cars={cars} />;

export default Home;
