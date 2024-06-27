import axios from "axios";
import {
  setCountries,
  setDataMidtrans,
  setDataPayment,
} from "../reducers/bookingReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getCountries = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    dispatch(setCountries(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getBookingTicket =
  (formData, tripType) => async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/bookings/new-booking/${tripType}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      const bookingId = response.data.data.id;
      console.log("bookingId", bookingId);
      dispatch(getPayment(bookingId));
      dispatch(setDataPayment(response.data));
      toast.success("Pemesanan Berhasil, Silahkan bayar");
    } catch (error) {
      toast.error("Pemesanan Gagal, Periksa Kembali Data Anda!");
    }
  };

export const getPayment = (bookingId) => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("booking ID", bookingId);
  const method = { paymentMethod: "midtrans" };
  try {
    const response = await axios.post(
      `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/payments/midtrans/token/${bookingId}`,
      method,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response Payment:", response.data);
    dispatch(setDataMidtrans(response.data));
  } catch (error) {
    console.error(error.message);
  }
};
