import React, { useEffect, useState } from "react";
import Footer from "../../components/navigations/Footer";
import Navbar from "../../components/navigations/Navbar";
import RiwayatPemesananCard from "../../components/cards/RiwayatPemesananCard";
import FilterDate from "../../components/buttons/FilterDate";

export default function RiwayatPemesanan() {
  const [activeTab, setActiveTab] = useState("semua");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const flightData = [
    {
      logo: "/airasia-logo.png",
      airline: "AirAsia",
      class: "Ekonomi",
      price: "IDR 4.980.000",
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
      bookingId: "QWERTu323kj",
      status: "diterbitkan",
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
      bookingId: "QWERTu323kj",
      status: "belum bayar",
    },
    {
      logo: "/lionair-logo.png",
      airline: "Lion Air",
      class: "Ekonomi",
      price: "IDR 4.550.000",
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
      bookingId: "QWERTu323kj",
      status: "dibatalkan",
    },
    {
      logo: "/citilink-logo.png",
      airline: "Citilink",
      class: "Ekonomi",
      price: "IDR 6.550.000",
      departureTime: "07:00",
      departureDate: "23 Mei 2024",
      departureCode: "CGK",
      departureLocation: "Soekarno Hatta - Terminal 1A Domestik",
      arrivalTime: "11:00",
      arrivalDate: "23 Mei 2024",
      arrivalCode: "SYD",
      arrivalLocation: "Sydney Airport",
      duration: "19j 45m",
      transit: "4 transit",
      transitTime: "10:00",
      transitLocation: "Kuala Lumpur",
      bookingId: "QWERTu323kj",
      status: "diterbitkan",
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = (flight) => {
    setSelectedFlight(selectedFlight === flight ? null : flight);
  };

  const filteredFlightData =
    activeTab === "semua"
      ? flightData
      : flightData.filter((flight) => flight.status === activeTab);

  return (
    <div className="bg-background">
      <Navbar transparent={false} />

      {/* Booking History Section */}
      <section className="pt-28 pb-8">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex gap-1.5 text-main text-xs font-medium -mt-4 md:-mt-0 mb-10 md:mb-5">
            <span>Beranda</span>
            <img src="/icons/right-chev.svg" alt="chevron" />
            <span>Riwayat Pemesanan</span>
          </div>

          {/* Search History Desktop*/}
          <div className="hidden md:block relative mt-6 mb-5">
            {/* Banner */}
            <img
              src="/search-flight-banner.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 top-[5%] lg:top-[30%] transform -translate-y-1/2 mx-auto w-full">
              <div className="relative w-full">
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
                <input
                  type="text"
                  placeholder="Cari Riwayat..."
                  className="w-full bg-white text-main rounded-full text-base shadow-md ps-14 pr-36 py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-darkprimary rounded-full text-white text-base font-medium px-12 py-2.5">
                  Cari Riwayat
                </button>
              </div>
            </div>
          </div>

          {/* Search History Mobile */}
          <div className="block md:hidden relative mt-4">
            {/* Banner */}
            <img
              src="/search-flight-banner-mobile.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 top-[5%] transform -translate-y-1/2 mx-auto w-full md:w-[1080px]">
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

              <input
                type="text"
                placeholder="Cari Riwayat..."
                className="w-full bg-white text-main rounded-full text-sm shadow-md ps-14 pr-36 py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-darkprimary rounded-full text-white text-xs font-medium px-4 py-2">
                Cari Riwayat
              </button>
            </div>
          </div>

          {/* Filter berdasarkan tanggal mobile */}
          <div className="block md:hidden mt-2">
            <FilterDate label="Date" iconSrc="/icons/filter.svg" />
          </div>

          {/* Tab & Filter Section */}
          <div className="flex justify-between items-center mt-2">
            <div className="border-b border-neutral w-full">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-main">
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("semua")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "semua"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Semua
                  </a>
                </li>
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("belum bayar")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "belum bayar"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Belum Bayar
                  </a>
                </li>
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("diterbitkan")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "diterbitkan"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Diterbitkan
                  </a>
                </li>
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("dibatalkan")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "dibatalkan"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Dibatalkan
                  </a>
                </li>
              </ul>
            </div>

            {/* Filter berdasarkan tanggal desktop */}
            <div className="hidden md:block">
              <FilterDate label="Date" iconSrc="/icons/filter.svg" />
            </div>
          </div>

          {/* Card Section */}
          <div className="flex-col md:flex-row flex gap-4 mt-5">
            {/* Detail Card Mobile */}
            {selectedFlight && (
              <div className="block md:hidden w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden text-main self-start">
                <div className="px-6 py-4">
                  <p className="text-xs font-medium text-gray">
                    Booking ID:{" "}
                    <span className="font-normal">
                      {selectedFlight.bookingId}
                    </span>
                  </p>
                  <h1 className="font-bold text-lg my-2">
                    Jakarta &rarr; Sydney
                  </h1>
                  <div className="grid grid-cols-2 divide-x divide-neutral border border-neutral rounded-lg items-center mb-4 p-4">
                    <div className="flex items-center">
                      <img
                        className="w-7 h-7 mr-3 object-contain"
                        src={selectedFlight.logo}
                        alt={selectedFlight.airline}
                      />
                      <p className="text-main text-sm font-medium leading-none">
                        {selectedFlight.airline}
                      </p>
                    </div>
                    <p className="ps-4 text-main font-normal text-sm">
                      {selectedFlight.departureDate}
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <div className="flex justify-end">
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

                  {isExpanded && (
                    <>
                      <div className="flex border-t border-neutral py-4 mt-2">
                        <div className="flex-col">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                              <p className="font-semibold text-xs">
                                <span className="text-main">
                                  {selectedFlight.departureTime}
                                </span>{" "}
                                -{" "}
                                <span className="text-primary">
                                  Keberangkatan
                                </span>
                              </p>
                            </div>
                            <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                          </div>

                          {Array.isArray(selectedFlight.transitTime) ? (
                            selectedFlight.transitTime.map((time, index) => (
                              <div key={index} className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                                  <p className="font-semibold text-xs">
                                    <span className="text-main">{time}</span> -{" "}
                                    <span className="text-primary">
                                      Transit di{" "}
                                      {selectedFlight.transitLocation[index]}
                                    </span>
                                  </p>
                                </div>
                                <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col">
                              <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                                <p className="font-semibold text-xs">
                                  <span className="text-main">
                                    {selectedFlight.transitTime}
                                  </span>{" "}
                                  -{" "}
                                  <span className="text-primary">
                                    Transit di {selectedFlight.transitLocation}
                                  </span>
                                </p>
                              </div>
                              <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                            <p className="font-semibold text-xs">
                              <span className="text-main">
                                {selectedFlight.arrivalTime}
                              </span>{" "}
                              - <span className="text-primary">Kedatangan</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-t border-neutral py-4">
                        <div className="flex-col">
                          <p className="text-xs font-medium text-gray mb-2">
                            Rincian Harga
                          </p>
                          <div className="flex items-center justify-between text-xs text-main">
                            <span className="font-normal">1 Dewasa</span>
                            <span className="font-medium">IDR 4.950.000</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-main">
                            <span className="font-normal">Pajak</span>
                            <span className="font-medium">IDR 300.000</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-t border-neutral pt-4">
                        <div className="flex items-center justify-between text-xs text-main">
                          <span className="text-xs font-medium text-gray">
                            Total Pembayaran
                          </span>
                          <span className="font-medium">IDR 5.250.000</span>
                        </div>
                      </div>
                      {selectedFlight.status !== "dibatalkan" && (
                        <button
                          className={`text-white font-medium text-sm py-2.5 px-10 rounded-full w-full mt-4 ${
                            selectedFlight.status === "belum bayar"
                              ? "bg-secondary hover:bg-darksecondary"
                              : "bg-primary hover:bg-darkprimary"
                          }`}
                        >
                          {selectedFlight.status === "belum bayar"
                            ? "Lanjut Bayar"
                            : "Cetak Tiket"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Booking History Card */}
            <div className="w-full md:w-3/5 lg:w-3/4">
              {filteredFlightData.map((flight, index) => (
                <RiwayatPemesananCard
                  key={index}
                  flight={flight}
                  onClick={() => handleCardClick(flight)}
                  isSelected={selectedFlight}
                />
              ))}
            </div>

            {/* Detail Card Desktop*/}
            {selectedFlight && (
              <div className="hidden md:block md:w-1/5 lg:w-1/3 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden text-main self-start sticky top-0 z-10">
                <div className="px-6 py-4">
                  <p className="text-sm font-medium text-gray">
                    Booking ID:{" "}
                    <span className="font-normal">
                      {selectedFlight.bookingId}
                    </span>
                  </p>
                  <h1 className="font-bold text-xl my-2">
                    Jakarta &rarr; Sydney
                  </h1>
                  
                  <div className="grid grid-cols-2 divide-x divide-neutral border border-neutral rounded-lg items-center mb-4 md:p-2 lg:p-4">
                    <div className="flex items-center">
                      <img
                        className="w-7 h-7 mr-2 lg:mr-4 object-contain"
                        src={selectedFlight.logo}
                        alt={selectedFlight.airline}
                      />
                      <p className="text-main text-sm lg:text-base font-medium leading-none">
                        {selectedFlight.airline}
                      </p>
                    </div>
                    <p className="ps-2 lg:ps-4 text-main font-normal text-sm lg:text-base">
                      {selectedFlight.departureDate}
                    </p>
                  </div>

                  <div className="flex border-t border-neutral py-4">
                    <div className="flex-col">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                          <p className="font-semibold text-sm">
                            <span className="text-main">
                              {selectedFlight.departureTime}
                            </span>{" "}
                            -{" "}
                            <span className="text-primary">Keberangkatan</span>
                          </p>
                        </div>
                        <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                      </div>

                      {Array.isArray(selectedFlight.transitTime) ? (
                        selectedFlight.transitTime.map((time, index) => (
                          <div key={index} className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                              <p className="font-semibold text-sm">
                                <span className="text-main">{time}</span> -{" "}
                                <span className="text-primary">
                                  Transit di{" "}
                                  {selectedFlight.transitLocation[index]}
                                </span>
                              </p>
                            </div>
                            <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                            <p className="font-semibold text-sm">
                              <span className="text-main">
                                {selectedFlight.transitTime}
                              </span>{" "}
                              -{" "}
                              <span className="text-primary">
                                Transit di {selectedFlight.transitLocation}
                              </span>
                            </p>
                          </div>
                          <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                        <p className="font-semibold text-sm">
                          <span className="text-main">
                            {selectedFlight.arrivalTime}
                          </span>{" "}
                          - <span className="text-primary">Kedatangan</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-neutral py-4">
                    <div className="flex-col">
                      <p className="text-xs font-medium text-gray mb-2">
                        Rincian Harga
                      </p>
                      <div className="flex items-center justify-between text-sm text-main">
                        <span className="font-normal">1 Dewasa</span>
                        <span className="font-medium">IDR 4.950.000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-main">
                        <span className="font-normal">Pajak</span>
                        <span className="font-medium">IDR 300.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-neutral pt-4">
                    <div className="flex items-center justify-between text-sm text-main">
                      <span className="text-xs font-medium text-gray">
                        Total Pembayaran
                      </span>
                      <span className="font-medium">IDR 5.250.000</span>
                    </div>
                  </div>

                  {selectedFlight.status !== "dibatalkan" && (
                    <button
                      className={`text-white font-medium text-base py-2.5 px-10 rounded-full w-full mt-4 ${
                        selectedFlight.status === "belum bayar"
                          ? "bg-secondary hover:bg-darksecondary"
                          : "bg-primary hover:bg-darkprimary"
                      }`}
                    >
                      {selectedFlight.status === "belum bayar"
                        ? "Lanjut Bayar"
                        : "Cetak Tiket"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
