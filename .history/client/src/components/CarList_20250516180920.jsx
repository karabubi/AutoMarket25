
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx
// src/components/CarList.jsx

import CarCard from './CarCard';

const CarList = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
