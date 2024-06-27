import axios from "axios";
import { toast } from "react-toastify";
import { setNotifByFilter, setNotifications } from "../reducers/notifReducers";

const url = import.meta.env.VITE_BASE_URL;

export const getNotifications = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    const response = await axios.get(
      `${url}/notifications?page=1&limit=10`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setNotifications(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};

export const getNotifByFilter = (filterType) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const type = filterType === "all" ? "" : filterType.toLowerCase();

  try {
    const response = await axios.get(
      `${url}/notifications?page=1&limit=10&type=${type}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("notif by filter", response.data.data);

    dispatch(setNotifByFilter(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};
