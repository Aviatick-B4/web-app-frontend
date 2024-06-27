import axios from "axios";
import { toast } from "react-toastify";
import { setPromo } from "../reducers/promoReducers";

export const getPromos = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/promos`
    );
    dispatch(setPromo(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
      return;
    }
    console.error(error.message);
  }
};
