
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx

// import CarCard from './CarCard';

// const CarList = ({ cars }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//     {cars.map(car => (
//       <CarCard key={car.id} car={car} />
//     ))}
//   </div>
// );

// export default CarList;

//---------------------v2 5-5


// import CarCard from './CarCard';

// const CarList = ({ cars }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//     {cars.map(car => (
//       <CarCard key={car.id} car={car} />
//     ))}
//   </div>
// );

// export default CarList;


//---------------------

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx

// import CarCard from './CarCard';

// const CarList = ({ cars }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//     {cars.map(car => (
//       <CarCard key={car.id} car={car} />
//     ))}
//   </div>
// );

// export default CarList;


//----------

// import CarCard from './CarCard';

// const CarList = ({ cars }) => (
//   <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//     {cars.map(car => (
//       <CarCard key={car.id} car={car} />
//     ))}
//   </div>
// );

// export default CarList;


//------------v3


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx

// import CarCard from './CarCard';

// const CarList = ({ cars }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {cars.map((car) => (
//       <CarCard key={car.id} car={car} />
//     ))}
//   </div>
// );

// export default CarList;


//--------------------------
const CarCard = ({ car }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
    <img
      src={car.imageUrl}
      alt={car.model}
      className="w-24 h-24 object-cover rounded"
    />
    <div>
      <h2 className="text-lg font-bold">{car.make} {car.model}</h2>
      <p className="text-sm text-gray-600">Year: {car.year}</p>
      <p className="text-sm text-gray-800">Price: ${car.price}</p>
    </div>
  </div>
);

export default CarCard;
