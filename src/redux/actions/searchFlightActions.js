import axios from "axios";
import { toast } from "react-toastify";
import {
  setCities,
  setCitySearchResult,
  setFlightSearchResults,
} from "../reducers/searchFlightReducers";

export const getCities = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/cities`
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
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/cities?search=${searchTerm}`
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
    console.log("data", flightData);

    const { from, to, departureDate, returnDate, passengers, flightClass } =
      flightData;
    const { adults, children, infants } = passengers;
    const totalPassenger = adults + children + infants;

    try {
      let url = `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/tickets/search?limit=10&page=1&from=${from}&to=${to}&departure=${departureDate}&passengers=${totalPassenger}&seat_class=${flightClass}`;

      if (returnDate) {
        url += `&return=${returnDate}`;
      }

      const response = await axios.get(url);
      dispatch(setFlightSearchResults(response.data.data || []));
      // navigate("/hasil-pencarian");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error(error.message);
    }
  };
