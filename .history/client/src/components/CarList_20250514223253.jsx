
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarList.jsx

// import CarCard from './CarCard';

// const CarList = ({ cars }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {cars.map((car) => (
//       <div
//         key={car.id}
//         className="bg-white rounded-lg shadow-md hover:shadow-lg p-2 transition"
//       >
//         <CarCard car={car} />
//       </div>
//     ))}
//   </div>
// );

// export default CarList;


//-------------------


// ✅ Enhanced CarList.jsx - client/src/components/CarList.jsx
import CarCard from './CarCard';

const CarList = ({ cars }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {cars.map((car) => (
      <div
        key={car.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg p-2 transition"
      >
        <CarCard car={car} />
        {car.image_url && (
          <img
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            className="mt-2 w-full h-40 object-cover rounded"
          />
        )}
        {car.images && car.images.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {car.images.slice(0, 2).map((img, idx) => (
              <img
                key={idx}
                src={img.image_url}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default CarList;
