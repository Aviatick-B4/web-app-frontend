import React, { Component, useEffect, useState } from "react";
import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import BackToTopButton from "../components/navigations/BackToTop";

function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar transparent={false} />
      <div className="mt-28 ">
        {/* Navigasi  */}
        <div className="container bg-white px-3">
          <div className="flex gap-4">
            <p>Beranda</p>
            <p className="text-blue-300">
              {" "}
              <strong>{`>`} </strong>
            </p>
            <p>Cari Penerbangan</p>
            <p className="text-blue-300">
              {" "}
              <strong>{`>`} </strong>
            </p>
            <p>Isi Data Diri</p>
            <p className="text-blue-300">
              {" "}
              <strong>{`>`} </strong>
            </p>
            <p>Selesai</p>
          </div>
          <div>
            <p className="text-center text-white p-2 bg-[#00A310] rounded mt-3">
              Terimakasih atas pembayaran transaksi
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-[150px] gap-5">
          <img src=".\src\assets\success.gif" alt="" className="w-[100px]" />
          <p className="flex flex-col text-center">
            <span className="text-[#00A8D0]">Selamat! </span>
            <span className="">Transaksi Pembayaran Tiket sukses!</span>
          </p>
          <button
            className="bg-[#00A8D0] text-white rounded-md p-2 w-[200px] hover:bg-[#FFB423]"
            onClick={() => navigate("/")}
          >
            Kembali Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
