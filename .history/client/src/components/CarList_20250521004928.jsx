
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx



// import CarCard from './CarCard';

// const CarList = ({ cars }) => {
//   if (!cars || cars.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-600">
//         🚗 Keine Fahrzeuge gefunden.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
//       {cars.map((car) => (
//         <CarCard key={car.id} car={car} />
//       ))}
//     </div>
//   );
// };

// export default CarList;



// /client/src/components/CarList.jsx

import CarCard from './CarCard';

const CarList = ({ cars }) => {
  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        🚗 Keine Fahrzeuge gefunden.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
