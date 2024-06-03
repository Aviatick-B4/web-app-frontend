import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../DatePickerStyles.css";
import "../../modal.css";

Modal.setAppElement("#root");

const UnifiedModal = ({
  isOpen,
  onRequestClose,
  type,
  onSave,
  initialData,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialData || new Date());
  const [selectedClass, setSelectedClass] = useState(initialData || "Economy");
  const [passengers, setPassengers] = useState(
    initialData || { adults: 1, children: 0, infants: 0 }
  );
  const [searchTerm, setSearchTerm] = useState("");

  const classes = [
    { name: "Economy", price: "IDR 4.950.000" },
    { name: "Premium Economy", price: "IDR 7.550.000" },
    { name: "Business", price: "IDR 29.220.000" },
    { name: "First Class", price: "IDR 87.620.000" },
  ];

  const popularDestinations = [
    "Jakarta",
    "Surabaya",
    "Makassar",
    "Bali",
    "Yogyakarta",
    "Bandung",
    "Medan",
    "Palembang",
    "Semarang",
    "Balikpapan",
  ];

  const handleSave = () => {
    if (type === "date") {
      onSave(selectedDate);
    } else if (type === "class") {
      onSave(selectedClass);
    } else if (type === "passenger") {
      onSave(passengers);
    } else if (type === "city") {
      onSave(searchTerm);
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Pilih"
      className="modal rounded-lg"
      overlayClassName="overlay"
      appElement={document.getElementById("root")}
    >
      <div className="p-4">
        {type === "date" && (
          <>
            <h2 className="text-xl font-bold mb-4">Pilih Tanggal</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
            />
          </>
        )}
        {type === "class" && (
          <>
            <h2 className="text-xl font-bold mb-4">Pilih Kelas</h2>
            <ul>
              {classes.map((cls) => (
                <li
                  key={cls.name}
                  onClick={() => setSelectedClass(cls.name)}
                  className={`p-2 cursor-pointer ${
                    selectedClass === cls.name ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{cls.name}</span>
                    <span>{cls.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {type === "passenger" && (
          <>
            <h2 className="text-xl font-bold mb-4">Pilih Penumpang</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Dewasa</h3>
                <p className="text-sm text-gray-500">(12 tahun keatas)</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setPassengers({
                      ...passengers,
                      adults: Math.max(1, passengers.adults - 1),
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded-full"
                >
                  -
                </button>
                <span className="mx-2">{passengers.adults}</span>
                <button
                  onClick={() =>
                    setPassengers({
                      ...passengers,
                      adults: passengers.adults + 1,
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Anak</h3>
                <p className="text-sm text-gray-500">(2 - 11 tahun)</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setPassengers({
                      ...passengers,
                      children: Math.max(0, passengers.children - 1),
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded-full"
                >
                  -
                </button>
                <span className="mx-2">{passengers.children}</span>
                <button
                  onClick={() =>
                    setPassengers({
                      ...passengers,
                      children: passengers.children + 1,
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Bayi</h3>
                <p className="text-sm text-gray-500">(Dibawah 2 tahun)</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setPassengers({
                      ...passengers,
                      infants: Math.max(0, passengers.infants - 1),
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded-full"
                >
                  -
                </button>
                <span className="mx-2">{passengers.infants}</span>
                <button
                  onClick={() =>
                    setPassengers({
                      ...passengers,
                      infants: passengers.infants + 1,
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}
        {type === "city" && (
          <>
            <h2 className="text-xl font-bold mb-4">Pilih Kota atau Negara</h2>
            <input
              type="text"
              className="p-2 border rounded w-full mb-4"
              placeholder="Cari kota atau negara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-40 overflow-y-auto">
              {popularDestinations
                .filter((city) =>
                  city.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((city) => (
                  <button
                    key={city}
                    onClick={() => setSearchTerm(city)}
                    className="block w-full text-left p-2 hover:bg-gray-200"
                  >
                    {city}
                  </button>
                ))}
            </div>
          </>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UnifiedModal;
