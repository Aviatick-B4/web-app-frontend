import axios from "axios";
import { toast } from "react-toastify";

export const getUserBookingHistory = () => async (dispatch, getState) => {
    const id = getState().auth.user.id;
    console.log("id", id);

//   try {
//     const response = await axios.get(
//       `https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/flights/favorite?page=1&limit=10`
//     );
//     console.log(response.data.data);
//     // dispatch(setFavDestinations(response.data.data));
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error(error.message);
//       return;
//     }
//     console.error(error.message);
//   }
};
