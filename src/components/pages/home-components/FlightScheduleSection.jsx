import React, { useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import UnifiedModal from "../../modals/Modal";

const FlightSchedule = () => {
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState("Jakarta (JKT)");
  const [to, setTo] = useState("Sydney (SYD)");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [flightClass, setFlightClass] = useState("Economy");

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const openModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (modalType === "date") {
      if (modalData === "departure") {
        setDepartureDate(new Date(data));
      } else {
        setReturnDate(new Date(data));
      }
    } else if (modalType === "class") {
      setFlightClass(data);
    } else if (modalType === "passenger") {
      setPassengers(data);
    } else if (modalType === "city") {
      if (modalData === "from") {
        setFrom(data);
      } else {
        setTo(data);
      }
    }
  };

  return (
    <div className="relative z-20 py-4 px-6 bg-white shadow-lg rounded-tr-xl rounded-br-xl rounded-bl-xl w-full mx-auto -mt-24">
      {/* Oneway/Rountrip button */}
      <div className="absolute top-0 left-0 w-full flex justify-start -translate-y-10">
        <div className="bg-white rounded-t-xl flex">
          <button
            className={`px-4 py-2 rounded-tl-xl ${
              tripType === "one-way" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setTripType("one-way")}
          >
            Sekali Jalan
          </button>
          <button
            className={`px-4 py-2 rounded-tr-xl ${
              tripType === "round-trip"
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setTripType("round-trip")}
          >
            Pulang-Pergi
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-2 items-center mt-8">
        <div className="flex flex-col border border-neutral p-3 rounded-xl">
          <label className="mb-2 flex items-center text-primary">
            <FaPlaneDeparture className="mr-2 text-secondary" />
            Dari
          </label>
          <input
            type="text"
            className="p-2 rounded outline-none"
            value={from}
            onClick={() => openModal("city", "from")}
            readOnly
          />
        </div>
        {/* Swap button */}
        <button
          onClick={swapLocations}
          className="absolute left-[17.5%] transform -translate-x-1/2 bg-gray-200 p-2 rounded-full shadow"
        >
          <FaExchangeAlt className="text-primary" />
        </button>
        <div className="flex flex-col border border-neutral p-3 rounded-xl">
          <label className="mb-2 flex items-center text-primary">
            <FaPlaneArrival className="mr-2 text-secondary" />
            Ke
          </label>
          <input
            type="text"
            className="p-2 rounded outline-none"
            value={to}
            onClick={() => openModal("city", "to")}
            readOnly
          />
        </div>
        <div className="flex flex-col border border-neutral p-3 rounded-xl">
          <label className="mb-2 flex items-center text-primary">
            <FaCalendarAlt className="mr-2 text-secondary" />
            Keberangkatan
          </label>
          <input
            type="text"
            className="p-2 rounded outline-none"
            value={
              departureDate instanceof Date
                ? departureDate.toLocaleDateString()
                : departureDate
            }
            onClick={() => openModal("date", "departure")}
            readOnly
          />
        </div>
        {tripType === "round-trip" && (
          <div className="flex flex-col border border-neutral p-3 rounded-xl">
            <label className="mb-2 flex items-center text-primary">
              <FaCalendarAlt className="mr-2 text-secondary" />
              Kepulangan
            </label>
            <input
              type="text"
              className="p-2 rounded outline-none"
              value={
                returnDate instanceof Date
                  ? returnDate.toLocaleDateString()
                  : returnDate
              }
              onClick={() => openModal("date", "return")}
              readOnly
            />
          </div>
        )}
        <div className="flex flex-col border border-neutral p-3 rounded-xl">
          <label className="mb-2 flex items-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              className="text-secondary mr-2"
            >
              <path
                fill="currentColor"
                d="M9 19h6v2H9c-2.76 0-5-2.24-5-5V7h2v9c0 1.66 1.34 3 3 3m1.42-13.59c.78-.78.78-2.05 0-2.83s-2.05-.78-2.83 0s-.78 2.05 0 2.83c.78.79 2.04.79 2.83 0M11.5 9c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v6c0 1.66 1.34 3 3 3h5.07l3.5 3.5L20 20.07L14.93 15H11.5z"
              ></path>
            </svg>
            Penumpang
          </label>
          <input
            type="text"
            className="p-2 rounded outline-none"
            value={`${passengers.adults} Dewasa, ${passengers.children} Anak, ${passengers.infants} Bayi`}
            onClick={() => openModal("passenger")}
            readOnly
          />
        </div>
        <div className="flex flex-col border border-neutral p-3 rounded-xl">
          <label className="mb-2 flex items-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 256 256"
              className="text-secondary mr-2"
            >
              <path
                fill="currentColor"
                d="M224 232a8 8 0 0 1-8 8H112a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8m-16-88h-64.22L112 80l14.19-26.32a1.5 1.5 0 0 0 .11-.22A16 16 0 0 0 119.15 32l-.47-.22L85 17.57a16 16 0 0 0-21.2 7.27l-22.12 44a16.1 16.1 0 0 0 0 14.32l58.11 116a15.93 15.93 0 0 0 14.32 8.84H208a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16"
              ></path>
            </svg>
            Kelas
          </label>
          <input
            type="text"
            className="p-2 rounded outline-none"
            value={flightClass}
            onClick={() => openModal("class")}
            readOnly
          />
        </div>
      </div>
      <div className="flex justify-center md:justify-end mt-4">
        <a
          href="/hasil-pencarian"
          className="px-4 py-2 bg-primary text-white rounded-full border-2 border-primary hover:bg-white hover:text-primary"
        >
          Cari Penerbangan
          <BsArrowRight className="inline-block ml-2" />
        </a>
      </div>
      <UnifiedModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        type={modalType}
        onSave={handleSave}
        initialData={modalData}
      />
    </div>
  );
};

export default FlightSchedule;
