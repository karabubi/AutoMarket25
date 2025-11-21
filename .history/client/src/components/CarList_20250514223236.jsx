
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx

import CarCard from './CarCard';

const CarList = ({ cars }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {cars.map((car) => (
      <div
        key={car.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg p-2 transition"
      >
        <CarCard car={car} />
      </div>
    ))}
  </div>
);

export default CarList;
