import React from "react";

const Header = () => {
  return (
    <div className="relative w-full">
      <img
        src="/Group 1349.png"
        alt="Background"
        className="object-cover w-full h-96 md:h-[600px]"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
        <div className="px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Perjalanan Impianmu Dimulai di Sini
          </h1>
          <p className="text-base md:text-lg">
            Temukan penerbangan murah dan nyaman ke seluruh dunia dengan sistem
            pemesanan yang cepat dan mudah.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        {/* <Beranda /> */}
      </div>
    </div>
  );
};

export default Header;
