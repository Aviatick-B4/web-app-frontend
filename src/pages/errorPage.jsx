import React from "react";
import Navbar from "../components/navigations/Navbar";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar transparent={false} />
      <div className="mt-28">
        <div className="container bg-white px-3">
          <div className="flex gap-4">
            <p>Beranda</p>
            <p className="text-blue-300">
              <strong>{`>`}</strong>
            </p>
            <p>Cari Penerbangan</p>
            <p className="text-blue-300">
              <strong>{`>`}</strong>
            </p>
            <p>Isi Data Diri</p>
            <p className="text-blue-300">
              <strong>{`>`}</strong>
            </p>
            <p>Selesai</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-[150px] gap-5">
          <img src=".\src\assets\error.svg" alt="Error" className="w-[300px]" />
          <p className="flex text-lg flex-col text-center">
            <span className="text-danger text-4xl">Galat!</span>
            <span className="text-sm my-2">
              Mohon maaf, transaksi anda gagal
            </span>
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 w-[200px] hover:bg-darkprimary"
            onClick={handleBackToHome}
          >
            Kembali Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
