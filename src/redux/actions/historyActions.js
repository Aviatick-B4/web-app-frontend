import axios from "axios";
import { toast } from "react-toastify";
import {
  setBookingHistory,
  setBookingHistoryDetail,
  setHistoryByDate,
  setHistorySearchResults,
} from "../reducers/historyReducers";

export const getUserBookingHistory = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    const response = await axios.get(
      "https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/bookings/booking-history",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("history", response.data.data);

    dispatch(setBookingHistory(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getBookingHistoryDetail =
  (bookingId) => async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await axios.get(
        `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/bookings/booking-history/${bookingId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("detail", response.data.data);

      dispatch(setBookingHistoryDetail(response.data.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return;
      }
      console.error(error.message);
    }
  };

export const getHistorySearchResults = () => async (dispatch, getState) => {
  const searchTerm = getState().history.historyKeyword;
  const token = getState().auth.token;

  try {
    const response = await axios.get(
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/bookings/booking-history?search=${searchTerm}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setHistorySearchResults(response.data.data || []));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getHistoryByDate = () => async (dispatch, getState) => {
  const date = getState().history.date;
  const token = getState().auth.token;

  try {
    const response = await axios.get(
      `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/bookings/booking-history?date=${date}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("dateee", response.data.data);
    dispatch(setHistoryByDate(response.data.data || []));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};
