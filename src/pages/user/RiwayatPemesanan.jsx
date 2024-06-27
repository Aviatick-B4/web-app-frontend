import React, { useEffect, useState } from "react";
import Footer from "../../components/navigations/Footer";
import Navbar from "../../components/navigations/Navbar";
import RiwayatPemesananCard from "../../components/cards/RiwayatPemesananCard";
import FilterDate from "../../components/buttons/FilterDate";
import MobileNavbar from "../../components/navigations/MobileNavbar";
import {
  getBookingHistoryDetail,
  getHistoryByDate,
  getHistorySearchResults,
  getUserBookingHistory,
} from "../../redux/actions/historyActions";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../utils/debounce";

import { FaCalendarAlt } from "react-icons/fa";
import { setHistoryKeyword } from "../../redux/reducers/historyReducers";
import CetakTiket from "../../components/buttons/CetakTiket";
import { setBookingHistoryDetail, setHistoryKeyword } from "../../redux/reducers/historyReducers";
import BackToTopButton from "../../components/navigations/BackToTop";

export default function RiwayatPemesanan() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("semua");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    bookingHistory: flightData = [],
    bookingHistoryDetail: bookingDetail,
    historyKeyword: searchTerm,
    historySearchResults: searchResults,
    date: selectedDate,
    historyByDate,
  } = useSelector((state) => state.history);

  const searchHistory = (term) => {
    dispatch(getHistorySearchResults());
  };

  const delayedSearch = useDebounce(searchHistory, 300);

  const handleSearchInputChange = (e) => {
    dispatch(setHistoryKeyword(e.target.value));
    delayedSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(setBookingHistoryDetail([]))
      await dispatch(getUserBookingHistory());
      await dispatch(getHistoryByDate(selectedDate));
      await dispatch(getHistorySearchResults());
      setLoading(false);
    };

    fetchData();
  }, [dispatch, selectedDate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = (flight) => {
    setSelectedFlight(selectedFlight === flight ? null : flight);
    dispatch(getBookingHistoryDetail(flight.id));
  };

  const filteredFlightData =
    activeTab === "semua"
      ? flightData
      : flightData.filter((flight) => flight.status === activeTab);

  const displayedHistory = searchTerm
    ? searchResults
    : selectedDate
    ? historyByDate
    : filteredFlightData;

  const convertToTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return `${hours}.${minutes}`;
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
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-background">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar transparent={false} />
      </div>

      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <MobileNavbar />
      </div>

      {/* Booking History Section */}
      <section className="pt-6 md:pt-28 pb-8">
        <div className="container">
          {/* Breadcrumb */}
          <h1 className="text-2xl md:text-xl font-bold text-main mb-10 md:mb-4">
            Riwayat Pemesanan
          </h1>

          {/* Search History Desktop*/}
          <div className="hidden md:block relative mt-6 mb-5">
            {/* Banner */}
            <img
              src="/search-flight-banner.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 top-[5%] lg:top-[30%] transform -translate-y-1/2 mx-auto w-full">
              <div className="relative w-full">
                <svg
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Cari Riwayat..."
                  className="w-full bg-white text-main rounded-full text-base shadow-md ps-14 pr-36 py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
          </div>

          {/* Search History Mobile */}
          <div className="block md:hidden relative mt-4">
            {/* Banner */}
            <img
              src="/search-flight-banner-mobile.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 top-[5%] transform -translate-y-1/2 mx-auto w-full md:w-[1080px]">
              <svg
                className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>

              <input
                type="text"
                placeholder="Cari Riwayat..."
                className="w-full bg-white text-main rounded-full text-sm shadow-md ps-14 pr-36 py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>

          {/* Filter berdasarkan tanggal mobile */}
          <div className="block md:hidden mt-2">
            <FilterDate label="Tanggal" iconSrc="/icons/filter.svg" />
          </div>

          {/* Tab & Filter Section */}
          <div className="flex justify-between mt-2">
            <div className="border-b border-neutral w-full">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-main">
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("semua")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "semua"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Semua
                  </a>
                </li>
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("UNPAID")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "UNPAID"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Belum Bayar
                  </a>
                </li>
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("PAID")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "PAID"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Diterbitkan
                  </a>
                </li>
                <li className="me-1 md:me-2">
                  <a
                    onClick={() => handleTabClick("CANCELED")}
                    className={`cursor-pointer inline-flex items-center justify-center p-2 md:p-3 text-xs md:text-sm font-medium border-b-2 rounded-t-lg ${
                      activeTab === "CANCELED"
                        ? "text-primary border-primary"
                        : "border-transparent"
                    }`}
                  >
                    Dibatalkan
                  </a>
                </li>
              </ul>
            </div>

            {/* Filter berdasarkan tanggal desktop */}
            <div className="hidden md:block">
              <FilterDate label="Tanggal" iconSrc="/icons/filter.svg" />
            </div>
          </div>

          {/* Card Section */}
          <div className="flex-col md:flex-row flex gap-4 mt-5">
            {/* Detail Card Mobile */}
            {selectedFlight && (
              <div className="block md:hidden w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden text-main self-start">
                <div className="px-6 py-4">
                  <p className="text-xs font-medium text-gray">
                    Booking Code:{" "}
                    <span className="font-normal">
                      {selectedFlight.booking_code}
                    </span>
                  </p>
                  <h1 className="font-bold text-lg my-2">
                    {selectedFlight.flight_detail?.departure_city} →{" "}
                    {selectedFlight.flight_detail?.arrival_city}
                  </h1>
                  <div className="flex gap-3 border border-neutral rounded-lg items-center mb-4 py-2 px-3">
                    <FaCalendarAlt className="text-gray" />
                    <p className="text-main font-normal text-sm lg:text-base">
                      {formatDateToDayMonthYear(selectedFlight.date)}
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={toggleExpand}
                      className="text-primary font-medium text-xs focus:outline-none flex items-center"
                    >
                      {isExpanded ? (
                        <>
                          Sembunyikan
                          <svg
                            className="w-4 h-4 ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          Tampilkan detail
                          <svg
                            className="w-4 h-4 ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <>
                      <div className="flex border-t border-neutral py-4 mt-2">
                        <div className="flex-col">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                              <p className="font-semibold text-xs">
                                <span className="text-main">
                                  {convertToTime(
                                    selectedFlight.flight_detail?.departure_time
                                  )}
                                </span>{" "}
                                -{" "}
                                <span className="text-primary">
                                  Keberangkatan
                                </span>
                              </p>
                            </div>
                            <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                            <p className="font-semibold text-xs">
                              <span className="text-main">
                                {convertToTime(
                                  selectedFlight.flight_detail?.arrival_time
                                )}
                              </span>{" "}
                              - <span className="text-primary">Kedatangan</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-t border-neutral py-4">
                        <div className="flex-col">
                          <p className="text-xs font-medium text-gray mb-2">
                            Rincian Harga
                          </p>
                          <div className="flex items-center justify-between text-xs text-main">
                            <span className="font-normal">Pajak</span>
                            <span className="font-medium">
                              {formatPrice(bookingDetail?.price_detail?.tax)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-main">
                            <span className="font-normal">Harga</span>
                            <span className="font-medium">
                              {formatPrice(
                                bookingDetail?.price_detail?.total_price -
                                  bookingDetail?.price_detail?.tax
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-t border-neutral pt-4">
                        <div className="flex items-center justify-between text-xs text-main">
                          <span className="text-xs font-medium text-gray">
                            Total Pembayaran
                          </span>
                          <span className="font-medium">
                            {formatPrice(
                              bookingDetail?.price_detail?.total_price
                            )}
                          </span>
                        </div>
                      </div>
                      {selectedFlight.status !== "dibatalkan" && (
                        <button
                          className={`text-white font-medium text-sm py-2.5 px-10 rounded-full w-full mt-4 ${
                            selectedFlight.status === "belum bayar"
                              ? "bg-secondary hover:bg-darksecondary"
                              : "bg-primary hover:bg-darkprimary"
                          }`}
                        >
                          {selectedFlight.status === "belum bayar"
                            ? "Lanjut Bayar"
                            : "Cetak Tiket"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col !w-full items-center justify-center text-center font-medium text-sm mt-16">
                <img
                  src="/animations/loading.gif"
                  alt="Loading"
                  className="w-[99px]"
                />
                <p className="text-xs md:text-sm text-main">
                  Mencari riwayat pemesanan...
                </p>
              </div>
            ) : displayedHistory.length > 0 ? (
              <div className="w-full md:w-3/5 lg:w-3/4">
                {displayedHistory.map((flight) => (
                  <RiwayatPemesananCard
                    key={flight.id}
                    flight={flight}
                    onClick={() => handleCardClick(flight)}
                    isSelected={selectedFlight}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col !w-full items-center justify-center text-center font-medium text-sm mt-16">
                <img
                  src="/animations/notfound.gif"
                  alt="Not found"
                  className="w-[99px]"
                />
                <p className="text-xs md:text-sm text-main">
                  Maaf, data tidak ditemukan
                </p>
              </div>
            )}

            {/* Detail Card Desktop*/}
            {selectedFlight && bookingDetail && (
              <div className="hidden md:block md:w-1/5 lg:w-1/3 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden text-main self-start sticky top-0 z-10">
                <div className="px-6 py-4">
                  <p className="text-sm font-medium text-gray">
                    Booking Code:{" "}
                    <span className="font-normal">
                      {selectedFlight.booking_code}
                    </span>
                  </p>
                  <h1 className="font-bold text-xl my-2">
                    {selectedFlight.flight_detail?.departure_city} →{" "}
                    {selectedFlight.flight_detail?.arrival_city}
                  </h1>

                  <div className="flex gap-3 border border-neutral rounded-lg items-center mb-4 py-2 px-3">
                    <FaCalendarAlt className="text-gray" />
                    <p className="text-main font-normal text-sm lg:text-base">
                      {formatDateToDayMonthYear(selectedFlight.date)}
                    </p>
                  </div>

                  <div className="flex border-t border-neutral py-4">
                    <div className="flex-col">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                          <p className="font-semibold text-sm">
                            <span className="text-main">
                              {convertToTime(
                                selectedFlight.flight_detail?.departure_time
                              )}
                            </span>{" "}
                            -{" "}
                            <span className="text-primary">Keberangkatan</span>
                          </p>
                        </div>
                        <div className="ml-1 h-[27px] w-[1px] bg-neutral"></div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-neutral rounded-full"></div>
                        <p className="font-semibold text-sm">
                          <span className="text-main">
                            {convertToTime(
                              selectedFlight.flight_detail?.arrival_time
                            )}
                          </span>{" "}
                          - <span className="text-primary">Kedatangan</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-neutral py-4">
                    <div className="flex-col">
                      <p className="text-xs font-medium text-gray mb-2">
                        Rincian Harga
                      </p>
                      <div className="flex items-center justify-between text-sm text-main">
                        <span className="font-normal">Pajak</span>
                        <span className="font-medium">
                          {formatPrice(bookingDetail?.price_detail?.tax)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-main">
                        <span className="font-normal">Harga</span>
                        <span className="font-medium">
                          {formatPrice(
                            bookingDetail?.price_detail?.total_price -
                              bookingDetail?.price_detail?.tax
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-neutral pt-4">
                    <div className="flex items-center justify-between text-sm text-main">
                      <span className="text-xs font-medium text-gray">
                        Total Pembayaran
                      </span>
                      <span className="font-medium">
                        {formatPrice(bookingDetail?.price_detail?.total_price)}
                      </span>
                    </div>
                  </div>

                  {selectedFlight.status !== "CANCELED" && (
                    <CetakTiket
                      flightDetail={selectedFlight}
                      bookingDetail={bookingDetail}
                    />
                  )}

                  {/* {selectedFlight.status !== "CANCELED" && (
                    <button
                      className={`text-white font-medium text-base py-2.5 px-10 rounded-full w-full mt-4 ${
                        selectedFlight.status === "UNPAID"
                          ? "bg-secondary hover:bg-darksecondary"
                          : "bg-primary hover:bg-darkprimary"
                      }`}
                    >
                      {selectedFlight.status === "UNPAID"
                        ? "Lanjut Bayar"
                        : "Cetak Tiket"}
                    </button>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <BackToTopButton />
      <Footer />
    </div>
  );
}
