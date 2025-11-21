

// src/pages/Cars.jsx
import CarList from '../components/CarList';

const cars = [
  {
    id: 1,
    make: 'BMW',
    model: 'X5',
    price: 45900,
    description: 'Top Zustand, nur 32.000km',
    tag: 'NEW',
    location: 'Bonn, Germany',
    image_url: 'https://via.placeholder.com/600x400',
    dealer: {
      name: 'Autohaus Bonn',
      phone: '004917655105979',
      logoUrl: 'https://via.placeholder.com/100x100?text=Logo',
    },
  },
  {
    id: 2,
    make: 'Audi',
    model: 'A3',
    price: 17900,
    description: 'Gepflegter Wagen mit Navi & Klima',
    tag: 'SOLD',
    location: 'Cologne, Germany',
    image_url: 'https://via.placeholder.com/600x400',
    dealer: {
      name: 'Audi Partner',
      phone: '004917655105979',
      logoUrl: 'https://via.placeholder.com/100x100?text=Logo',
    },
  },
];

const Cars = () => {
  return (
    <div className="max-w-7xl mx-auto pt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Alle Fahrzeuge</h1>
      <CarList cars={cars} />
    </div>
  );
};

export default Cars;
