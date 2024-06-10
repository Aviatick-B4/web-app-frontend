import React, { useEffect, useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import UnifiedModal from "../../modals/Modal";
import { getFlightSearchResults } from "../../../redux/actions/searchFlightActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { toast } from "react-toastify";

export default function FlightSchedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 7));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [flightClass, setFlightClass] = useState("Economy");
  const searchResults = useSelector(
    (state) => state?.search.flightSearchResults
  );

  useEffect(() => {
    console.log("search", searchResults);
  }, []);

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

   const openModal = (type, data) => {
     setModalType(type);
     if (type === "date") {
       setModalData(
         data === "departure"
           ? { startDate: departureDate, endDate: returnDate }
           : { startDate: departureDate, endDate: returnDate }
       );
     } else {
       setModalData(data);
     }
     setIsModalOpen(true);
   };

   const handleSave = (data, endDate) => {
     if (modalType === "city") {
       if (modalData === "from" && data === to) {
         toast.error("Kota keberangkatan tidak boleh sama dengan kota tujuan.");
         return;
       }
       if (modalData === "to" && data === from) {
         toast.error("Kota tujuan tidak boleh sama dengan kota keberangkatan.");
         return;
       }

       if (modalData === "from") {
         setFrom(data);
       } else {
         setTo(data);
       }
     } else if (modalType === "date") {
       setDepartureDate(data);
       if (returnDate) {
         setReturnDate(endDate);
       }
     } else if (modalType === "class") {
       setFlightClass(data);
     } else if (modalType === "passenger") {
       setPassengers(data);
     }
     setIsModalOpen(false);
   };

   const handleSaveToState = () => {
     const formattedDepartureDate = format(departureDate, "yyyy-MM-dd");
     const formattedReturnDate = returnDate
       ? format(returnDate, "yyyy-MM-dd")
       : null;

     const flightData = {
       from,
       to,
       departureDate: formattedDepartureDate,
       returnDate: returnDate ? formattedReturnDate : null,
       passengers,
       flightClass,
     };

     dispatch(getFlightSearchResults(flightData, navigate));
   };

  return (
    <div className="relative z-20 py-4 md:py-4 px-6 bg-white shadow-lg rounded-tr-xl rounded-br-xl rounded-bl-xl w-full mx-auto -mt-14 md:-mt-24">
      <div className="absolute top-0 left-0 w-full flex justify-start -translate-y-10">
        <div className="bg-white rounded-t-xl flex">
          <button
            className={`px-3 py-2.5 md:px-4 md:py-2 rounded-tl-xl text-sm md:text-base font-medium ${
              tripType === "one-way" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setTripType("one-way")}
          >
            Sekali Jalan
          </button>
          <button
            className={`px-3 py-2.5 md:px-4 md:py-2 rounded-tr-xl text-sm md:text-base font-medium ${
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-2 items-center mt-4 md:mt-8">
        <div className="flex flex-col border border-neutral p-3 rounded-t-xl md:rounded-xl cursor-pointer">
          <label className="mb-0 md:mb-2 flex items-center text-primary">
            <FaPlaneDeparture className="mr-2 text-secondary" />
            Dari
          </label>
          <button
            className="p-2 text-left rounded outline-none"
            onClick={() => openModal("city", "from")}
          >
            {from ? from : <p className="text-gray">Dari mana?</p>}
          </button>
        </div>
        <button
          onClick={swapLocations}
          className={`absolute md:top-[35%] left-[80%] md:left-[17.5%] transform md:-translate-x-1/2 bg-gray-200 p-2 rounded-full bg-white shadow ${
            tripType === "one-way" ? "top-[22%]" : "top-[18%]"
          }`}
        >
          <FaExchangeAlt className="text-primary rotate-90 md:rotate-0" />
        </button>
        <div className="flex flex-col border-x border-b md:border border-neutral p-3 rounded-b-xl md:rounded-xl -mt-3 md:-mt-0 cursor-pointer">
          <label className="mb-0 md:mb-2 flex items-center text-primary">
            <FaPlaneArrival className="mr-2 text-secondary" />
            Ke
          </label>
          <button
            className="p-2 text-left rounded outline-none"
            onClick={() => openModal("city", "to")}
          >
            {to ? to : <p className="text-gray">Mau ke mana?</p>}
          </button>
        </div>
        <div className="flex flex-col border border-neutral p-3 rounded-xl cursor-pointer w-full">
          <label className="mb-0 md:mb-2 flex items-center text-primary">
            <FaCalendarAlt className="mr-2 text-secondary" />
            Keberangkatan
          </label>
          <button
            className="p-2 text-left rounded outline-none"
            onClick={() => openModal("date", "departure")}
          >
            {departureDate instanceof Date
              ? departureDate.toLocaleDateString()
              : departureDate}
          </button>
        </div>
        {tripType === "round-trip" && (
          <div className="flex flex-col border border-neutral p-3 rounded-xl">
            <label className="mb-0 md:mb-2 flex items-center text-primary">
              <FaCalendarAlt className="mr-2 text-secondary" />
              Kepulangan
            </label>
            <button
              className="p-2 text-left rounded outline-none"
              onClick={() => openModal("date", "return")}
            >
              {returnDate ? (
                returnDate instanceof Date ? (
                  returnDate.toLocaleDateString()
                ) : (
                  returnDate
                )
              ) : (
                <p className="text-gray">Tanggal kepulangan</p>
              )}
            </button>
          </div>
        )}

        <div className="hidden md:flex flex-col border border-neutral p-3 rounded-xl cursor-pointer">
          <label className="mb-0 md:mb-2 flex items-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              className="text-secondary mr-2"
            >
              <path
                fill="currentColor"
                d="M9 19h6v2H9c-2.76 0-5-2.245-5-5V7h2v9c0 1.66 1.34 3 3 3m1.42-13.59c.78-.78.78-2.05 0-2.83s-2.05-.78-2.83 0s-.78 2.05 0 2.83c.78.79 2.04.79 2.83 0M11.5 9c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v6c0 1.66 1.34 3 3 3h5.07l3.5 3.5L20 20.07L14.93 15H11.5z"
              ></path>
            </svg>
            Penumpang
          </label>
          <button
            className="py-2 text-left rounded outline-none truncate"
            onClick={() => openModal("passenger")}
          >
            {`${passengers.adults} Dewasa, ${passengers.children} Anak, ${passengers.infants} Bayi`}
          </button>
        </div>
        <div className="hidden md:flex flex-col border border-neutral p-3 rounded-xl cursor-pointer">
          <label className="mb-0 md:mb-2 flex items-center text-primary">
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
          <button
            className="p-2 text-left rounded outline-none"
            onClick={() => openModal("class")}
          >
            {flightClass}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 md:hidden">
          <div className="flex flex-col border border-neutral p-3 rounded-xl cursor-pointer">
            <label className="mb-0 md:mb-2 flex items-center text-primary">
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
            <button
              className="py-2 text-left rounded outline-none"
              onClick={() => openModal("passenger")}
            >
              {`${passengers.adults} Dewasa, ${passengers.children} Anak, ${passengers.infants} Bayi`}
            </button>
          </div>
          <div className="flex flex-col border border-neutral p-3 rounded-xl cursor-pointer">
            <label className="mb-0 md:mb-2 flex items-center text-primary">
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
            <button
              className="p-2 text-left rounded outline-none"
              onClick={() => openModal("class")}
            >
              {flightClass}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end mt-4">
        <button
          onClick={handleSaveToState}
          className="px-4 py-2 w-full md:w-auto text-center bg-primary text-white rounded-full border-2 border-primary hover:bg-white hover:text-primary"
        >
          Cari Penerbangan
          <BsArrowRight className="inline-block ml-2" />
        </button>
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
}
