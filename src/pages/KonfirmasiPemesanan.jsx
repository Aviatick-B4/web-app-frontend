import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/navigations/Footer";
import Navbar from "../components/navigations/Navbar";

const KonfirmasiPemesanan = () => {
  const location = useLocation();
  const selectedFlight = location.state?.selectedFlight;

  if (!selectedFlight) {
    return (
      <div>
        <Navbar />
        <div className="container text-center py-20">
          <h2 className="text-2xl font-semibold">
            Tidak ada penerbangan yang dipilih
          </h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container py-20">
        <h2 className="text-2xl font-semibold mb-6">Konfirmasi Pemesanan</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {selectedFlight.airline}
          </h3>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Keberangkatan</p>
              <p>
                {selectedFlight.departureLocation} (
                {selectedFlight.departureCode})
              </p>
              <p>
                {selectedFlight.departureDate}, {selectedFlight.departureTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tujuan</p>
              <p>
                {selectedFlight.arrivalLocation} ({selectedFlight.arrivalCode})
              </p>
              <p>
                {selectedFlight.arrivalDate}, {selectedFlight.arrivalTime}
              </p>
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">
              Harga: {selectedFlight.price}
            </h4>
            <button className="bg-primary text-white font-semibold py-2 px-4 rounded-full">
              Konfirmasi Pemesanan
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KonfirmasiPemesanan;
