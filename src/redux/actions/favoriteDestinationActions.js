import axios from "axios";
import { toast } from "react-toastify";
import { setFavDestinations, setFavDestinationsByFilter } from "../reducers/favoriteDestinationReducers";

export const getFavDestinations = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/flights/favorite?page=1&limit=10`
    );

    console.log("fav", response.data.data);
    dispatch(setFavDestinations(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getFavDestinationsByFilter = (continent) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/flights/favorite?arrivalContinent=${continent}&page=1&limit=5`
    );

    console.log("continent", response.data.data);
    dispatch(setFavDestinationsByFilter(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};
