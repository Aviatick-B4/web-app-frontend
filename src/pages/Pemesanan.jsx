import React, { Component, useEffect, useState } from "react";
import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import BackToTopButton from "../components/navigations/BackToTop";

function Pemesanan() {
  const [IsClick, SetIsClick] = useState(null);
  const [time, setTime] = useState(300); // 300 detik = 5 menit
  const navigate = useNavigate();

  // hitung mundur 5 menit
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          window.location.reload(); // reload halaman
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const HandleClick = (seat) => {
    console.log("seat ", seat);
    SetIsClick(seat);
  };

  // inisialisasi variable
  const Kursi = [];
  const Rows = ["A", "B", "C", "D", "E", "F"];
  const Columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // set kursi
  Rows.forEach((row) => {
    Columns.forEach((col) => {
      Kursi.push(`${row}${col}`);
    });
  });

  const HalfRow = Math.ceil(Rows.length / 2);
  const FirstRows = Rows.slice(0, HalfRow);
  const EndRows = Rows.slice(HalfRow);

  // Mengelompokkan kursi berdasarkan huruf baris
  const KursiByRows = {};
  Rows.forEach((row) => {
    KursiByRows[row] = Kursi.filter((kursi) => kursi.startsWith(row));
  });

  console.log(KursiByRows);

  return (
    <div>
      <Navbar transparent={false} />
      <div className="container">
        <div className="container fixed top-28 right-12 flex w-[500px] justify-end">
          {/* Timer - Sticky Position */}
          <div className="flex justify-end items-center bg-[#00A8D0] w-2/3 text-white rounded-lg shadow-md">
            <p className="mr-2">Selesaikan Dalam</p>
            <p className="font-bold">{formatTime(time)}</p>
            <img
              src=".\src\assets\sun.svg"
              alt="Sun Icon"
              className="ml-2 rounded-r-lg"
            />
          </div>
        </div>
        <div className="container px-3 mx-auto lg:flex mt-24 text-sm ">
          {/* Sisi Kiri */}
          <section className="flex flex-col gap-4 w-2/3 me-6">
            {/* Navigasi  */}
            <div className="py-8 w-2/3">
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
              </div>
            </div>
            {/* Formulir Pendaftaran Pemesan  */}
            <div className="">
              {/* Data Pemesan  */}
              <div className=" rounded-xl p-[32px] shadow-md">
                <p className="text-xl  mb-[32px]">
                  <strong>Data Pemesan</strong>
                </p>
                {/* Formulir  */}
                <div>
                  {" "}
                  {/* Nama Lengkap  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Nama Lengkap</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                  {/* Nama Keluarga  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Nama Keluarga</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                      <div className="flex gap-2">
                        <input type="Checkbox" />
                        <label>Tidak ada nama keluarga</label>
                      </div>
                    </div>
                  </div>
                  {/* Nomor Telepon  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Nomor Telepon</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                  {/* Email  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Email</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Formulir Pendaftaran Penumpang */}
            <div className="">
              {/* Data Pemesan  */}
              <div className=" rounded-xl p-[32px] shadow-md">
                <p className="text-xl  mb-[32px]">
                  <strong>Data Penumpang (Dewasa)</strong>
                </p>
                {/* Formulir  */}
                <div>
                  {" "}
                  {/* Opsi  */}
                  <div className="text-gray">
                    <div className="flex gap-6 mb-[12px] ">
                      <div className="flex gap-2">
                        <input type="radio" />
                        <label>Tuan</label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" />
                        <label>Nyonya</label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" />
                        <label>Nona</label>
                      </div>
                    </div>
                  </div>
                  {/*  Nama Lengkap  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Nama Lengkap</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                  {/* Nama Keluarga  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Nama Keluarga</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                      <div className="flex gap-2">
                        <input type="Checkbox" />
                        <label>Tidak ada nama keluarga</label>
                      </div>
                    </div>
                  </div>
                  {/* Tanggal Lahir  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Tanggal Lahir</p>
                      <input
                        type="date"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                  {/* Kewarganegaraan  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Kewarganegaraan</p>
                      <input
                        type="text"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                  {/* KTP / Paspor  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">KTP/Paspor</p>
                      <select
                        id="doc"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      >
                        <option value="volvo">KTP</option>
                        <option value="saab">Paspor</option>
                      </select>
                    </div>
                  </div>
                  {/* Negara Penerbit  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Negara Penerbit</p>
                      <select
                        id="negara"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      >
                        <option value="volvo">KTP</option>
                        <option value="saab">Paspor</option>
                      </select>
                    </div>
                  </div>
                  {/* Berlaku Sampai  */}
                  <div className="text-gray">
                    <div className="flex flex-col gap-2 mb-[12px]">
                      <p className="">Berlaku Sampai</p>
                      <input
                        type="date"
                        className="border rounded-full w-full py-2 px-4 text-gray"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pemilihan Tempat Duduk */}
            <div className="mb-5">
              {/* Data Pemesan  */}
              <div className="rounded-xl p-[32px] shadow-md">
                <p className="text-xl  mb-[32px]">
                  <strong>Pilih Kursi (Ekonomi)</strong>
                </p>
                {/* Formulir  */}
                <div>
                  <div className="">
                    <div className="flex justify-between">
                      {/* kiri  */}
                      <div className="flex flex-col justify-between w-1/3">
                        <div className="flex justify-around">
                          {FirstRows.map((row, index) => (
                            <p className="p-4" key={index}>
                              {row}
                            </p>
                          ))}
                        </div>
                        <div className="flex">
                          {" "}
                          {Rows.slice(0, Math.ceil(Rows.length / 2)).map(
                            (row) => (
                              <div
                                key={row}
                                className="text-center p-2 flex flex-col gap-3"
                              >
                                {KursiByRows[row].map((seat) => (
                                  <button
                                    key={seat}
                                    className={`p-4 w-14 border rounded ${
                                      IsClick === seat
                                        ? "bg-[#00A8D0] "
                                        : "bg-slate-300"
                                    }`}
                                    onClick={() => HandleClick(seat)}
                                    value={seat}
                                  >
                                    {seat}
                                  </button>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      {/* tengah  */}
                      <div className="flex flex-col justify-center items-center  w-1/3">
                        <div className="p-7"></div>
                        <div className="flex flex-col gap-3">
                          {" "}
                          {Columns.map((row) => (
                            <p className="py-4 px-3 text-center bg-slate-100 rounded-xl border">
                              {row}
                            </p>
                          ))}
                        </div>
                      </div>
                      {/* kanan  */}
                      <div className="flex flex-col justify-between w-1/3">
                        <div className="flex justify-around">
                          {EndRows.map((row, index) => (
                            <p className=" p-4 " key={index}>
                              {row}
                            </p>
                          ))}
                        </div>
                        <div className="flex">
                          {" "}
                          {Rows.slice(Math.ceil(Rows.length / 2)).map((row) => (
                            <div
                              key={row}
                              className="text-center p-2 flex flex-col gap-3"
                            >
                              {KursiByRows[row].map((seat) => (
                                <button
                                  key={seat}
                                  className={`p-4 w-14 border rounded ${
                                    IsClick === seat
                                      ? "bg-[#00A8D0] "
                                      : "bg-slate-300"
                                  }`}
                                  onClick={() => HandleClick(seat)}
                                  value={seat}
                                >
                                  {seat}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sisi Kanan */}
          <section className="flex flex-col w-1/3 gap-4 ">
            {/* Detail Pemesanan  */}
            <div className="rounded shadow-md my-3 mt-[100px]">
              {/* Route  */}
              <p className="flex gap-5 text-xl  p-8">
                <strong>Jakarta</strong>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
                <strong>Sydney</strong>
              </p>
              <hr className="text-gray" />
              {/* Maskapai  */}
              <div className="flex p-8">
                <div className="p-4 flex border w-1/2 gap-2 rounded-l-md items-center">
                  <img src=".\src\assets\logoflight.svg" alt="" />
                  <p>Air Asia</p>
                </div>
                <div className="p-2 flex border w-1/2 gap-2 rounded-r-md justify-center items-center">
                  <p>Kamis, 23 Mei 2024 </p>
                </div>
              </div>
              {/* Detail Route  */}
              <div className="px-8 flex">
                <div>
                  {" "}
                  <img
                    className="py-[5px]"
                    src=".\src\assets\routetime.svg"
                    alt=""
                  />
                </div>
                <div className="px-4">
                  <strong className="flex gap-2 ">
                    <p>07.00</p>
                    <p>-</p>
                    <p className="text-[#00A8D0]">Keberangkatan</p>
                  </strong>
                  <div className="py-4 text-sm">
                    {" "}
                    <p>23 Mei 2024</p>
                    <p>Soekarno Hatta - Terminal 1A Domestik</p>
                  </div>
                  <strong className="flex gap-2 ">
                    <p>07.00</p>
                    <p>-</p>
                    <p className="text-[#00A8D0]">Kedatangan</p>
                  </strong>
                  <div className="py-4 text-sm">
                    {" "}
                    <p>23 Mei 2024</p>
                    <p>Sydney Airport</p>
                  </div>
                </div>
              </div>
              {/* Rincian Harga */}
              <div className="px-8 py-4 text-sm">
                <hr className="pb-4" />
                <p>Rincian Harga</p>
                <div className="flex justify-between">
                  <p>1 Dewasa</p>
                  <p>IDR 4.950.000</p>
                </div>
                <div className="flex justify-between">
                  <p>Pajak</p>
                  <p>IDR 300.000</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p>Total Pembayaran</p>
                  <p className="text-xl">
                    {" "}
                    <strong> IDR 300.000</strong>
                  </p>
                </div>
                {/* Button Bayar  */}
                <button
                  className="rounded-full bg-[#00A8D0] text-white p-2 w-full my-5 hover:bg-[#FFB423]"
                  onClick={() => {
                    navigate("/user/pembayaran");
                  }}
                >
                  Lanjut Bayar{" "}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default Pemesanan;
