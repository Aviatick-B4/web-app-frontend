import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-main  text-white py-8 md:py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left md:col-span-1">
            <img
              src="/logo-blue.png"
              alt="Aviatick Logo"
              className="mx-auto md:mx-0 mb-4"
              style={{ width: "100px", height: "auto" }}
            />
            <p className="text-gray-300">
              Aviatick adalah platform pemesanan tiket pesawat yang terpercaya,
              menawarkan berbagai pilihan penerbangan dengan harga terbaik. Kami
              berkomitmen untuk memberikan pengalaman pemesanan yang cepat,
              aman, dan efisien. Dapatkan dukungan 24/7 dari tim profesional
              kami untuk memastikan perjalanan Anda berjalan lancar.
            </p>
          </div>
          <div className="text-center md:text-left md:col-span-1">
            <h3 className="text-xl font-bold">Tentang Aviatick</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Cara Pemesanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pusat Bantuan
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left md:col-span-1">
            <h3 className="text-xl font-bold">Follow Kami di</h3>
            <ul className="max-lg:flex gap-3 justify-center mt-4 space-y-2">
              <li className="flex justify-center md:justify-start items-center">
                <FaInstagram size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li className="flex justify-center md:justify-start items-center">
                <FaTwitter size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="flex justify-center md:justify-start items-center">
                <FaFacebook size={24} className="mr-2 text-primary" />
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left">
          <p className="text-gray-400">
            &copy; 2024 Aviatick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
