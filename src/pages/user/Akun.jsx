import React, { useEffect, useState } from "react";
import Footer from "../../components/navigations/Footer";
import Navbar from "../../components/navigations/Navbar";
import MobileNavbar from "../../components/navigations/MobileNavbar";

export default function Akun() {
  return (
    <div className="bg-background">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar transparent={false} />
      </div>

      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <MobileNavbar />
      </div>

      {/* Akun Section */}
      <section className="md:pt-28 pb-6 md:pb-80">
        {/* Banner Mobile */}
        <div className="block md:hidden w-full">
          <img src="/profile-page/banner.png" alt="" />
        </div>

        <div className="container">
          {/* Breadcrumb */}
          <div className="hidden md:flex gap-1.5 text-main text-sm font-medium -mt-4 md:-mt-0 mb-10 md:mb-5">
            <span>Beranda</span>
            <img src="/icons/right-chev.svg" alt="chevron" />
            <span>Akun</span>
          </div>

          {/* Card Section */}
          <div className="flex flex-col md:flex-row gap-4 mt-5">
            {/* Akun Menu */}
            <div className="hidden md:block md:w-1/5 lg:w-1/3 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden self-start">
              <div className="px-4 py-4 bg-primary/15 flex gap-3 items-center cursor-pointer">
                <svg
                  className="w-4 h-4 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <span className="text-primary text-sm font-medium">
                  Ubah Profil
                </span>
              </div>
              <div className="px-4 py-4 flex gap-3 items-center hover:bg-primary/10 cursor-pointer">
                <svg
                  className="w-4 h-4 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
                <span className="text-main font-medium text-sm">
                  Ganti Password
                </span>
              </div>
              <div className="px-4 py-4 flex gap-3 items-center hover:bg-primary/10 cursor-pointer">
                <svg
                  className="w-4 h-4 fill-danger"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
                <span className="text-danger font-medium text-sm">
                  Hapus Akun
                </span>
              </div>
              <div className="px-4 py-4 flex gap-3 items-center hover:bg-primary/10 cursor-pointer">
                <svg
                  className="w-4 h-4 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                <span className="text-main font-medium text-sm">Keluar</span>
              </div>
            </div>

            {/* Akun Name */}
            <div className="block md:hidden w-full bg-white shadow-lg rounded-lg overflow-hidden px-6 py-4 -mt-36">
              <h1 className="text-xl font-bold text-main mb-2">Akun</h1>
              <h1 className="text-lg font-semibold text-main">Jane Doe</h1>
            </div>

            {/* Akun Detail */}
            <div className="w-full md:w-3/5 lg:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden p-6 md:p-12">
              <h1 className="text-xl md:text-2xl font-bold text-main mb-4">
                Ubah Profil
              </h1>
              <form action="#" method="POST" className="space-y-6">
                <div className="mt-4">
                  <label
                    htmlFor="nama"
                    className="block text-xs md:text-sm font-medium text-main"
                  >
                    Nama Lengkap
                  </label>
                  <div className="mt-1">
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      className="appearance-none block w-full px-3 py-2 border-b border-gray placeholder-neutral focus:outline-none focus:ring-primary focus:border-b-2 focus:border-primary text-sm md:text-base text-main font-normal"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="nomor"
                    className="block text-xs md:text-sm font-medium text-main"
                  >
                    No Telepon
                  </label>
                  <div className="mt-1">
                    <input
                      id="nomor"
                      name="nomor"
                      type="text"
                      placeholder="+6281260152"
                      required
                      className="appearance-none block w-full px-3 py-2 border-b border-gray placeholder-neutral focus:outline-none focus:ring-primary focus:border-b-2 focus:border-primary text-sm md:text-base text-main font-normal"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs md:text-sm font-medium text-main"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="janedoe@gmail.com"
                      required
                      className="appearance-none block w-full px-3 py-2 border-b border-gray placeholder-neutral focus:outline-none focus:ring-primary focus:border-b-2 focus:border-primary text-sm md:text-base text-main font-normal"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm md:text-base font-medium text-white bg-primary hover:bg-darkprimary focus:outline-none"
                  >
                    Ubah Profil
                  </button>
                </div>
              </form>
            </div>

            {/* Akun Menu Mobile */}
            <div className="block md:hidden w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden self-start">
              <div className="px-4 py-4 flex gap-3 items-center hover:bg-primary/10 cursor-pointer">
                <svg
                  className="w-4 h-4 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                </svg>
                <span className="text-main font-medium text-sm">
                  Pengaturan
                </span>
              </div>
              <div className="px-4 py-4 flex gap-3 items-center hover:bg-primary/10 cursor-pointer">
                <svg
                  className="w-4 h-4 fill-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                <span className="text-main font-medium text-sm">Keluar</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
