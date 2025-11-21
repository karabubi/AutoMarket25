//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Home.jsx

import CarList from '../components/CarList';

const cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', price: 10000, image_url: '/car1.jpg' },
  { id: 2, make: 'Honda', model: 'Civic', price: 12000, image_url: '/car2.jpg' },
];

const Home = () => <CarList cars={cars} />;

export default Home;
