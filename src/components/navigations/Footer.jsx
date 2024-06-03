import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-main text-white py-12 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <img
              src="/logo-blue.png"
              alt="Aviatick Logo"
              className="mx-auto md:mx-0 mb-4 w-[65px]"
            />
            <p className="text-gray-300">
              Aviatick adalah platform pemesanan tiket pesawat yang terpercaya,
              menawarkan
              <p>
                berbagai pilihan penerbangan dengan harga terbaik. Kami
                berkomitmen untuk
              </p>
              memberikan pengalaman pemesanan yang cepat, aman, dan efisien.
              Dapatkan dukungan
              <p>
                24/7 dari tim profesional kami untuk memastikan perjalanan Anda
                berjalan lancar.
              </p>
            </p>
          </div>
          <div className="text-center md:text-left">
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
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">Follow Kami di</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <FaInstagram size={24} className="mr-2" />
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li className="flex items-center">
                <FaXTwitter size={24} className="mr-2" />
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="flex items-center">
                <FaFacebook size={24} className="mr-2" />
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
