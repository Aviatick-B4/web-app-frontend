import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const Card = () => {
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
    },
    // Tambahkan destinasi lainnya sesuai kebutuhan
  ];

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between mb-4">
        <div className="flex flex-wrap space-x-2 mb-4 w-full md:mb-0">
          <button
            className={`px-4 py-2 rounded-full border-2 ${
              selectedButton === "Semua"
                ? "bg-primary text-white border-primary"
                : "bg-gray-200 text-primary"
            }`}
            onClick={() => handleButtonClick("Semua")}
          >
            Semua
          </button>
          <button
            className={`px-4 py-2 rounded-full border-2 ${
              selectedButton === "Asia"
                ? "bg-primary text-white border-primary"
                : "bg-gray-200 text-primary"
            }`}
            onClick={() => handleButtonClick("Asia")}
          >
            Asia
          </button>
          <button
            className={`px-4 py-2 rounded-full border-2 ${
              selectedButton === "Amerika"
                ? "bg-primary text-white border-primary"
                : "bg-gray-200 text-primary"
            }`}
            onClick={() => handleButtonClick("Amerika")}
          >
            Amerika
          </button>
          <button
            className={`px-4 py-2 rounded-full border-2 ${
              selectedButton === "Australia"
                ? "bg-primary text-white border-primary"
                : "bg-gray-200 text-primary"
            }`}
            onClick={() => handleButtonClick("Australia")}
          >
            Australia
          </button>
          <button
            className={`px-4 py-2 rounded-full border-2 ${
              selectedButton === "Eropa"
                ? "bg-primary text-white border-primary"
                : "bg-gray-200 text-primary"
            }`}
            onClick={() => handleButtonClick("Eropa")}
          >
            Eropa
          </button>
          <button
            className={`px-4 py-2 rounded-full border-2 ${
              selectedButton === "Afrika"
                ? "bg-primary text-white border-primary"
                : "bg-gray-200 text-primary"
            }`}
            onClick={() => handleButtonClick("Afrika")}
          >
            Afrika
          </button>
        </div>
        <div className="w-full flex justify-center md:justify-end">
          <button className="text-primary bg-white rounded-full border-2 border-primary px-4 py-2 hover:bg-primary hover:text-white mt-2 md:mt-0">
            Lihat Semua <BsArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        {destinations.map((destination) => (
          <div key={destination.id} className="w-1/2 sm:w-1/3 md:w-1/4 p-2">
            <div className="border p-4 rounded-lg shadow-lg">
              <div className="relative">
                <img
                  src={`/turki/${destination.to.toLowerCase()}.jpg`} // akan dimasukkan ketika sudah ada API dari gambar tersebut
                  alt={destination.to}
                  className="w-full h-32 object-cover rounded-t-lg"
                  onError={(e) => {
                    console.error(
                      `Gambar tidak ditemukan: /turki/${destination.to.toLowerCase()}.jpg`
                    );
                    e.target.src = "/turki.jpg"; // Gambar default jika tidak ditemukan
                  }}
                />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center">
                  {/* <img
                    src="/Discount Tag.jpg"
                    alt="Discount Tag"
                    className="inline-block mr-1"
                    style={{ width: "20px", height: "20px" }}
                  /> */}
                  {destination.discount}
                </span>
              </div>
              <div className="p-2">
                <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                  {destination.tripType}
                </span>
                <h3 className="text-xl font-bold">
                  {destination.from} → {destination.to}
                </h3>
                <p className="text-gray-500 text-sm">{destination.date}</p>
                <p className="text-gray-500 text-sm">{destination.airline}</p>
                <p className="text-red-500 text-lg font-bold mt-2 text-right">
                  {destination.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
