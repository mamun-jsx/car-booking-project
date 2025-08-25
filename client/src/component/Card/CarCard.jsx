import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="card bg-base-100 shadow-sm h-full"
    >
      {/* Car Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={car?.image}
          alt="car"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body flex flex-col justify-between">
        {/* Title + Availability */}
        <div>
          <h2 className="card-title flex justify-between items-center">
            <span>
              {car?.brand} {car?.model}
            </span>
            {car?.isAvailable && (
              <div className="badge bg-green-700 text-white">Available</div>
            )}
          </h2>
          <p className="text-sm text-gray-500">
            {car?.category} | {car?.year}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-gray-600 mt-4">
          <div className="flex items-center text-sm">
            <img src={assets?.users_icon} alt="" className="h-4 mr-2" />
            <span>{car?.seating_capacity}</span>
          </div>

          <div className="flex items-center text-sm">
            <img src={assets?.fuel_icon} alt="" className="h-4 mr-2" />
            <span>{car?.fuel_type}</span>
          </div>

          <div className="flex items-center text-sm">
            <img src={assets?.car_icon} alt="" className="h-4 mr-2" />
            <span>{car?.transmission}</span>
          </div>

          <div className="flex items-center text-sm">
            <img src={assets?.location_icon} alt="" className="h-4 mr-2" />
            <span>{car?.location}</span>
          </div>
        </div>

        {/* Footer (Price + Book Button) */}
        <div className="card-actions justify-between items-center mt-4">
          <div className="badge badge-outline text-base font-medium px-3 py-2">
            ${car?.pricePerDay}/day
          </div>
          <button
            onClick={() => {
              navigate(`/car-details/${car?._id}`);
              scrollTo(0, 0);
            }}
            className="btn btn-primary btn-sm rounded-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
