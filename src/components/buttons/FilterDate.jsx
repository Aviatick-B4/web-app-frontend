import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterDate = ({ label, iconSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {/* Desktop Filter */}
      <div className="inline-block relative text-left z-20">
        <div>
          <button
            type="button"
            className={`inline-flex items-center justify-center w-full rounded-full border-2 border-primary shadow-sm px-4 py-2 text-xs md:text-sm font-medium focus:outline-none hover:shadow-md ${
              isOpen ? "bg-primary text-white" : "bg-white text-primary"
            }`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={() => setIsOpen(!isOpen)}
          >
            {iconSrc && <img src={iconSrc} alt="icon" className="mr-2" />}
            {label}
            <svg
              className="ml-1 -mr-1 h-4 w-4 md:h-5 md:w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="hidden md:block origin-top-right absolute right-0 mt-2 w-56"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1 px-4" role="none">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter */}
      {isOpen && (
        <div className="fixed md:hidden inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div
            className={`w-full bg-white rounded-t-lg py-4 transition-transform transform ${
              isClosing ? "animate-slide-down" : "animate-slide-up"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="flex justify-between items-center px-4">
              <button className="text-main font-medium" onClick={closeModal}>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <span className="text-sm font-medium text-main">
                Filter Tanggal
              </span>
              <button className="text-danger text-sm font-medium">Reset</button>
            </div>
            <div className="py-1 px-4 text-center mt-2" role="none">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterDate;
