import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import "../../DatePickerStyles.css";
import "../../modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCities,
  getCitySearchResults,
} from "../../redux/actions/searchFlightActions";
import { setCityKeyword } from "../../redux/reducers/searchFlightReducers";
import { useDebounce } from "../../utils/debounce";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { id } from "date-fns/locale";

Modal.setAppElement("#root");

const UnifiedModal = ({
  isOpen,
  onRequestClose,
  type,
  onSave,
  initialData,
}) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state?.search.cityKeyword);
  const citySearchResult = useSelector(
    (state) => state?.search.citySearchResults
  );

  const [selectedClass, setSelectedClass] = useState(
    initialData?.selectedClass || "Economy"
  );
  const [selectedCity, setSelectedCity] = useState(
    initialData?.selectedCity || "Jakarta"
  );
  const [passengers, setPassengers] = useState(
    initialData?.passengers || { adults: 1, children: 0, infants: 0 }
  );
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [subModalType, setSubModalType] = useState(null);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  useEffect(() => {
    if (type === "passenger" && initialData) {
      setPassengers(
        initialData.passengers || { adults: 1, children: 0, infants: 0 }
      );
    }
  }, [initialData, type]);

  const searchCity = (term) => {
    dispatch(getCitySearchResults());
  };

  const delayedSearch = useDebounce(searchCity, 200);

  const handleSearchInputChange = (e) => {
    dispatch(setCityKeyword(e.target.value));
    delayedSearch(e.target.value);
  };

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
  };

  const classes = ["First", "Economy", "Business"];

  const handleSave = () => {
    if (type === "date" || type === "mobile") {
      const stripTime = (date) => {
        const newDate = new Date(date);
        newDate.setHours(12, 0, 0, 0);
        return newDate;
      };

      const startDate = stripTime(state[0].startDate);
      const endDate = state[0].endDate ? stripTime(state[0].endDate) : null;

      onSave(startDate, endDate);
    }
    if (type === "class" || type === "mobile") {
      onSave(selectedClass);
    }
    if (type === "passenger" || type === "mobile") {
      onSave(passengers);
    }
    if (type === "city" || type === "mobile") {
      onSave(selectedCity);
    }
    onRequestClose();
  };

  const handleSubModalSave = (data) => {
    if (subModalType === "city") {
      setSelectedCity(data);
    } else if (subModalType === "date") {
      setState(data);
    } else if (subModalType === "passenger") {
      setPassengers(data);
    } else if (subModalType === "class") {
      setSelectedClass(data);
    }
    setSubModalType(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Pilih"
      className="modal rounded-lg min-w-[340px] md:min-w-[440px]"
      overlayClassName="overlay"
      appElement={document.getElementById("root")}
    >
      <div className="p-4">
        {type === "mobile" && (
          <>
            <h2 className="text-xl text-left font-semibold text-main mb-6">
              Ubah Pencarian
            </h2>
            <form action="">
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dari
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="Departure"
                    value={selectedCity}
                    onClick={() => setSubModalType("city")}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ke
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="Departure"
                    value={selectedCity}
                    onClick={() => setSubModalType("city")}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tanggal
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="Select Date"
                    onClick={() => setSubModalType("date")}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Penumpang
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="Select Passengers"
                    onClick={() => setSubModalType("passenger")}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kelas
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="Select Class"
                    onClick={() => setSubModalType("class")}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </>
        )}
        {type === "date" && (
          <>
            <h2 className="text-xl text-left font-semibold text-main mb-6">
              Pilih Tanggal
            </h2>
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              color="#00A8D0"
              rangeColors={["#00A8D0"]}
              locale={id}
              minDate={new Date()}
              staticRanges={[]}
              inputRanges={[]}
              className="-ms-9 bg-transparent"
            />
          </>
        )}
        {type === "class" && (
          <>
            <h2 className="text-xl text-left font-semibold text-main mb-6">
              Pilih Kelas
            </h2>
            <ul>
              {classes.map((classItem) => (
                <li
                  key={classItem}
                  onClick={() => setSelectedClass(classItem)}
                  className={`p-2 cursor-pointer hover:bg-primary/10 ${
                    selectedClass === classItem ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{classItem}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {type === "passenger" && (
          <>
            <h2 className="text-xl text-left font-semibold text-main mb-6">
              Pilih Penumpang
            </h2>
            <PassengerInput
              passengers={passengers}
              setPassengers={setPassengers}
            />
          </>
        )}
        {type === "city" && (
          <>
            <h2 className="text-xl text-left font-semibold text-main mb-6">
              Pilih Kota atau Negara
            </h2>
            <CityInput
              searchTerm={searchTerm}
              onSearchInputChange={handleSearchInputChange}
              citySearchResult={citySearchResult}
              selectedCity={selectedCity}
              onCitySelect={setSelectedCity}
            />
          </>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={onRequestClose}
            className="px-6 py-2 bg-neutral/30 hover:bg-neutral/70 text-main rounded-full mr-2 text-sm font-normal"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary hover:bg-darkprimary text-white rounded-full text-sm font-normal"
          >
            Simpan
          </button>
        </div>
      </div>
      {subModalType && (
        <SubModal
          isOpen={!!subModalType}
          onRequestClose={() => setSubModalType(null)}
          contentLabel={`Pilih ${subModalType}`}
        >
          {subModalType === "city" && (
            <CityInput
              searchTerm={searchTerm}
              onSearchInputChange={handleSearchInputChange}
              citySearchResult={citySearchResult}
              selectedCity={selectedCity}
              onCitySelect={setSelectedCity}
            />
          )}
          {subModalType === "date" && (
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              ranges={state}
              direction="vertical"
              color="#00A8D0"
              rangeColors={["#00A8D0"]}
              locale={id}
              minDate={new Date()}
              staticRanges={[]}
              inputRanges={[]}
              className="-ms-60 bg-transparent"
            />
          )}
          {subModalType === "passenger" && (
            <PassengerInput
              passengers={passengers}
              setPassengers={setPassengers}
            />
          )}
          {subModalType === "class" && (
            <ul>
              {classes.map((classItem) => (
                <li
                  key={classItem}
                  onClick={() => {
                    setSelectedClass(classItem);
                    setSubModalType(null);
                  }}
                  className={`p-2 cursor-pointer hover:bg-primary/10 ${
                    selectedClass === classItem ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{classItem}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SubModal>
      )}
    </Modal>
  );
};

const SubModal = ({ isOpen, onRequestClose, contentLabel, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={contentLabel}
    className="modal rounded-lg min-w-[340px] md:min-w-[440px]"
    overlayClassName="overlay"
    appElement={document.getElementById("root")}
  >
    <div className="p-4">
      <h2 className="text-xl text-left font-semibold text-main mb-6">
        {contentLabel}
      </h2>
      {children}
    </div>
  </Modal>
);

const PassengerInput = ({ passengers, setPassengers }) => (
  <>
    <PassengerCounter
      label="Dewasa"
      description="(12 tahun keatas)"
      count={passengers.adults}
      onDecrease={() =>
        setPassengers({
          ...passengers,
          adults: Math.max(1, passengers.adults - 1),
        })
      }
      onIncrease={() =>
        setPassengers({
          ...passengers,
          adults: passengers.adults + 1,
        })
      }
    />
    <PassengerCounter
      label="Anak"
      description="(2 - 11 tahun)"
      count={passengers.children}
      onDecrease={() =>
        setPassengers({
          ...passengers,
          children: Math.max(0, passengers.children - 1),
        })
      }
      onIncrease={() =>
        setPassengers({
          ...passengers,
          children: passengers.children + 1,
        })
      }
    />
    <PassengerCounter
      label="Bayi"
      description="(Dibawah 2 tahun)"
      count={passengers.infants}
      onDecrease={() =>
        setPassengers({
          ...passengers,
          infants: Math.max(0, passengers.infants - 1),
        })
      }
      onIncrease={() =>
        setPassengers({
          ...passengers,
          infants: passengers.infants + 1,
        })
      }
    />
  </>
);

const PassengerCounter = ({
  label,
  description,
  count,
  onDecrease,
  onIncrease,
}) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="text-left text-lg font-semibold">{label}</h3>
      <p className="text-sm text-darkgray">{description}</p>
    </div>
    <div className="flex items-center">
      <button
        onClick={onDecrease}
        className="px-3 py-1 bg-neutral/30 rounded-full"
      >
        -
      </button>
      <span className="mx-2">{count}</span>
      <button
        onClick={onIncrease}
        className="px-2.5 py-1 bg-neutral/30 rounded-full"
      >
        +
      </button>
    </div>
  </div>
);

const CityInput = ({
  searchTerm,
  onSearchInputChange,
  citySearchResult,
  selectedCity,
  onCitySelect,
}) => (
  <>
    <div className="relative">
      <input
        type="text"
        className="w-full bg-white text-main rounded-full text-base border border-neutral px-10 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Cari kota atau negara"
        value={searchTerm}
        onChange={onSearchInputChange}
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral"
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
    </div>
    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-primary scrollbar-track-white overflow-y-scroll max-h-48 mt-4">
      {[...citySearchResult]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((city) => (
          <div
            key={city.cityIata}
            onClick={() => onCitySelect(city.cityIata)}
            className={`p-2 cursor-pointer hover:bg-primary/10 ${
              selectedCity === city.name ? "bg-primary/10" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left flex-row">
                <h1 className="font-medium text-base text-main">{city.name}</h1>
                <h2 className="text-sm font-normal text-darkgray">
                  {city.country}
                </h2>
              </div>
              <label
                htmlFor="city"
                className="bg-neutral/20 text-gray font-medium text-sm px-2.5 rounded-full"
              >
                {city.cityIata}
              </label>
            </div>
          </div>
        ))}
    </div>
  </>
);

export default UnifiedModal;
