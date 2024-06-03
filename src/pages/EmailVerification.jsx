import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function EmailVerification() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 ">
      <img
        src="/bg/plane.jpg"
        className="hidden lg:block absolute inset-0 w-full h-screen object-cover"
      />
      <div className="hidden lg:block absolute inset-0 bg-black opacity-20"></div>
      <div className="relative bg-white px-6 py-16 lg:shadow-xl mx-auto w-full lg:max-w-3xl rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-12 md:space-y-14">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Verifikasi Email</p>
            </div>
            <div className="flex flex-row text-sm font-normal text-main">
              <p>
                Ketik 6 digit kode yang dikirimkan ke <b>t*****@gmail.com</b>
              </p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-12 md:space-y-14">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-lg space-x-2 md:space-x-0">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-12 h-12 md:w-16 md:h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center lg:px-5 outline-none rounded-lg md:rounded-xl border border-neutral text-lg md:text-xl text-main font-semibold bg-white focus:bg-gray-50 focus:ring-2 focus:border-none ring-primary"
                        type="text"
                        maxLength="1"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm md:text-base font-medium text-white bg-primary hover:bg-darkprimary focus:outline-none"
                    >
                      Verifikasi
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-normal space-x-1 text-main">
                    <p>Belum menerima kode?</p>{" "}
                    <a
                      className="flex flex-row items-center font-medium text-primary hover:text-darkprimary"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kirim ulang
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
