import React, { useState } from "react";

const HasilPencarianCard = ({ flight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const convertToTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return `${hours}.${minutes}`;
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const durationMs = endDate - startDate;
    const durationMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const formatPrice = (price) => {
    return `IDR ${new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(price)}`;
  };

  return (
    <>
      {/* Desktop Card */}
      <div className="hidden lg:block mx-auto bg-white rounded-xl shadow-md overflow-hidden my-4">
        <div className="flex gap-12 p-8 items-center">
          <div className="flex w-1/4">
            <img
              src={flight.airplaneSeatClass.airplane.airline.logoUrl}
              alt={`${flight.airplaneSeatClass.airplane.airline.name} logo`}
              className="h-12 w-12 mr-4 object-contain"
            />
            <div className="flex-1">
              <div className="text-lg font-bold text-main">
                {flight.airplaneSeatClass.airplane.airline.name}
              </div>
              <div className="text-base font-medium text-darkgray">
                {flight.airplaneSeatClass.type}
              </div>
            </div>
          </div>
          <div className="w-2/4">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm font-semibold text-main">
                  {convertToTime(flight.flight.departureTime)}
                </div>
                <div className="text-sm font-medium text-darkgray">
                  {flight.flight.departureAirport.airportCode}
                </div>
              </div>
              <div className="text-center divide-y w-80 divide-neutral">
                <div className="text-sm font-medium text-main">
                  {calculateDuration(
                    flight.flight.departureTime,
                    flight.flight.arrivalTime
                  )}
                </div>
                <div className="text-sm font-medium text-darkgray">
                  {flight.flight.flightNumber}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-main">
                  {convertToTime(flight.flight.arrivalTime)}
                </div>
                <div className="text-sm font-medium text-darkgray">
                  {flight.flight.arrivalAirport.airportCode}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-end border-l-2 border-dashed border-neutral pl-4">
            <div className="w-full flex flex-col items-end text-right space-y-2">
              <div className="flex items-center">
                <span className="text-xl font-bold text-danger">
                  {formatPrice(flight.price)}
                </span>
                <span className="text-base font-medium text-gray ml-1">
                  /pax
                </span>
              </div>
              <a
                href="/pemesanan"
                className="inline-block bg-primary hover:bg-darkprimary text-white px-12 py-2 rounded-full"
              >
                Pilih
              </a>
              <button
                onClick={toggleExpand}
                className="text-primary font-medium text-xs mt-2 focus:outline-none flex items-center"
              >
                {isExpanded ? (
                  <>
                    Sembunyikan
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Tampilkan detail
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="flex gap-48 border-t border-neutral p-8">
            <div className="text-main">
              <div className="flex items-center mb-4">
                <img
                  src={flight.airplaneSeatClass.airplane.airline.logoUrl}
                  alt={`${flight.airplaneSeatClass.airplane.airline.name} logo`}
                  className="h-5 w-5 mr-4 object-contain"
                />
                <div className="text-base font-semibold text-main">
                  {flight.airplaneSeatClass.airplane.airline.name} -{" "}
                  {flight.airplaneSeatClass.type}
                </div>
              </div>
              <div className="ms-9">
                <div className="font-semibold text-sm">Informasi:</div>
                <ul>
                  <li className="font-normal text-sm">
                    Bagasi: {flight.airplaneSeatClass.airplane.baggageCapacity}{" "}
                    kg
                  </li>
                  <li className="font-normal text-sm">
                    Kabin: {flight.airplaneSeatClass.airplane.cabinCapacity} kg
                  </li>
                  <li className="font-normal text-sm">
                    Fasilitas:{" "}
                    {flight.airplaneSeatClass.airplane.inFlightFacility}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-col">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                  <p className="font-semibold text-sm">
                    <span className="text-main">
                      {convertToTime(flight.flight.departureTime)}
                    </span>{" "}
                    - <span className="text-primary">Keberangkatan</span>
                  </p>
                </div>
                <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                  <p className="font-semibold text-sm">
                    <span className="text-main">
                      {convertToTime(flight.flight.arrivalTime)}
                    </span>{" "}
                    - <span className="text-primary">Kedatangan</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card */}
      <div className="block lg:hidden mx-auto bg-white rounded-lg shadow-md overflow-hidden my-3 p-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex">
              <img
                src={flight.airplaneSeatClass.airplane.airline.logoUrl}
                alt={`${flight.airplaneSeatClass.airplane.airline.name} logo`}
                className="h-8 w-8 mr-2 object-contain"
              />
              <div className="flex flex-col text-sm font-bold text-main">
                {flight.airplaneSeatClass.airplane.airline.name}{" "}
                <span className="text-xs font-medium text-darkgray">
                  {flight.airplaneSeatClass.type}
                </span>
              </div>
            </div>
            <a
              href="/pemesanan"
              className="inline-block bg-primary hovver:bg-darkprimary text-white text-xs px-6 py-2 rounded-full"
            >
              Pilih
            </a>
          </div>

          <div className="flex items-center justify-between p-4">
            <div>
              <div className="text-xs font-semibold text-main">
                {convertToTime(flight.flight.departureTime)}
              </div>
              <div className="text-xs font-medium text-darkgray">
                {flight.flight.departureAirport.airportCode}
              </div>
            </div>
            <div className="text-center divide-y w-80 divide-neutral">
              <div className="text-xs font-medium text-main">
                {calculateDuration(
                  flight.flight.departureTime,
                  flight.flight.arrivalTime
                )}
              </div>
              <div className="text-xs font-medium text-darkgray">
                {flight.flight.flightNumber}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-main">
                {convertToTime(flight.flight.arrivalTime)}
              </div>
              <div className="text-xs font-medium text-darkgray">
                {flight.flight.arrivalAirport.airportCode}
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full items-center border-t border-dashed border-neutral pt-4 mt-2">
            <div className="flex items-center">
              <span className="text-lg font-bold text-danger">
                {formatPrice(flight.price)}
              </span>
              <span className="text-xs font-medium text-gray ml-1">/pax</span>
            </div>

            <button
              onClick={toggleExpand}
              className="text-primary font-medium text-xs focus:outline-none flex items-center"
            >
              {isExpanded ? (
                <>
                  Sembunyikan
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Tampilkan detail
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="flex flex-col py-4 border-t border-neutral mt-4">
            <div className="text-main mt-6">
              <div className="flex items-center mb-2">
                <img
                  src={flight.airplaneSeatClass.airplane.airline.logoUrl}
                  alt={`${flight.airplaneSeatClass.airplane.airline.name} logo`}
                  className="h-5 w-5 mr-4 object-contain"
                />
                <div className="text-xs font-semibold text-main">
                  {flight.airplaneSeatClass.airplane.airline.name} -{" "}
                  {flight.airplaneSeatClass.type}
                </div>
              </div>
              <div className="ms-9">
                <div className="font-semibold text-xs">Informasi:</div>
                <ul>
                  <li className="font-normal text-xs">
                    Bagasi {flight.airplaneSeatClass.airplane.baggageCapacity}{" "}
                    kg
                  </li>
                  <li className="font-normal text-xs">
                    Kabin: {flight.airplaneSeatClass.airplane.cabinCapacity} kg
                  </li>
                  <li className="font-normal text-xs">
                    Fasilitas:{" "}
                    {flight.airplaneSeatClass.airplane.inFlightFacility}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-col">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                  <p className="font-semibold text-xs">
                    <span className="text-main">
                      {convertToTime(flight.flight.departureTime)}
                    </span>{" "}
                    - <span className="text-primary">Keberangkatan</span>
                  </p>
                </div>
                <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                  <p className="font-semibold text-xs">
                    <span className="text-main">
                      {convertToTime(flight.flight.arrivalTime)}
                    </span>{" "}
                    - <span className="text-primary">Kedatangan</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HasilPencarianCard;
