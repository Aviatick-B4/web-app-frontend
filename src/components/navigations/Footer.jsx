import React from "react";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-main  text-white py-8 md:py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-3/4 text-left md:col-span-1">
            <div className="flex justify-start items-center gap-4">
              <img
                src="/logo-blue.png"
                alt="Aviatick Logo"
                className="mx-0 mb-4 h-12"
              />
              <p className="text-lg font-semibold text-white">X</p>
               <img
                src="/logo-kibowtin.png"
                alt="Kibowtin Logo"
                className="mx-0 mb-4 h-12"
              />
            </div>
            <p className="text-xs md:text-sm text-white font-normal">
              Aviatick adalah platform pemesanan tiket pesawat yang terpercaya,
              menawarkan berbagai pilihan penerbangan dengan harga terbaik. Kami
              berkomitmen untuk memberikan pengalaman pemesanan yang cepat,
              aman, dan efisien. Dapatkan dukungan 24/7 dari tim profesional
              kami untuk memastikan perjalanan Anda berjalan lancar.
            </p>
          </div>
          <div className="w-full md:w-1/4 text-left md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold">Hubungi Kami</h3>
            <ul className="mt-4 space-y-2 text-xs md:text-sm">
              <li className="flex gap-2 justify-start items-center">
                <FaEnvelope size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  aviatick2024@gmail.com
                </a>
              </li>
              <li className="flex gap-2 justify-start items-center">
                <FaWhatsapp size={24} className="mr-2 text-primary" />
                <a 
                  href="https://wa.me/6281259702559" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:border-b hover:border-primary hover:text-primary"
                >
                  +62 812-5970-2559
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left">
          <p className="text-white font-normal text-sm">
            &copy; 2024 Aviatick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
