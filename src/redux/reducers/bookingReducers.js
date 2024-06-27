import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  flight: null,
  countries: null,
  passenger: [],
  detailBooking: null,
  payment: null,
  midtrans: null,
};

const bookingSlicer = createSlice({
  name: "bookingFlight",
  initialState,
  reducers: {
    setFlight: (state, action) => {
      state.flight = action.payload;
    },
    setPassenger: (state, action) => {
      state.passenger = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setBooking: (state, action) => {
      state.bookings = action.payload;
    },
    setDataPayment: (state, action) => {
      state.payment = action.payload;
    },
    setDataMidtrans: (state, action) => {
      state.midtrans = action.payload;
    },
  },
});

export const {
  setFlight,
  setPassenger,
  setCountries,
  setBooking,
  setDetailBooking,
  setDataPayment,
  setDataMidtrans,
} = bookingSlicer.actions;

export default bookingSlicer.reducer;
