import React, { useEffect, useState } from "react";
import { getFavDestinations } from "../../../redux/actions/favoriteDestinationActions";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const FavoriteDestinationSection = () => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState("Semua");
  const favDestination = useSelector(
    (state) => state?.favDestination.favDestinations
  );

  useEffect(() => {
    dispatch(getFavDestinations());
  }, [dispatch]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const formatPrice = (price) => {
    return `IDR ${new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(price)}`;
  };

  const formatDateToDayMonthYear = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
      return "";
    }

    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const date = new Date(Date.UTC(year, month - 1, day));

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "transparent",
          width: "22px",
          height: "22px",
          cursor: "pointer",
          borderRadius: "50%",
          
        }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          style={{ width: "100%", height: "100%", fill: "#00A8D0" }} // Adjust fill color as needed
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "transparent",
          width: "22px",
          height: "22px",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          style={{ width: "100%", height: "100%", fill: "#00A8D0",  transform: "scaleX(-1)"}}
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 10 10"
            className="text-secondary mt-12"
          >
            <path fill="currentColor" d="M0 7h16v1H0z"></path>
          </svg>
          <span className="text-xl md:text-2xl font-bold text-main">
            Destinasi
          </span>
          <span className="text-xl md:text-2xl ml-2 font-bold text-primary">
            Favorit
          </span>
          <h1 className="text-sm md:text-base text-left text-main leading-5">
            Temukan Destinasi Impian Anda dengan Harga Terbaik
          </h1>
        </div>
      </div>
      <div className="mt-4 md:mt-10">
        <div className="flex flex-wrap justify-between mb-5">
          <div className="flex flex-wrap space-x-1 md:space-x-2 w-full">
            {["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"].map(
              (label) => (
                <button
                  key={label}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-full border-2 mt-2 md:mt-0 ${
                    selectedButton === label
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-200 text-primary"
                  }`}
                  onClick={() => handleButtonClick(label)}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        <div className="">
          {favDestination.length > 0 && (
            <Slider {...settings}>
              {favDestination.map((fav, id) => (
                <div key={id} className="px-2 py-1">
                  <div className="relative w-full bg-white rounded-lg shadow-md h-full bg-transparent overflow-visible text-main hover:shadow-lg cursor-pointer">
                    {/* Image and span container */}
                    <div className="relative">
                      {fav.arrivalCity === "Los Angeles" && (
                        <img
                          className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                          src="https://upload.wikimedia.org/wikipedia/commons/3/32/20190616154621%21Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg"
                          alt="Los Angeles"
                        />
                      )}

                      {fav.arrivalCity === "Miami" && (
                        <img
                          className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                          src="https://blog.viajemos.com/wp-content/uploads/2023/04/Miami-Florida-1.jpg"
                          alt="Miami"
                        />
                      )}

                      {fav.arrivalCity === "New York" && (
                        <img
                          className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                          src="https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                          alt="New York"
                        />
                      )}

                      {fav.arrivalCity === "Houston" && (
                        <img
                          className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                          src="https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/houston/Houston_SKyline_e91e6bde-25f8-4525-93b6-0fe4c9f79307.jpg"
                          alt="Houston"
                        />
                      )}

                      {fav.arrivalCity === "Chicago" && (
                        <img
                          className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                          src="https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg"
                          alt="Chicago"
                        />
                      )}

                      {/* Default image */}
                      {![
                        "Los Angeles",
                        "Miami",
                        "New York",
                        "Houston",
                        "Chicago",
                      ].includes(fav.arrivalCity) && (
                        <img
                          className="w-full cursor-pointer object-cover h-[136px] rounded-t-lg"
                          src="/bg/plane.jpg"
                          alt="Default"
                        />
                      )}
                    </div>

                    {/* Text content */}
                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-main">
                        {fav.departureCity} → {fav.arrivalCity}
                      </h3>
                      <div className="flex items-center gap-1">
                        <img src="/icons/calendar.svg" alt="Calendar" />
                        <p className="text-gray font-medium text-sm">
                          {formatDateToDayMonthYear(fav.departureTime)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <img
                          src="/airasia-logo.png"
                          alt="Airasia Logo"
                          className="w-4 h-4"
                        />
                        <p className="text-gray font-medium text-xs">
                          {fav.airline}
                        </p>
                      </div>

                      <p className="text-danger text-base font-bold mt-2 text-right">
                        {formatPrice(fav.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default FavoriteDestinationSection;
