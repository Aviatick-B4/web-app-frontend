import React, { useState } from "react";

const FilterButton = ({ label, options, iconSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
      <div className="hidden md:inline-block relative text-left">
        <div>
          <button
            type="button"
            className={`inline-flex items-center justify-center w-full rounded-full border-2 border-primary shadow-sm px-4 py-2 text-sm font-medium focus:outline-none hover:shadow-md ${
              isOpen ? "bg-primary text-white" : "bg-white text-primary"
            }`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            {iconSrc && <img src={iconSrc} alt="icon" className="mr-2" />}
            {label}
            <svg
              className="ml-1 -mr-1 h-5 w-5"
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
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              {options.map((option, index) => (
                <a
                  href="#"
                  key={index}
                  className="block px-4 py-2 font-medium text-sm text-main hover:bg-primary/20"
                  role="menuitem"
                >
                  {option}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden relative inline-block text-left">
        <div>
          <button
            className="text-main text-xs font-medium"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-col items-center gap-1">
              {iconSrc && <img src={iconSrc} alt="icon" />}
              {label}
            </div>
          </button>
        </div>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
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
                <span className="text-sm font-medium text-main">{label}</span>
                <button className="text-danger text-sm font-medium">
                  Reset
                </button>
              </div>
              <div className="py-1" role="none">
                {options.map((option, index) => (
                  <a
                    href="#"
                    key={index}
                    className="block px-4 py-2 font-medium text-xs text-main hover:bg-primary/20"
                    role="menuitem"
                  >
                    {option}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterButton;
