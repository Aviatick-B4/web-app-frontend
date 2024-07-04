import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/actions/authActions";
import Slider from "react-slick";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackButtonMobile from "../components/navigations/BackButtonMobile";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, navigate));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className="min-h-screen flex mx-3 md:mx-0 bg-white">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <button
            onClick={() => navigate(-1)}
            className="bg-none inline-block mb-4 md:mb-4"
          >
            <svg
              className="fill-main md:fill-primary w-4 h-4 md:w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <div>
            <Link to="/">
              <img
                className="h-12 w-auto"
                src="/logo-blue.png"
                alt="Aviatick Logo"
              />
            </Link>
            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-main">
              Forgot Password
            </h2>
            <p className="mt-2 text-xs md:text-sm font-medium text-main">
              Tautan <span className="text-primary">reset password</span> akan
              dikirim ke email Anda.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs md:text-sm font-medium text-gray"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Masukkan email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border-b border-gray placeholder-neutral focus:outline-none focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm md:text-base font-medium text-white bg-primary hover:bg-darkprimary focus:outline-none"
                >
                  Kirim Tautan
                </button>
              </div>
            </form>
            {/* {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>} */}
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/bg/plane.jpg"
          alt="Auth Page Image"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 top-[50%] items-center text-center tracking-[2px] justify-center text-white font-thin text-base px-4 overflow-x-hidden">
          <Slider {...sliderSettings}>
            <h3>Nikmati kemudahan memesan tiket pesawat di Aviatick.</h3>
            <h3>
              Temukan penawaran eksklusif dengan opsi pembayaran fleksibel.
            </h3>
            <h3>
              Jelajahi destinasi impian Anda bersama Aviatick untuk pengalaman
              booking yang sempurna.
            </h3>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;