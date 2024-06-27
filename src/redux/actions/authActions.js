import axios from "axios";
import { toast } from "react-toastify";
import {
  setIsLoggedIn,
  setLogin,
  setToken,
  setUser,
} from "../reducers/authReducers";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";

const url = import.meta.env.VITE_BASE_URL;

export const login = (data, navigate, setMessage) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.data.token;

    console.log(response.data.data.token);

    if (response.status === 200) {
      toast.success("Login successful");
      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(setLogin("login"));
      dispatch(setUser(response.data.data.user));
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

export const register = (data, navigate, setMessage) => async (dispatch) => {
  console.log("data", data);
  // try {
  //   const response = await axios.post(
  //     "${url}/auth/register",
  //     data
  //   );

  //   const { token } = response.data.data;

  //   if (response.status === 200) {
  //     toast.success("Account registration successful.");
  //     dispatch(setToken(token));
  //     dispatch(setIsLoggedIn(true));
  //     dispatch(setLogin("login"));
  //     setTimeout(() => {
  //       navigate("/");

  //     }, 1500);
  //   }
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     setMessage(error.response.data.message);
  //     return;
  //   }
  //   toast.error(error.message);
  // }
};

export const fetchUser = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("fetchUser - token:", token); // Get token from state
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${url}/auth/users/profile`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }
    const user = response.data;
    dispatch(setUser(user));
    return user;
  } catch (error) {
    toast.error(error.message);
    throw error; // Re-throw the error for the calling function to handle
  }
};

export const loadUserProfile = (setUser) => async (dispatch) => {
  try {
    // Call fetchUser to get user data
    const user = await dispatch(fetchUser());
    if (user) {
      setUser(user);
    } else {
      console.log("Failed to fetch user data");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteAccount = (navigate) => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    const response = await axios.delete(`${url}/auth/users`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Akun berhasil dihapus");
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
      dispatch(setUser(null));
      dispatch(setLogin(null));
      setTimeout(() => {
        navigate("/masuk");
      }, 1500);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response.data.message);
      return;
    }
    console.error(error.message);
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  const state = getState();

  const token = state.auth.token;

  if (!token) {
    const errorMessage = "No token found, user might not be authenticated";
    console.error(errorMessage);
    return;
  }

  try {
    const response = await axios.put(`${url}/auth/users/profile`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(setUser(user));
      toast.success("Berhasil memperbarui profil");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export const googleLogin = async (accessToken, navigate, dispatch) => {
  console.log("token ", accessToken);
  try {
    let data = JSON.stringify({
      access_token: accessToken,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;
    console.log("response.data ", response.data);
    localStorage.setItem("token", token);
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(setLogin("google"));
    toast.success("Login successful.");
    setTimeout(() => {
      navigate("/", { state: { token: token } });
    }, 1500);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response.data.message);
      return;
    }
  }
};

export const getUser = () => async (dispatch, getState) => {
  const loginType = getState().auth.login;
  const token = getState().auth.token;

  if (loginType === "google") {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    dispatch(setUser(decodedToken));
  } else {
    try {
      const response = await axios.get(`${url}/auth/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

export const changePassword = (data) => async (dispatch, getState) => {
  const token = getState().auth.token;

  console.log(data);

  try {
    const response = await axios.post(`${url}/auth/change-password`, data, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Berhasil mengubah password");
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return false;
    }
    toast.error(error.message);
    return false;
  }
};

export const noAccessToken = (navigate) => async (dispatch, getState) => {
  const loginType = getState().auth.login;
  const token = getState().auth.token;
  if (loginType) {
    if (loginType === "google") {
      const decoded = jwtDecode(token);
      if (decoded?.exp < new Date() / 1000) {
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        dispatch(setLogin(null));
        toast.error("Token kadaluarsa.");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      }
    } else {
      try {
        await axios.get(
          `${url}/auth/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        dispatch(setToken(null));
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        dispatch(setLogin(null));
        toast.error("Token kadaluarsa.");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
        toast.error(error);
      }
    }
  }
};

export const checkToken = (navigate) => (dispatch, getState) => {
  const token = getState().auth.token;

  if (!token) {
    toast.error("Ups.. tidak dapat mengakses halaman, silakan masuk terlebih dahulu.");
    navigate("/masuk");
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
    console.error(error?.message);
  }
};
