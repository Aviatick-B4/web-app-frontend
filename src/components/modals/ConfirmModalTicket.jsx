import React, { useEffect, useState } from "react";

const ConfirmModalTicket = ({
  booking,
  confirmModalOpen,
  handleConfirmModalToggle,
}) => {
  useEffect(() => {
    console.log("booking", booking);
  }, [booking]);
  return (
    <div
      id="confirm-modal"
      className={`${
        confirmModalOpen ? "" : "hidden"
      } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
    >
      <div className="relative p-4 w-full max-w-5xl max-h-full text-main">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-3 md:p-5 rounded-t">
              <div className="flex items-center gap-3">
                <h1 className="font-bold text-main text-xl">
                  {booking.selectedDeparture.flight.departure.city}
                </h1>
                <svg
                  className="w-4 fill-main"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z" />
                </svg>
                <h1 className="font-bold text-main text-xl">
                  {booking.selectedDeparture.flight.arrival.city}
                </h1>
              </div>
              <button
                type="button"
                onClick={handleConfirmModalToggle}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-textcolor rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Informasi Penerbangan</h4>
                <p className="text-sm text-gray-600">
                  Maskapai: Garuda Indonesia
                </p>
                <p className="text-sm text-gray-600">
                  Nomor Penerbangan: GA123
                </p>
                <p className="text-sm text-gray-600">Tanggal: 25 Juni 2024</p>
                <p className="text-sm text-gray-600">
                  Waktu Keberangkatan: 10:00 AM
                </p>
                <p className="text-sm text-gray-600">
                  Waktu Kedatangan: 12:00 PM
                </p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Informasi Penumpang</h4>
                <p className="text-sm text-gray-600">Nama: John Doe</p>
                <p className="text-sm text-gray-600">Nomor Kursi: 12A</p>
                <p className="text-sm text-gray-600">Kelas: Ekonomi</p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Informasi Tambahan</h4>
                <p className="text-sm text-gray-600">Terminal: 2</p>
                <p className="text-sm text-gray-600">Gate: A12</p>
                <p className="text-sm text-gray-600">Bagasi: 20kg</p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleConfirmModalToggle}
                  className="px-4 py-2 text-base w-full md:w-auto text-center bg-primary text-white rounded-full border-2 border-primary hover:bg-darkprimary hover:border-darkprimary"
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalTicket;
