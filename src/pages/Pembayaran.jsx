import Footer from "../components/navigations/Footer";
import Navbar from "../components/navigations/Navbar";
import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

export default function Pembayaran() {
  const [isUnderline, isSetUnderline] = useState();
  const navigate = useNavigate();

  const handleClickCreditCard = () => {
    isSetUnderline(!isUnderline);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-24 flex justify-center">
        {/* Navigasi  */}
        <div className="container fixed top-[89px] z-50 bg-white py-8 px-3">
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
            <p>Pembayaran</p>
          </div>
          <div>
            <p className="text-center text-white p-2 bg-[#FF0000] rounded mt-3">
              Selesaikan Pembayaran sampai 10 Mei 2024 12.00
            </p>
          </div>
        </div>
        <div className="container px-3 flex gap-5 my-5 justify-between">
          {/* Sisi Kiri  */}
          <section className=" flex flex-col w-2/3 gap-5 mt-36 shadow-md rounded p-4">
            <p>
              <strong>Isi Data Pembayaran</strong>
            </p>
            <div>
              <Accordion className="mb-3">
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>E-Wallet</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="flex flex-col gap-3">
                      <button className="flex flex-row gap-2 items-center p-2 rounded-xl w-full text-start border">
                        <img
                          src=".\src\assets\gopay.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>Gopay</p>
                      </button>{" "}
                      <button className="flex flex-row gap-2 items-center border p-2 rounded-xl w-full text-start">
                        <img
                          src=".\src\assets\shopee.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>ShopeePay / SPayLater</p>
                      </button>{" "}
                      <button className="flex flex-row gap-2 items-center border p-2 rounded-xl w-full text-start">
                        <img
                          src=".\src\assets\dana.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>DANA</p>
                      </button>{" "}
                      <button className="flex flex-row gap-2 items-center border p-2 rounded-xl w-full text-start">
                        <img
                          src=".\src\assets\ovo.jpg"
                          className="rounded-full w-[30px]"
                        />
                        <p>OVO</p>
                      </button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="mb-3">
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Virtual Account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="flex flex-col gap-3">
                      <button className="flex flex-row gap-2 items-center p-2 rounded-xl w-full text-start border">
                        <img
                          src=".\src\assets\briva.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>BRI</p>
                      </button>{" "}
                      <button className="flex flex-row gap-2 items-center border p-2 rounded-xl w-full text-start">
                        <img
                          src=".\src\assets\livin.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>MANDIRI</p>
                      </button>{" "}
                      <button className="flex flex-row gap-2 items-center border p-2 rounded-xl w-full text-start">
                        <img
                          src=".\src\assets\bca.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>BCA</p>
                      </button>{" "}
                      <button className="flex flex-row gap-2 items-center border p-2 rounded-xl w-full text-start">
                        <img
                          src=".\src\assets\bni.png"
                          className="rounded-full w-[30px]"
                        />
                        <p>BNI</p>
                      </button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="mb-3">
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Credit Card</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="flex flex-col justify-center">
                      <div className="flex gap-4 justify-center">
                        <button
                          className="relative"
                          onClick={handleClickCreditCard}
                        >
                          <img
                            src=".\src\assets\mastercard.png"
                            className="w-[35px] mb-2"
                          />
                          {isUnderline && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8D0]"></span>
                          )}
                        </button>
                        <button
                          className="relative"
                          onClick={handleClickCreditCard}
                        >
                          <img
                            src=".\src\assets\american.png"
                            className="w-[35px] mb-2"
                          />
                          {isUnderline && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8D0]"></span>
                          )}
                        </button>
                        <button
                          className="relative"
                          onClick={handleClickCreditCard}
                        >
                          <img
                            src=".\src\assets\visa.png"
                            className="w-[35px] mb-2"
                          />
                          {isUnderline && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8D0]"></span>
                          )}
                        </button>
                        <button
                          className="relative"
                          onClick={handleClickCreditCard}
                        >
                          <img
                            src=".\src\assets\paypal.png"
                            className="w-[35px] mb-2"
                          />
                          {isUnderline && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8D0]"></span>
                          )}
                        </button>
                      </div>

                      <div className="flex flex-col m-4">
                        <label>Card Number</label>
                        <input
                          type="text"
                          className="p-2 border my-2 border-x-0 border-t-0"
                          placeholder="4480 0000 0000 0000"
                        />
                        <label>Card Holder Name</label>
                        <input
                          type="text"
                          className="p-2 border my-2 border-x-0 border-t-0"
                          placeholder="Your Name"
                        />
                        <div className="flex gap-4">
                          <div className="flex flex-col w-1/2">
                            <label>CVV</label>
                            <input
                              type="text"
                              className="p-2 border my-2 border-x-0 border-t-0"
                              placeholder="000"
                            />
                          </div>
                          <div className="flex flex-col w-1/2">
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              className="p-2 border my-2 border-x-0 border-t-0"
                              placeholder="07/24"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <button
              className="bg-[#00A8D0] text-center p-2 rounded-full text-white hover:bg-[#FFB423]"
              onClick={() => {
                navigate("/success");
              }}
            >
              Bayar
            </button>
          </section>
          {/* Sisi Kanan */}
          <section className="flex flex-col w-1/3 gap-4 mt-[38px] ">
            {/* Detail Pemesanan  */}
            <div className="rounded shadow-md my-3 mt-[100px]">
              {/* Route  */}
              <p className="px-8">Order ID : 6723y2GHK</p>
              <p className="flex gap-5 text-xl px-8 py-3">
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
              {/* Rincian Harga */}
              <div className="px-8 py-4 text-sm">
                <div className="flex justify-between">
                  <p>Total Pembayaran</p>
                  <p className="text-xl">
                    {" "}
                    <strong> IDR 300.000</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
