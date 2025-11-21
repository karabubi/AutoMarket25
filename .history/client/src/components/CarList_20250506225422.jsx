
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
import CarCard from './CarCard';

const CarList = ({ cars }) => (
  <div className="flex flex-wrap justify-center gap-6">
    {cars.map((car) => (
      <div
        key={car.id}
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <CarCard car={car} />
      </div>
    ))}
  </div>
);

export default CarList;
