import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  cityKeyword: "",
  citySearchResults: [],
  flightKeyword: [],
  flightSearchResults: []
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
    setFlightSearchResults: (state, action) => {
      state.flightSearchResults = action.payload;
    },
  },
});

export const { setCities, setCityKeyword, setCitySearchResult, setFlightKeyword, setFlightSearchResults } =
  searchFlightSlicer.actions;

export default searchFlightSlicer.reducer;
