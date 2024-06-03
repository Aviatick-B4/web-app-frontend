import React, { useEffect, useState } from "react";
import Footer from "../components/navigations/Footer";
import Navbar from "../components/navigations/Navbar";
import FlightCard from "../components/cards/HasilPencarianCard";
import FilterButton from "../components/buttons/FilterButton";

export default function HasilPencarian() {
  const [selectedDay, setSelectedDay] = useState("2024-05-23");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const days = [
    { day: "Rabu", date: "22 Mei 2024", value: "2024-05-22" },
    { day: "Kamis", date: "23 Mei 2024", value: "2024-05-23" },
    { day: "Jumat", date: "24 Mei 2024", value: "2024-05-24" },
    { day: "Sabtu", date: "25 Mei 2024", value: "2024-05-25" },
    { day: "Minggu", date: "26 Mei 2024", value: "2024-05-26" },
    { day: "Senin", date: "27 Mei 2024", value: "2024-05-27" },
    { day: "Selasa", date: "28 Mei 2024", value: "2024-05-28" },
    { day: "Rabu", date: "29 Mei 2024", value: "2024-05-29" },
  ];

  const flightData = [
    {
      logo: "/airasia-logo.png",
      airline: "AirAsia",
      class: "Ekonomi",
      price: "IDR 4.950.000",
      departureTime: "07:00",
      departureDate: "23 Mei 2024",
      departureCode: "CGK",
      departureLocation: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalTime: "11:00",
      arrivalDate: "23 Mei 2024",
      arrivalCode: "SYD",
      arrivalLocation: "Sydney Airport",
      duration: "19j 45m",
      transit: "2 transit",
      transitTime: ["10:00", "10:30"],
      transitLocation: ["Kuala Lumpur", "Turki"],
      information: [
        "Baggage 20 kg",
        "Cabin baggage 7 kg",
        "In Flight Entertainment",
      ],
    },
    {
      logo: "/garuda-logo.png",
      airline: "Garuda Indonesia",
      class: "Ekonomi",
      price: "IDR 5.550.000",
      departureTime: "07:00",
      departureDate: "23 Mei 2024",
      departureCode: "CGK",
      departureLocation: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalTime: "11:00",
      arrivalDate: "23 Mei 2024",
      arrivalCode: "SYD",
      arrivalLocation: "Sydney Airport",
      duration: "19j 45m",
      transit: "1 transit",
      transitTime: "10:00",
      transitLocation: "Kuala Lumpur",
      information: [
        "Baggage 20 kg",
        "Cabin baggage 7 kg",
        "In Flight Entertainment",
      ],
    },
  ];

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="bg-background">
      <Navbar transparent={false} />

      {/* Hasil Pencarian Section */}
      <section className="pt-28 pb-8">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex gap-1.5 text-main text-xs font-medium -mt-4 md:-mt-0 mb-10 md:mb-5">
            <span>Beranda</span>
            <img src="/icons/right-chev.svg" alt="chevron" />
            <span>Hasil Pencarian</span>
          </div>

          {/* Search Flight Desktop */}
          <div className="hidden md:block relative mt-6">
            {/* Banner */}
            <img
              src="/search-flight-banner.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 md:top-[5%] lg:top-[30%] transform -translate-y-1/2 mx-auto w-full bg-white items-center rounded-full text-base shadow-md ps-8 pe-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <svg
                className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>

              {/* Search Input Description */}
              <div className="flex justify-between items-center">
                <div className="flex gap-8 items-center text-sm font-medium text-main">
                  {/* Destination */}
                  <div className="ps-8 flex gap-2 items-center">
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal("departure")}
                    >
                      Jakarta (JKTA)
                    </span>
                    <button className="mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                      <img
                        src="/icons/exchange.svg"
                        alt="exchange"
                        className="w-6 h-6"
                      />
                    </button>
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal("arrival")}
                    >
                      Sydney (SYD)
                    </span>
                  </div>

                  {/* Vertical Line */}
                  <div className="h-[27px] w-[1px] bg-gray"></div>

                  {/* Date */}
                  <span
                    className="cursor-pointer"
                    onClick={() => openModal("date")}
                  >
                    Sabtu, 25 Mei 2024
                  </span>

                  {/* Vertical Line */}
                  <div className="h-[27px] w-[1px] bg-gray"></div>

                  {/* Passengers */}
                  <span
                    className="cursor-pointer"
                    onClick={() => openModal("passengers")}
                  >
                    1 Penumpang, Ekonomi
                  </span>
                </div>
                {/* Button Change Search */}
                <button className="bg-primary hover:bg-darkprimary rounded-full text-white text-sm lg:text-base font-medium px-8 lg:px-12 py-2.5">
                  Ubah
                </button>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold mb-4 text-main">
                    Edit {modalContent}
                  </h2>
                  {/* Modal Content based on modalContent */}
                  {modalContent === "departure" && (
                    <div className="text-main text-sm font-medium">
                      Edit Departure
                    </div>
                  )}
                  {modalContent === "arrival" && (
                    <div className="text-main text-sm font-medium">
                      Edit Arrival
                    </div>
                  )}
                  {modalContent === "date" && (
                    <div className="text-main text-sm font-medium">
                      Edit Date
                    </div>
                  )}
                  {modalContent === "passengers" && (
                    <div className="text-main text-sm font-medium">
                      Edit Passengers
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Flight Mobile */}
          <div className="block md:hidden relative mt-4">
            {/* Banner */}
            <img
              src="/search-flight-banner-mobile.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 top-[5%] transform -translate-y-1/2 mx-auto w-full md:w-[1080px] bg-white items-center rounded-full text-base shadow-md ps-8 pe-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <svg
                className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>

              <div className="flex justify-between items-center">
                {/* Search Input Description */}
                <div className="flex items-center text-sm font-medium text-main">
                  {/* Destination */}
                  <div className="ps-8 flex gap-2 items-center">
                    <span className="cursor-pointer">Jakarta</span>
                    <button className="mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                      <img
                        src="/icons/exchange.svg"
                        alt="exchange"
                        className="w-6 h-6"
                      />
                    </button>
                    <span className="cursor-pointer">Sydney</span>
                  </div>
                </div>
                {/* Button Change Search */}
                <button
                  onClick={() => openModal("change-mobile-search")}
                  className="bg-primary hover:bg-darkprimary rounded-full text-white text-sm font-medium px-4 py-2"
                >
                  Ubah
                </button>
              </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
                <div
                  className={`w-full bg-white rounded-t-lg p-8 shadow-lg transform transition-transform ${
                    isClosing ? "animate-slide-down" : "animate-slide-up"
                  } relative`}
                >
                  <button
                    className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {modalContent === "change-mobile-search" && (
                    <>
                      <h2 className="text-lg font-semibold mb-4 text-main text-center">
                        Ubah Pencarian
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Departure
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            placeholder="Departure"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Arrival
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            placeholder="Arrival"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Date
                          </label>
                          <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Passengers
                          </label>
                          <input
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            placeholder="Number of passengers"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Class
                          </label>
                          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                            <option>Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Date List Desktop */}
          <div className="hidden md:flex justify-center items-center bg-gray-100 mt-5">
            <div className="flex w-full items-center border border-neutral rounded-xl overflow-hidden text-center">
              {days.map((day, index) => (
                <div
                  key={day.value}
                  className={`py-3 md:px-4 lg:px-7 cursor-pointer flex-grow ${
                    selectedDay === day.value ? "bg-primary/20" : "bg-white"
                  } hover:bg-primary/20 active:bg-primary/20 transition-colors duration-200 ${
                    index !== 0 ? "border-l border-neutral" : ""
                  }`}
                  onClick={() => setSelectedDay(day.value)}
                >
                  <h5 className="text-base font-semibold text-main">
                    {day.day}
                  </h5>
                  <div className="text-sm font-normal text-darkgray">
                    {day.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date List Mobile */}
          <div className="block md:hidden overflow-x-auto whitespace-nowrap border-b-2 border-primary">
            {days.map((item, index) => (
              <div
                key={index}
                className={`inline-block text-center px-4 py-2 cursor-pointer ${
                  selectedDay === item.date ? "bg-primary/20" : ""
                }`}
                onClick={() => setSelectedDay(item.date)}
              >
                <div className="font-semibold text-xs text-main">
                  {item.day}
                </div>
                <div className="font-normal text-xs text-main">{item.date}</div>
              </div>
            ))}
          </div>

          {/* Filter Desktop */}
          <div className="hidden md:flex space-x-3 items-center mt-5">
            <button className="bg-primary rounded-full text-sm font-medium py-2 px-6 text-white">
              Semua
            </button>

            {/* Vertical Line */}
            <div className="h-[20px] w-[1px] bg-gray"></div>
            
            <FilterButton
              label="Urutkan"
              options={[
                "Harga Terendah",
                "Harga Tertinggi",
                "Durasi Terpendek",
              ]}
              iconSrc="/icons/filter.svg"
            />
            <FilterButton
              label="Transit"
              options={["Langsung", "1 Transit", "2 Transit"]}
              iconSrc="/icons/transit.svg"
            />
            <FilterButton
              label="Fasilitas"
              options={["Wi-Fi", "Makanan", "Hiburan"]}
              iconSrc="/icons/facility.svg"
            />
            <FilterButton
              label="Harga"
              options={[
                "IDR 0 - 2.000.000",
                "IDR 2.000.000 - 4.000.000",
                "IDR 4.000.000 - 6.000.000",
              ]}
              iconSrc="/icons/price.svg"
            />
          </div>

          {/* Filter Mobile */}
          <>
            <div className="flex md:hidden items-center mt-3">
              <button className="bg-primary rounded-full text-xs font-medium py-2 px-6 text-white">
                Semua
              </button>
            </div>
            <div
              className="md:hidden fixed inset-x-0 bottom-0 bg-white flex justify-around p-4 shadow-inner"
              style={{
                boxShadow:
                  "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FilterButton
                label="Urutkan"
                options={[
                  "Harga Terendah",
                  "Harga Tertinggi",
                  "Durasi Terpendek",
                ]}
                iconSrc="/icons/filter.svg"
              />
              <FilterButton
                label="Transit"
                options={["Langsung", "1 Transit", "2 Transit"]}
                iconSrc="/icons/transit.svg"
              />
              <FilterButton
                label="Fasilitas"
                options={["Wi-Fi", "Makanan", "Hiburan"]}
                iconSrc="/icons/facility.svg"
              />
              <FilterButton
                label="Harga"
                options={[
                  "IDR 0 - 2.000.000",
                  "IDR 2.000.000 - 4.000.000",
                  "IDR 4.000.000 - 6.000.000",
                ]}
                iconSrc="/icons/price.svg"
              />
            </div>
          </>

          {/* Card */}
          <div className="mt-3 md:mt-5">
            {flightData.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
