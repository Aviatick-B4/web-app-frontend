import React, { useEffect, useState } from "react";
import Footer from "../../components/navigations/Footer";
import Navbar from "../../components/navigations/Navbar";
import FilterButton from "../../components/buttons/FilterButton";

export default function Notifikasi() {
  const notifications = [
    {
      type: "Promosi",
      message: "Dapatkan Potongan 50% Tiket! Syarat dan Ketentuan berlaku!",
      date: "20 Maret, 14:04",
    },
    {
      type: "Notifikasi",
      message:
        "Terdapat perubahan pada jadwal penerbangan kode booking 45G6T6. Cek jadwal perjalanan Anda disini!",
      date: "5 Maret, 14:04",
    },
  ];

  const getSvgIcon = (type) => {
    if (type === "Promosi") {
      return (
        <svg
          className="w-3 h-3 md:w-4 md:h-4 fill-secondary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      );
    } else if (type === "Notifikasi") {
      return (
        <svg
          className="w-3 h-3 md:w-4 md:h-4 fill-secondary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      );
    }
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar transparent={false} />
      </div>

      {/* Notification Section */}
      <section className="pt-8 md:pt-28 pb-8">
        <div className="container">
          {/* Breadcrumb */}
          <div className="hidden md:flex gap-1.5 text-main text-sm font-medium -mt-4 md:-mt-0 mb-10 md:mb-5">
            <span>Beranda</span>
            <img src="/icons/right-chev.svg" alt="chevron" />
            <span>Notifikasi</span>
          </div>

          <div className="relative mt-6">
            {/* Title */}
            <div
              style={{
                backgroundImage: 'url("/search-flight-banner.png")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="hidden md:block w-full"
            >
              <div className="flex justify-between items-center pt-4 pb-10 px-6">
                <h1 className="text-2xl font-semibold text-white ">
                  Notifikasi
                </h1>
                <FilterButton
                  label="Filter"
                  options={["General", "Transaksi", "Promo"]}
                />
              </div>
            </div>
            <div className="md:hidden flex items-center justify-between pb-4 border-b border-neutral">
              <h1 className=" text-2xl font-semibold text-main ">Notifikasi</h1>
              <FilterButton
                label="Filter"
                options={["General", "Transaksi", "Promo"]}
              />
            </div>

            <div className="w-full md:bg-white rounded-lg md:shadow-md md:-mt-8 h-80">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start pt-4 p-0 md:p-4 hover:bg-primary/10 cursor-pointer"
                >
                  <div className="flex-shrink-0 rounded-full bg-primary p-1 md:p-1.5">
                    {getSvgIcon(notification.type)}
                  </div>
                  <div className="ml-4 w-full">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm  md:text-base text-main">
                        {notification.type}
                      </span>
                      <span className="text-xs md:text-sm font-normal text-darkgray">
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm font-normal text-darkgray">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
