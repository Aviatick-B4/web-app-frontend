import axios from "axios";
import { toast } from "react-toastify";
import { setPromo } from "../reducers/promoReducers";

export const getPromos = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/tickets?limit=10&page=1&promo=true`
    );
    console.log(response.data.data.tickets);
    dispatch(setPromo(response.data.data.tickets));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};
