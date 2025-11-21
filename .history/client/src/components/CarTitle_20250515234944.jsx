
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/CarTitle.jsx
const CarTitle = ({ title, subtitle, location }) => {
  return (
    <div className="mt-6 mb-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
      {location && (
        <p className="text-sm text-gray-500 mt-1">
          📍 <span className="italic">{location}</span>
        </p>
      )}
    </div>
  );
};

export default CarTitle;
