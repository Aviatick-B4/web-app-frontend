import axios from "axios";
import { toast } from "react-toastify";
import { setPromo } from "../reducers/promoReducers";
import { setPromoResult } from "../reducers/searchFlightReducers";

const url = import.meta.env.VITE_BASE_URL;

export const getPromos = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${url}/tickets?limit=10&page=1&promo=true`
    );
    dispatch(setPromo(response.data.data.tickets));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getPromoById = (ticketId) => async (dispatch) => {
  console.log("ticketId", ticketId);
  try {
    const response = await axios.get(
      `${url}/tickets/${ticketId}`
    );
    console.log("by id", response.data.data);
    dispatch(setPromoResult(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};
