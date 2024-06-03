import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ transparent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) {
      setIsScrolled(true);
    } else {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [transparent]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`py-4 px-3 fixed top-0 w-full z-50 transition-colors duration-500 ${
        isScrolled || !transparent ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo-blue.png"
            className="w-[60px] md:w-[76px]"
            alt="Logo Aviatick"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center justify-center flex-grow">
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`${
                isScrolled || !transparent || window.location.pathname === "/"
                  ? "text-sm font-medium text-primary"
                  : "text-sm font-medium text-white"
              }`}
            >
              Beranda
            </a>
            <a
              href="#"
              className={`${
                isScrolled || !transparent
                  ? "text-sm font-medium text-primary"
                  : "text-sm font-medium text-white"
              }`}
            >
              Tentang Kami
            </a>
            <a
              href="#"
              className={`${
                isScrolled || !transparent
                  ? "text-sm font-medium text-primary"
                  : "text-sm font-medium text-white"
              }`}
            >
              Promo
            </a>
          </div>
        </div>

        {/* Desktop Login Button */}
        <Link
          to="/login"
          className={`${
            isScrolled || !transparent
              ? "hidden md:block text-sm font-medium text-primary bg-none border-2 border-primary hover:bg-primary hover:text-white rounded-full px-4 py-2 items-center"
              : "hidden md:block text-sm font-medium text-white bg-none border-2 border-white hover:bg-white/90 hover:text-primary rounded-full px-4 py-2 items-center"
          }`}
        >
          Masuk
        </Link>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={handleMobileMenuToggle}
            className={`focus:outline-none focus:text-primary ${
              isScrolled || !transparent ? "text-primary" : "text-white"
            }`}
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "fixed z-50" : "hidden"
          } top-0 left-0 w-full h-full flex items-center justify-end bg-black bg-opacity-30`}
          onClick={handleMobileMenuToggle}
        >
          <div className="md:hidden bg-white w-1/2 h-full flex flex-col justify-start items-end pt-12">
            <button
              onClick={handleMobileMenuToggle}
              className="absolute top-4 right-4 text-main hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="w-4 h-4"
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
              <span className="sr-only">Close menu</span>
            </button>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 w-full text-left"
            >
              Beranda
            </Link>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 w-full text-left"
            >
              Tentang Kami
            </a>
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 w-full text-left"
            >
              Promo
            </a>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 w-full text-left"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
