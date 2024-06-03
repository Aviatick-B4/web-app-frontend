import React from "react";

const RiwayatPemesananCard = ({ flight, onClick }) => {
  const getStatusImagePath = (status) => {
    switch (status) {
      case "belum bayar":
        return "/booking-history/unpaid.png";
      case "diterbitkan":
        return "/booking-history/issued.png";
      default:
        return "/booking-history/cancelled.png";
    }
  };

  return (
    <>
      <div
        className="mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4 cursor-pointer"
        onClick={onClick}
      >
        <img
          className="absolute z-10 -ms-1 mt-3 w-[70px] md:w-[90px]"
          src={getStatusImagePath(flight.status)}
          alt={flight.status}
          width={90}
        />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex-col lg:flex-row flex justify-between mt-8 lg:mt-4">
            <div className="flex items-center">
              <img
                src={flight.logo}
                alt={`${flight.airline} logo`}
                className="h-8 w-8 md:h-12 md:w-12 mr-2 md:mr-4 object-contain"
              />
              <div className="text-base md:text-lg font-bold text-main">
                {flight.airline}
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-xs font-semibold text-main">
                  {flight.departureTime}
                </div>
                <div className="text-xs font-medium text-darkgray">
                  {flight.departureCode}
                </div>
              </div>
              <div className="text-center divide-y w-80 divide-neutral">
                <div className="text-xs font-medium text-main">
                  {flight.duration}
                </div>
                <div className="text-xs font-medium text-darkgray">
                  {flight.transit}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-main">
                  {flight.arrivalTime}
                </div>
                <div className="text-xs font-medium text-darkgray">
                  {flight.arrivalCode}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full items-center border-t border-neutral pt-4">
            <div className="flex flex-col text-main">
              <p className="text-sm font-semibold">Booking ID:</p>
              <p className="text-xs font-medium">{flight.bookingId}</p>
            </div>
            <div className="flex flex-col text-main">
              <p className="text-sm font-semibold">Kelas:</p>
              <p className="text-xs font-medium">{flight.class}</p>
            </div>
            <span className="text-base font-bold text-primary">
              {flight.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiwayatPemesananCard;
