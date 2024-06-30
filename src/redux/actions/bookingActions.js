import axios from "axios";
import {
  setCountries,
  setDataMidtrans,
  setDataPayment,
} from "../reducers/bookingReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBookingHistoryDetail } from "./historyActions";

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
  (formData, tripType, navigate, setIsLoading) =>
  async (dispatch, getState) => {
    setIsLoading(true);
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
      setIsLoading(false);
      console.log("Response:", response.data);
      const bookingId = response.data.data.id;
      console.log("bookingId", bookingId);
      dispatch(getPayment(bookingId, navigate, setIsLoading));
      dispatch(setDataPayment(response.data));
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("Pemesanan gagal! Silakan periksa kembali data Anda.");
      } else if (error.response.status == 401) {
        toast.error("Anda belum login!");
        navigate("/login");
      } else if (error.response.status == 403) {
        toast.error(
          "Akses Ditolak! Anda tidak memiliki izin untuk melakukan aksi ini."
        );
        navigate("/");
      } else if (error.response.status == 404) {
        navigate("*");
      } else if (error.response.status == 500) {
        toast.error("Terjadi kesalahan pada server! Silakan coba lagi nanti.");
        navigate("/");
      } else if (error.response.status == 503) {
        toast.error(
          "Layanan tidak tersedia! Server mungkin sedang sibuk. Coba lagi nanti."
        );
        navigate("/");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "Tidak ada respons dari server. Periksa koneksi internet Anda."
        );
        navigate("/");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(`Kesalahan: ${error.message}`);
      }
    }
  };

export const getPayment =
  (bookingId, navigate, setIsLoading) => async (dispatch, getState) => {
    setIsLoading(true);
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
      setIsLoading(false);
      console.log("Response Payment:", response.data);
      dispatch(setDataMidtrans(response.data));
      await dispatch(getBookingHistoryDetail(bookingId, setIsLoading));
      navigate("/pembayaran");
    } catch (error) {
      console.error(error.message);
    }
  };
