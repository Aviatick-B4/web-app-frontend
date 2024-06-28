import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-main  text-white py-8 md:py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-2/3 text-left md:col-span-1">
            <img
              src="/logo-blue.png"
              alt="Aviatick Logo"
              className="mx-0 mb-4"
              style={{ width: "60px", height: "auto" }}
            />
            <p className="text-xs md:text-sm text-white font-normal">
              Aviatick adalah platform pemesanan tiket pesawat yang terpercaya,
              menawarkan berbagai pilihan penerbangan dengan harga terbaik. Kami
              berkomitmen untuk memberikan pengalaman pemesanan yang cepat,
              aman, dan efisien. Dapatkan dukungan 24/7 dari tim profesional
              kami untuk memastikan perjalanan Anda berjalan lancar.
            </p>
          </div>
          <div className="w-full md:w-1/3 text-left md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold">Tentang Aviatick</h3>
            <ul className="mt-4 space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  Cara Pemesanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  Pusat Bantuan
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-left md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold">Follow Kami di</h3>
            <ul className="mt-4 space-y-2 text-xs md:text-sm">
              <li className="flex gap-2 justify-start items-center">
                <FaInstagram size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  Instagram
                </a>
              </li>
              <li className="flex gap-2 justify-start items-center">
                <FaTwitter size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  Twitter
                </a>
              </li>
              <li className="flex gap-2 justify-start items-center">
                <FaFacebook size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:border-b hover:border-primary hover:text-primary">
                  Facebook
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
