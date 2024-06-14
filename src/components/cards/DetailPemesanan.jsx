import react from "react";
import { useNavigate } from "react-router-dom";

function DetailPemesanan() {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      {/* Sisi Kanan */}
      <section className="flex flex-col lg:w-1/3 gap-4 ">
        {/* Detail Pemesanan  */}
        <div className="rounded shadow-md my-3 lg:mt-[100px]">
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
                navigate("/pembayaran");
              }}
            >
              Lanjut Bayar{" "}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailPemesanan;
