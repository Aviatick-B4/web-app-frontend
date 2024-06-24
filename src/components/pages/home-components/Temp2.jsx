import React, { useEffect, useState } from "react";
import Footer from "../components/navigations/Footer";
import Navbar from "../components/navigations/Navbar";
import FlightCard from "../components/cards/HasilPencarianCard";
import FilterButton from "../components/buttons/FilterButton";
import { useSelector, useDispatch } from "react-redux";
import { addDays, format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import UnifiedModal from "../components/modals/Modal";
import { getFlightSearchResults } from "../redux/actions/searchFlightActions";
import { setFlightKeyword } from "../redux/reducers/searchFlightReducers";
import { toast } from "react-toastify";

export default function HasilPencarian() {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("2024-05-23");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [changedFlightKeyword, setChangedFlightKeyword] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchResultsDeparture = useSelector(
    (state) => state?.search?.flightSearchResults?.tickets?.departure || []
  );
  const flightKeyword = useSelector(
    (state) => state?.search?.flightKeyword || {}
  );
  const tripTypeSaved = useSelector(
    (state) => state?.search?.tripTypeSaved || null
  );

  const { from, to, departureDate, returnDate, passengers, flightClass } =
    flightKeyword;

  const {
    adults = 0,
    children = 0,
    infants = 0,
  } = flightKeyword?.passengers || {};
  const totalPassenger = adults + children + infants;

  const changedPassengers = changedFlightKeyword?.passengers || {};
  const {
    adults: changedAdults = 0,
    children: changedChildren = 0,
    infants: changedInfants = 0,
  } = changedPassengers;
  const totalChangedPassengers =
    changedAdults + changedChildren + changedInfants;

  const initialData = {
    passengers: {
      adults: adults,
      children: children,
      infants: infants,
    },
  };

  useEffect(() => {
    console.log("tripType", tripTypeSaved);
    console.log("keyword", flightKeyword);
  }, [tripTypeSaved]);

  const openModal = (type, data) => {
    setModalType(type);
    if (type === "date") {
      setModalData(
        data === "departure"
          ? {
              startDate: parseISO(departureDate),
              endDate: parseISO(returnDate),
            }
          : {
              startDate: parseISO(departureDate),
              endDate: parseISO(returnDate),
            }
      );
    } else {
      setModalData(data);
    }
    setIsModalOpen(true);
  };

  const handleSave = (data, endDate) => {
    if (modalType === "city") {
      if (modalData === "from" && data === to) {
        toast.error("Kota keberangkatan tidak boleh sama dengan kota tujuan.");
        return;
      }
      if (modalData === "to" && data === from) {
        toast.error("Kota tujuan tidak boleh sama dengan kota keberangkatan.");
        return;
      }

      setChangedFlightKeyword((prev) => ({
        ...prev,
        [modalData]: data,
      }));
    } else if (modalType === "date") {
      const departureDate = data.toISOString().split("T")[0];
      const returnDate = endDate ? endDate.toISOString().split("T")[0] : null;

      setChangedFlightKeyword((prev) => ({
        ...prev,
        departureDate: departureDate,
        returnDate: returnDate,
      }));
    } else if (modalType === "class") {
      setChangedFlightKeyword((prev) => ({
        ...prev,
        flightClass: data,
      }));
    } else if (modalType === "passenger") {
      setChangedFlightKeyword((prev) => ({
        ...prev,
        passengers: data,
      }));
    }
    setIsModalOpen(false);
  };

  const handleSaveToState = () => {
    const updatedKeyword = {
      ...flightKeyword,
      ...changedFlightKeyword,
      departureDate: format(
        parseISO(
          changedFlightKeyword?.departureDate ||
            departureDate ||
            new Date().toISOString().split("T")[0]
        ),
        "yyyy-MM-dd"
      ),
      returnDate: changedFlightKeyword?.returnDate
        ? format(parseISO(changedFlightKeyword.returnDate), "yyyy-MM-dd")
        : returnDate
        ? format(parseISO(returnDate), "yyyy-MM-dd")
        : null,
    };

    setLoading(true);
    dispatch(getFlightSearchResults(updatedKeyword)).then(() => {
      setLoading(false);
    });
    dispatch(setFlightKeyword(updatedKeyword));
  };

  const handleAllClick = () => {
    setIsAllSelected(true);
    setSortOption(null);
    setSelectedFacilities([]);
    setPriceRange([0, Infinity]);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const uniqueFacilities = Array.from(
    new Set(
      searchResultsDeparture.flatMap(
        (flight) => flight.airplaneSeatClass.airplane.inFlightFacility || []
      )
    )
  );

  const handleFacilityChange = (facility) => {
    setSelectedFacilities((prev) => {
      if (prev.includes(facility)) {
        return prev.filter((f) => f !== facility);
      } else {
        return [...prev, facility];
      }
    });
  };

  const handlePriceRangeChange = (range) => {
    if (range === "IDR 0 - 4.000.000") {
      setPriceRange([0, 4000000]);
    } else if (range === "IDR 4.000.000 - 8.000.000") {
      setPriceRange([4000000, 8000000]);
    } else if (range === "> IDR 8.000.000") {
      setPriceRange([8000000, Infinity]);
    } else {
      setPriceRange([0, Infinity]);
    }
  };

  const sortedAndFilteredResults = searchResultsDeparture
    .filter((flight) => {
      const facilitiesMatch =
        selectedFacilities.length === 0 ||
        (flight.airplaneSeatClass.airplane.inFlightFacility &&
          selectedFacilities.every((facility) =>
            flight.airplaneSeatClass.airplane.inFlightFacility.includes(
              facility
            )
          ));
      const priceMatch =
        flight.price >= priceRange[0] && flight.price <= priceRange[1];
      return facilitiesMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortOption === "Harga - Terendah ke Tertinggi") {
        return a.price - b.price;
      } else if (sortOption === "Harga - Tertinggi ke Terendah") {
        return b.price - a.price;
      } else if (sortOption === "Durasi - Terpendek ke Terlama") {
        const durationA =
          new Date(a.flight.arrivalTime) - new Date(a.flight.departureTime);
        const durationB =
          new Date(b.flight.arrivalTime) - new Date(b.flight.departureTime);
        return durationA - durationB;
      } else if (sortOption === "Durasi - Terlama ke Terpendek") {
        const durationA =
          new Date(a.flight.arrivalTime) - new Date(a.flight.departureTime);
        const durationB =
          new Date(b.flight.arrivalTime) - new Date(b.flight.departureTime);
        return durationB - durationA;
      }
      return 0;
    });

  const generateDateList = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      const formattedDate = {
        day: format(date, "EEEE", { locale: id }),
        date: format(date, "d MMMM yyyy", { locale: id }),
        value: format(date, "yyyy-MM-dd"),
      };
      days.push(formattedDate);
    }
    return days;
  };

  const formatDateToDayMonthYear = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
      return "";
    }

    const [year, month, day] = dateString.split("-");
    const date = new Date(Date.UTC(year, month - 1, day));

    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const days = generateDateList();

  const handleDateClick = (dateValue) => {
    const departureDate = dateValue;
    const arrivalDate = addDays(new Date(dateValue), 1)
      .toISOString()
      .split("T")[0];

    setSelectedDay(dateValue);

    const updatedKeyword = {
      ...flightKeyword,
      departureDate: departureDate,
      returnDate: arrivalDate,
    };

    setLoading(true);
    dispatch(getFlightSearchResults(updatedKeyword)).then(() => {
      setLoading(false);
    });
    dispatch(setFlightKeyword(updatedKeyword));
  };

  const swapLocations = () => {
    setFrom((prevFrom) => {
      const newFrom = to;
      setTo(prevFrom);
      return newFrom;
    });
  };

  return (
    <div className="bg-background">
      <Navbar transparent={false} />

      {/* Hasil Pencarian Section */}
      <section className="pt-28 pb-8 md:pb-64">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex gap-1.5 text-main text-xs font-medium -mt-4 md:-mt-0 mb-10 md:mb-5">
            <span>Beranda</span>
            <img src="/icons/right-chev.svg" alt="chevron" />
            <span>Hasil Pencarian</span>
          </div>

          {/* Search Flight Desktop */}
          <div className="hidden md:block relative mt-6">
            {/* Banner */}
            <img
              src="/search-flight-banner.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 md:top-[5%] lg:top-[30%] transform -translate-y-1/2 mx-auto w-full bg-white items-center rounded-full text-base shadow-md ps-8 pe-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
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

              {/* Search Input Description */}
              <div className="flex justify-between items-center">
                <div className="flex gap-8 items-center text-sm font-medium text-main">
                  {/* Destination */}
                  <div className="ps-8 flex gap-2 items-center">
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal("city", "from")}
                    >
                      {changedFlightKeyword?.from || from}
                    </span>
                    <button className="mx-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                      <img
                        src="/icons/exchange.svg"
                        alt="exchange"
                        className="w-6 h-6"
                      />
                    </button>
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal("city", "to")}
                    >
                      {changedFlightKeyword?.to || to}
                    </span>
                  </div>

                  {/* Vertical Line */}
                  <div className="h-[27px] w-[1px] bg-gray"></div>

                  {/* Date */}
                  <div className="flex items-center gap-4">
                    <span
                      className="cursor-pointer"
                      onClick={() => openModal("date", "departure")}
                    >
                      {formatDateToDayMonthYear(
                        changedFlightKeyword?.departureDate || departureDate
                      )}
                    </span>
                    {returnDate && (
                      <>
                        <span>-</span>
                        <span
                          className="cursor-pointer"
                          onClick={() => openModal("date", "return")}
                        >
                          {formatDateToDayMonthYear(
                            changedFlightKeyword?.returnDate || returnDate
                          )}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Vertical Line */}
                  <div className="h-[27px] w-[1px] bg-gray"></div>

                  {/* Passengers */}
                  <span
                    className="cursor-pointer"
                    onClick={() => openModal("passenger")}
                  >
                    {totalChangedPassengers || totalPassenger} Penumpang
                  </span>

                  {/* Vertical Line */}
                  <div className="h-[27px] w-[1px] bg-gray"></div>

                  {/* Class */}
                  <span
                    className="cursor-pointer"
                    onClick={() => openModal("class")}
                  >
                    {changedFlightKeyword?.flightClass || flightClass}
                  </span>
                </div>
                {/* Button Change Search */}
                <button
                  onClick={handleSaveToState}
                  className="bg-primary hover:bg-darkprimary rounded-full text-white text-sm lg:text-base font-medium px-8 lg:px-12 py-2.5"
                >
                  Ubah
                </button>
              </div>
            </div>

            <UnifiedModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              type={modalType}
              onSave={handleSave}
              initialData={initialData}
            />
          </div>

          {/* Search Flight Mobile */}
          <div className="block md:hidden relative mt-4">
            {/* Banner */}
            <img
              src="/search-flight-banner-mobile.png"
              alt="Banner"
              className="w-full"
            />

            {/* Search Field */}
            <div className="absolute inset-x-0 top-[5%] transform -translate-y-1/2 mx-auto w-full md:w-[1080px] bg-white items-center rounded-full text-base shadow-md ps-8 pe-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
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

              <div className="flex justify-between items-center">
                {/* Search Input Description */}
                <div className="flex items-center text-sm font-medium text-main">
                  {/* Destination */}
                  <div className="ps-8 flex gap-24 items-center">
                    <span className="cursor-pointer">
                      {changedFlightKeyword?.from || from}
                    </span>
                    <SwapButton onClick={swapLocations} />
                    <span className="cursor-pointer">
                      {changedFlightKeyword?.to || to}
                    </span>
                  </div>
                </div>
                {/* Button Change Search */}
                <button
                  onClick={() => openModal("mobile")}
                  className="bg-primary hover:bg-darkprimary rounded-full text-white text-sm font-medium px-4 py-2"
                >
                  Ubah
                </button>
              </div>
            </div>
          </div>

          {/* Date List Desktop */}
          <div className="hidden md:flex justify-center items-center bg-gray-100 mt-5">
            <div className="flex w-full items-center border border-neutral rounded-xl overflow-hidden text-center">
              {days.map((day, index) => (
                <div
                  key={day.value}
                  className={`py-3 md:px-4 lg:px-7 cursor-pointer flex-grow ${
                    selectedDay === day.value ? "bg-primary/20" : "bg-white"
                  } hover:bg-primary/20 active:bg-primary/20 transition-colors duration-200 ${
                    index !== 0 ? "border-l border-neutral" : ""
                  }`}
                  onClick={() => handleDateClick(day.value)}
                >
                  <h5 className="text-base font-semibold text-main">
                    {day.day}
                  </h5>
                  <div className="text-sm font-normal text-darkgray">
                    {day.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date List Mobile */}
          <div className="block md:hidden overflow-x-auto whitespace-nowrap border-b-2 border-primary">
            {days.map((day, index) => (
              <div
                key={day.value}
                className={`inline-block text-center px-4 py-2 cursor-pointer ${
                  selectedDay === day.value ? "bg-primary/20" : "bg-white"
                } hover:bg-primary/20 active:bg-primary/20 transition-colors duration-200 ${
                  index !== 0 ? "border-l border-neutral" : ""
                }`}
                onClick={() => handleDateClick(day.value)}
              >
                <div className="font-semibold text-xs text-main">{day.day}</div>
                <div className="font-normal text-xs text-main">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Filter Desktop */}
          <div className="hidden md:flex space-x-3 items-center mt-5">
            <button
              onClick={handleAllClick}
              className={`text-xs md:text-sm font-medium rounded-full px-4 py-2 border-2 ${
                isAllSelected
                  ? "bg-primary text-white"
                  : "bg-white text-primary border-primary"
              }`}
            >
              Semua
            </button>
            <FilterButton
              label="Urutkan"
              options={[
                "Harga - Terendah ke Tertinggi",
                "Harga - Tertinggi ke Terendah",
                "Durasi - Terpendek ke Terlama",
                "Durasi - Terlama ke Terpendek",
              ]}
              iconSrc="/icons/filter.svg"
              onOptionSelect={handleSortChange}
              selectedOption={sortOption}
            />
            <FilterButton
              label="Fasilitas"
              options={uniqueFacilities}
              iconSrc="/icons/facility.svg"
              onOptionSelect={handleFacilityChange}
              selectedOption={selectedFacilities.join(", ")}
            />
            <FilterButton
              label="Harga"
              options={[
                "IDR 0 - 4.000.000",
                "IDR 4.000.000 - 8.000.000",
                "> IDR 8.000.000",
              ]}
              iconSrc="/icons/price.svg"
              onOptionSelect={handlePriceRangeChange}
              selectedOption={
                priceRange[0] === 0 && priceRange[1] === Infinity
                  ? null
                  : priceRange[1] === Infinity
                  ? `> IDR 8.000.000`
                  : `IDR ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`
              }
            />
          </div>

          {/* Filter Mobile */}
          <>
            <div className="flex md:hidden items-center mt-3">
              <button
                className={`rounded-full text-xs font-medium py-2 px-6 ${
                  isAllSelected
                    ? "bg-primary text-white"
                    : "bg-white border border-primary text-primary"
                }`}
                onClick={handleAllClick}
              >
                Semua
              </button>
            </div>
            <div
              className="md:hidden fixed inset-x-0 bottom-0 bg-white flex justify-around p-4 shadow-inner"
              style={{
                boxShadow:
                  "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FilterButton
                label="Urutkan"
                options={[
                  "Harga - Terendah ke Tertinggi",
                  "Harga - Tertinggi ke Terendah",
                  "Durasi - Terpendek ke Terlama",
                  "Durasi - Terlama ke Terpendek",
                ]}
                iconSrc="/icons/filter.svg"
                onOptionSelect={handleSortChange}
                selectedOption={sortOption}
              />
              <FilterButton
                label="Fasilitas"
                options={uniqueFacilities}
                iconSrc="/icons/facility.svg"
                onOptionSelect={handleFacilityChange}
                selectedOption={selectedFacilities.join(", ")}
              />
              <FilterButton
                label="Harga"
                options={[
                  "IDR 0 - 4.000.000",
                  "IDR 4.000.000 - 8.000.000",
                  "> IDR 8.000.000",
                ]}
                iconSrc="/icons/price.svg"
                onOptionSelect={handlePriceRangeChange}
                selectedOption={
                  priceRange[0] === 0 && priceRange[1] === Infinity
                    ? null
                    : priceRange[1] === Infinity
                    ? `> IDR 8.000.000`
                    : `IDR ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`
                }
              />
            </div>
          </>

          {/* Card */}
          <div className="mt-3 md:mt-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-center font-medium text-sm mt-16">
                <img
                  src="/animations/loading.gif"
                  alt="Loading"
                  className="w-[99px]"
                />
                <p className="text-main">Mencari penerbangan terbaik...</p>
              </div>
            ) : sortedAndFilteredResults.length > 0 ? (
              sortedAndFilteredResults.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center font-medium text-sm mt-16">
                <img
                  src="/animations/notfound.gif"
                  alt="Not found"
                  className="w-[99px]"
                />
                <p className="text-main">Maaf, pencarian tidak ditemukan</p>
                <p className="text-primary">Coba cari penerbangan lainnya!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const SwapButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute md:top-[35%] left-[32%] md:left-[17.5%] transform md:-translate-x-1/2 bg-gray-200 p-2 rounded-full bg-white shadow"
  >
    <img src="/icons/exchange.svg" alt="exchange" className="w-6 h-6" />
  </button>
);
