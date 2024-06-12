import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

function Navbar({ transparent }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state?.auth.user);
  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);

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

  function getInitials(fullName) {
    const names = fullName.split(" ");
    const initials = names.map((name) => name[0]).join("");
    return initials.toUpperCase();
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleConfirmModalToggle = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  return (
    <nav
      className={`py-4 px-3 mb-8 fixed top-0 w-full z-50 transition-colors duration-500 ${
        isScrolled || !transparent ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo-blue.png"
            className="w-[50px] md:w-[76px]"
            alt="Logo Aviatick"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center justify-center flex-grow">
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`${
                isScrolled || !transparent
                  ? "text-sm font-medium text-primary hover:border-b-2 hover:border-primary pb-1"
                  : "text-sm font-medium text-white hover:border-b-2 hover:border-primary pb-1"
              }`}
            >
              Beranda
            </a>
            <a
              href="#"
              className={`${
                isScrolled || !transparent
                  ? "text-sm font-medium text-primary hover:border-b-2 hover:border-primary pb-1"
                  : "text-sm font-medium text-white hover:border-b-2 hover:border-primary pb-1"
              }`}
            >
              Tentang Kami
            </a>
            <a
              href="#"
              className={`${
                isScrolled || !transparent
                  ? "text-sm font-medium text-primary hover:border-b-2 hover:border-primary pb-1"
                  : "text-sm font-medium text-white hover:border-b-2 hover:border-primary pb-1"
              }`}
            >
              Promo
            </a>
          </div>
        </div>

        {/* Desktop Login Button */}
        {isLoggedIn ? (
          <div className="relative hidden md:block">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="flex justify-between gap-2 items-center">
                <div className="rounded-full bg-secondary py-1 px-1.5 items-center text-white font-medium text-lg">
                  {getInitials(user.fullName)}
                </div>
                <p
                  className={`${
                    isScrolled || !transparent
                      ? "text-sm font-medium text-primary"
                      : "text-sm font-medium text-white"
                  }`}
                >
                  {user && user.fullName}
                </p>
              </div>
            </div>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md w-48">
                <Link
                  to="/akun-saya"
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 rounded-t-md"
                >
                  Akun Saya
                </Link>
                <Link
                  to="/riwayat-pemesanan"
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 rounded-t-md"
                >
                  Riwayat Pemesanan
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-main hover:bg-primary/15 rounded-b-md"
                  onClick={handleConfirmModalToggle}
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/masuk"
            className={`${
              isScrolled || !transparent
                ? "hidden md:block text-sm font-medium text-primary bg-none border-2 border-primary hover:bg-primary hover:text-white rounded-full px-4 py-2 items-center"
                : "hidden md:block text-sm font-medium text-white bg-none border-2 border-white hover:bg-white/90 hover:text-primary rounded-full px-4 py-2 items-center"
            }`}
          >
            Masuk
          </Link>
        )}

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

        {/* Confirm Logout Modal */}
        <div
          id="confirm-modal"
          className={`${
            confirmModalOpen ? "" : "hidden"
          } fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-neutral rounded-t">
                  <h3 className="text-xl font-semibold text-textcolor">
                    Keluar
                  </h3>
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
              </div>
              <div className="px-4 md:px-5 pb-4 md:pb-6 pt-2 md:pt-3">
                <p className="mb-4 text-base text-main">
                  Apa kamu yakin mau{" "}
                  <span className="text-danger font-semibold">Keluar</span>?
                </p>
                <div className="flex justify-end">
                  <div className="flex gap-2">
                    <button
                      onClick={handleConfirmModalToggle}
                      type="button"
                      className="w-24 text-main px-6 py-2 bg-neutral/30 hover:bg-neutral/70 mr-2 text-sm font-medium rounded-full text-center"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        dispatch(logout(navigate));
                        handleConfirmModalToggle();
                      }}
                      type="submit"
                      className="w-24 text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >
                      Ya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
