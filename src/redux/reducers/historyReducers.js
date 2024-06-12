import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingHistory: [],
};

const bookingHistorySlicer = createSlice({
  name: "bookingHistory",
  initialState,
  reducers: {
    setBookingHistory: (state, action) => {
      state.bookingHistory = action.payload;
    },
  },
});

export const { setBookingHistory } = bookingHistorySlicer.actions;

export default bookingHistorySlicer.reducer;
