import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlicer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setBooking } = bookingSlicer.actions;

export default bookingSlicer.reducer;
