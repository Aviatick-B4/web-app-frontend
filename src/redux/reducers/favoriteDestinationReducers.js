import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favDestinations: [],
};

const favDestinationSlicer = createSlice({
  name: "favDestination",
  initialState,
  reducers: {
    setFavDestinations: (state, action) => {
      state.favDestinations = action.payload;
    },
  },
});

export const { setFavDestinations } = favDestinationSlicer.actions;

export default favDestinationSlicer.reducer;
