import axios from "axios";
import { toast } from "react-toastify";
import {
  setCities,
  setCitySearchResult,
  setDepartureResults,
  setReturnResults,
} from "../reducers/searchFlightReducers";

export const getCities = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/cities`
    );
    dispatch(setCities(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getCitySearchResults = () => async (dispatch, getState) => {
  const searchTerm = getState().search.cityKeyword;
  try {
    const response = await axios.get(
      `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/cities?search=${searchTerm}`
    );
    dispatch(setCitySearchResult(response.data.data || []));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getFlightSearchResults =
  (flightData, navigate) => async (dispatch, getState) => {
    const tripTypeSaved = getState().search.tripTypeSaved;
    const { from, to, departureDate, returnDate, passengers, flightClass } =
      flightData;
    const { adults, children, infants } = passengers;
    const totalPassenger = adults + children + infants;

    try {
      let url1 = `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/tickets/search?limit=10&page=1&from=${from}&to=${to}&departure=${departureDate}&passengers=${totalPassenger}&seat_class=${flightClass}`;
      const response1 = await axios.get(url1);
      dispatch(setDepartureResults(response1.data.data.tickets || []));

      if (tripTypeSaved === "roundtrip") {
        let url2 = `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/tickets/search?limit=10&page=1&from=${to}&to=${from}&departure=${returnDate}&passengers=${totalPassenger}&seat_class=${flightClass}`;
        const response2 = await axios.get(url2);
        dispatch(setReturnResults(response2.data.data.tickets || []));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error(error.message);
    }
  };
