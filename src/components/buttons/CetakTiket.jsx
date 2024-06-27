import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const CetakTiket = ({ flightDetail, bookingDetail }) => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button
            className={`text-white font-medium text-sm py-2.5 px-10 rounded-full w-full mt-4 ${
              flightDetail.status === "UNPAID"
                ? "bg-secondary hover:bg-darksecondary"
                : "bg-primary hover:bg-darkprimary"
            }`}
          >
            {flightDetail.status === "UNPAID" ? "Lanjut Bayar" : "Cetak Tiket"}
          </button>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <TicketContent
          ref={componentRef}
          flightDetail={flightDetail}
          bookingDetail={bookingDetail}
        />
      </div>
    </div>
  );
};

const TicketContent = React.forwardRef(
  ({ flightDetail, bookingDetail }, ref) => (
    <div ref={ref} className="p-4">
      <h1 className="font-bold text-xl my-2">
        {flightDetail.departure_city} → {flightDetail.arrival_city}
      </h1>
      <p className="text-sm">Booking Code: {flightDetail.booking_code}</p>
      <p className="text-sm">Departure: {flightDetail.departure_time}</p>
      <p className="text-sm">Arrival: {flightDetail.arrival_time}</p>
      <p className="text-sm">Date: {flightDetail.date}</p>
      <p className="text-sm">Tax: {bookingDetail.price_detail.tax}</p>
      <p className="text-sm">
        Total Price: {bookingDetail.price_detail.total_price}
      </p>
    </div>
  )
);

export default CetakTiket;
