import React, { useEffect, useState } from "react";
import Navbar from "../components/navigations/Navbar";
import Footer from "../components/navigations/Footer";
import { useNavigate } from "react-router-dom";
import BackToTopButton from "../components/navigations/BackToTop";
import DetailPemesanan from "../components/cards/DetailPemesanan";
import FormPenumpang from "../components/cards/FormPenumpang";

function Pemesanan() {
  const [IsClick, SetIsClick] = useState(null);

  // State untuk menyimpan inputan
  const [formData, setFormData] = useState({
    namaLengkap: "",
    namaKeluarga: "",
    noTelepon: "",
    email: "",
    penumpangNamaLengkap: "",
    penumpangNamaKeluarga: "",
    penumpangTanggalLahir: "",
    penumpangKewarganegaraan: "",
    penumpangDokumen: "KTP",
    penumpangNegara: "KTP",
    penumpangBerlakuSampai: "",
  });

  const pemesanFields = [
    { label: "Nama Lengkap", name: "namaLengkap", type: "text" },
    { label: "Nama Keluarga", name: "namaKeluarga", type: "text" },
    { label: "Nomor Telepon", name: "noTelepon", type: "text" },
    { label: "Email", name: "email", type: "text" },
  ];

  const penumpangFields = [
    { label: "Nama Lengkap", name: "penumpangNamaLengkap", type: "text" },
    { label: "Nama Keluarga", name: "penumpangNamaKeluarga", type: "text" },
    { label: "Tanggal Lahir", name: "penumpangTanggalLahir", type: "date" },
    {
      label: "Kewarganegaraan",
      name: "penumpangKewarganegaraan",
      type: "text",
    },
    {
      label: "KTP/Paspor",
      name: "penumpangDokumen",
      type: "select",
      options: [
        { label: "KTP", value: "KTP" },
        { label: "Paspor", value: "Paspor" },
      ],
    },
    {
      label: "Negara Penerbit",
      name: "penumpangNegara",
      type: "select",
      options: [
        { label: "KTP", value: "KTP" },
        { label: "Paspor", value: "Paspor" },
      ],
    },
    { label: "Berlaku Sampai", name: "penumpangBerlakuSampai", type: "date" },
  ];

  const HandleClick = (seat) => {
    console.log("seat ", seat);
    SetIsClick(seat);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log("Data", formData);

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
        <div className="container px-3 mx-auto lg:flex mt-24 text-sm ">
          {/* Sisi Kiri */}
          <section className="flex flex-col gap-4 lg:w-2/3 lg:me-6">
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
            <FormPenumpang
              title="Data Pemesan"
              fields={pemesanFields}
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <FormPenumpang
              title="Data Penumpang (Dewasa)"
              fields={penumpangFields}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </section>
          <DetailPemesanan />{" "}
        </div>
      </div>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default Pemesanan;
