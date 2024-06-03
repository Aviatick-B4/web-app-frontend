import React, { useEffect, useState } from "react";
import Footer from "../components/navigations/Footer";
import Navbar from "../components/navigations/Navbar";
import Header from "../components/pages/home-components/HeaderSection";
import Card from "../components/cards/FavoriteCard";
import FlightSchedule from "../components/pages/home-components/FlightScheduleSection";
import AboutUs from "../components/pages/home-components/AboutUsSection";
import WhyUs from "../components/pages/home-components/WhyChooseUsSection";
import { BsArrowRight } from "react-icons/bs";

function Beranda() {
  return (
    <div className="bg-white">
      <Navbar transparent={true} />
      <Header />

      <main className="container mx-auto">
        <FlightSchedule />
        <section>
          <div className="flex items-center justify-between">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                viewBox="0 0 10 10"
                className="text-secondary mt-12"
              >
                <path fill="currentColor" d="M0 7h16v1H0z"></path>
              </svg>
              <span className="text-2xl font-bold text-main">Destinasi</span>
              <span className="text-2xl ml-2 font-bold text-primary">
                Favorit
              </span>
              <h1 className="text-gray-600 text-center md:text-left text-main">
                Temukan Destinasi Impian Anda dengan Harga Terbaik
              </h1>
            </div>

            <button className="text-primary bg-white rounded-full border-2 border-primary px-4 py-2 hover:bg-primary hover:text-white mt-2 md:mt-16">
              Lihat Semua <BsArrowRight className="inline-block ml-2" />
            </button>
          </div>
          <Card />
        </section>
      </main>
      <AboutUs />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default Beranda;
