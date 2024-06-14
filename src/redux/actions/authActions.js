import axios from "axios";
import { toast } from "react-toastify";
import { setIsLoggedIn, setLogin, setToken, setUser } from "../reducers/authReducers";

export const login = (data, navigate, setMessage) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.data.token;

    console.log(response.data.data.token);

    if (response.status === 200) {
      toast.success("Login successful");
      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(setLogin("login"));
      dispatch(setUser(response.data.data.user))
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setMessage(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));
    dispatch(setLogin(null));

    if (navigate) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    toast.success("Berhasil log out.");
  } catch (error) {
    toast.error(error?.message);
  }
};
