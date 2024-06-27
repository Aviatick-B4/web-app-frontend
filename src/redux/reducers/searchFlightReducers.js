import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  cityKeyword: "",
  citySearchResults: [],
  flightKeyword: [],
  departureResults: [],
  returnResults: [],
  tripTypeSaved: null,
};

const searchFlightSlicer = createSlice({
  name: "searchFlight",
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setCityKeyword: (state, action) => {
      state.cityKeyword = action.payload;
    },
    setCitySearchResult: (state, action) => {
      state.citySearchResults = action.payload;
    },
    setFlightKeyword: (state, action) => {
      state.flightKeyword = action.payload;
    },
    setDepartureResults: (state, action) => {
      state.departureResults = action.payload;
    },
    setReturnResults: (state, action) => {
      state.returnResults = action.payload;
    },
    setTripTypeSaved: (state, action) => {
      state.tripTypeSaved = action.payload;
    },
  },
});

export const {
  setCities,
  setCityKeyword,
  setCitySearchResult,
  setFlightKeyword,
  setDepartureResults,
  setReturnResults,
  setTripTypeSaved,
} = searchFlightSlicer.actions;

export default searchFlightSlicer.reducer;
