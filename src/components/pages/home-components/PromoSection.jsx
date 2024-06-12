import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const PromoSection = () => {
  const [selectedButton, setSelectedButton] = useState("Semua");

  const destinations = [
    {
      id: 1,
      from: "Jakarta",
      to: "Turki",
      date: "05 Juni 2024",
      airline: "AirAsia",
      price: "IDR 1.500.000",
      discount: "Diskon 50%",
      tripType: "Sekali Jalan",
      image: "/bg/turkey.jpg",
    },
    {
      id: 2,
      from: "Jakarta",
      to: "Sydney",
      date: "08 Juni 2024",
      airline: "Citilink",
      price: "IDR 1.675.000",
      discount: "Diskon 50%",
      tripType: "Pulang-Pergi",
      image: "/bg/sydney.jpg",
    },
    {
      id: 3,
      from: "Jakarta",
      to: "Turki",
      date: "05 Juni 2024",
      airline: "AirAsia",
      price: "IDR 1.500.000",
      discount: "Diskon 50%",
      tripType: "Sekali Jalan",
      image: "/bg/turkey.jpg",
    },
    {
      id: 4,
      from: "Jakarta",
      to: "Sydney",
      date: "08 Juni 2024",
      airline: "Citilink",
      price: "IDR 1.675.000",
      discount: "Diskon 50%",
      tripType: "Pulang-Pergi",
      image: "/bg/sydney.jpg",
    },
    {
      id: 5,
      from: "Jakarta",
      to: "Sydney",
      date: "08 Juni 2024",
      airline: "Citilink",
      price: "IDR 1.675.000",
      discount: "Diskon 50%",
      tripType: "Pulang-Pergi",
      image: "/bg/sydney.jpg",
    },
  ];

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 10 10"
            className="text-secondary mt-12"
          >
            <path fill="currentColor" d="M0 7h16v1H0z"></path>
          </svg>
          <span className="text-xl md:text-2xl font-bold text-main">Promo</span>
          <span className="text-xl md:text-2xl ml-2 font-bold text-primary">
            Terbaik
          </span>
          <h1 className="text-sm md:text-base text-left text-main leading-5">
            Pesan sekarang dan jelajahi destinasi impianmu dengan diskon
            menarik! ✈️✨
          </h1>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map((destination) => (
            <div className="relative w-full bg-white rounded-lg shadow-md h-full bg-transparent overflow-visible text-main hover:shadow-lg cursor-pointer">
              {/* Discount tag */}
              <img
                className="absolute z-10 top-2 -right-1 w-[70px] md:w-[80px]"
                src="/discount-tag.png"
                alt="Diskon"
              />

              {/* Image and span container */}
              <div className="relative">
                {/* Image */}
                <img
                  className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                  src={destination.image}
                  alt={destination.to}
                />
                {/* Span */}
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-tr-md absolute bottom-0 left-0">
                  {destination.tripType}
                </span>
              </div>

              {/* Text content */}
              <div className="p-3">
                <h3 className="text-lg font-semibold text-main">
                  {destination.from} → {destination.to}
                </h3>
                <div className="flex items-center gap-1">
                  <img src="/icons/calendar.svg" alt="Calendar" />
                  <p className="text-gray font-medium text-sm">
                    {destination.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/airasia-logo.png"
                    alt="Airasia Logo"
                    className="w-4 h-4"
                  />
                  <p className="text-gray font-medium text-xs">
                    {destination.airline}
                  </p>
                </div>

                <p className="text-danger text-base font-bold mt-2 text-right">
                  {destination.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
