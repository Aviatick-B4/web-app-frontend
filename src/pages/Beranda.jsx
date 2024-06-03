import React, { useEffect, useState } from "react";
import Footer from "../components/navigations/Footer";
import Navbar from "../components/navigations/Navbar";
import Header from "../components/navigations/header";
import Card from "../components/Card";
import FlightSchedule from "../components/navigations/flightSchedule";
import AboutUs from "../components/navigations/About Us";
import WhyUs from "../components/navigations/whyChooseUs";
import { BsArrowRight } from "react-icons/bs";

function Beranda() {
  return (
    <div>
      <Navbar transparent={true} />
      <Header />

      <main className="container mx-auto">
        <FlightSchedule />
        <section>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 10 10"
            className="text-secondary mt-12"
          >
            <path fill="currentColor" d="M0 7h16v1H0z"></path>
          </svg>
          <span className="text-2xl font-bold">Destinasi</span>
          <span className="text-2xl ml-2 font-bold text-primary">Favorit</span>
          <h1 className="text-gray-600 text-center md:text-left mb-6">
            Temukan Destinasi Impian Anda dengan Harga Terbaik
          </h1>
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
