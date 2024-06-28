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
import { data } from "autoprefixer";
import { Navigate } from "react-router-dom";
import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

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

export const register =
  (data, navigate, setMessage) => async (dispatch, getState) => {
    console.log("data", data);
    const { fullName, email, phoneNumber, password } = data;
    console.log("email", email);
    try {
      const response = await axios.post(
        "https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/register",
        data
      );

      const token = response.data.data;

      if (response.status === 200) {
        toast.success("Account registration successful.");
        localStorage.setItem("userEmail", email); // Simpan email ke localStorage
        dispatch(setToken(token));
        dispatch(setUser(response.data.data.user));
        // const email = getState().auth.user.email;
        navigate("/verifikasi-email");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response.data.message);
        return;
      }
      console.error(error.message);
    }
  };

export const fetchUser = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("fetchUser - token:", token);
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



export const googleLogin = async (accessToken, navigate, dispatch) => {
  // console.log("token ", accessToken);
  try {
    let data = JSON.stringify({
      access_token: accessToken,
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/google`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const token = response.data.data;
    console.log("response.token ", token);
    console.log("response.status ", response.status);
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

// export const googleLogin =
//   (credentialResponse, navigate) => async (dispatch) => {
//     const token = credentialResponse.credential;
//     dispatch(setToken(token));
//     dispatch(setIsLoggedIn(true));
//     dispatch(setLogin("google"));
//     const decodedToken = jwtDecode(token);
//     console.log("user", decodedToken);
//     dispatch(setUser(decodedToken));
//     toast.success("Berhasil login.");
//     setTimeout(() => {
//       navigate("/", {
//         state: { token: credentialResponse.credential },
//       });
//     }, 1500);
//   };

// export const getUser = () => async (dispatch, getState) => {
//   const loginType = getState().auth.login;
//   const token = getState().auth.token;

//   if (loginType === "google") {
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken);
//     dispatch(setUser(decodedToken));
//   } else {
//     try {
//       const response = await axios.get(`${url}/auth/users/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       dispatch(setUser(response.data.data));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// };

export const getUser = () => async (dispatch, getState) => {
  const loginType = getState().auth.login;
  const token = getState().auth.token;

  if (loginType === "google") {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    dispatch(setUser(decodedToken));
  } else {
    try {
      const response = await axios.get(
        "https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

export const forgotPassword = (email, navigate) => async (dispatch) => {
  // const { email } = getState().auth.user.email;
  // const data = { email };
  console.log("forgotPassword - email:", email);

  try {
    console.log("forgotPassword - about to send request");

    const response = await axios.post(
      "https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/forgot-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data", email);
    console.log("response.status", response.status);

    console.log("forgotPassword - response status:", response.status);

    if (response.status === 200) {
      console.log("forgotPassword - response data:", response.data);
      toast.success("Reset link sent to your email");
      // dispatch(setUser(response.data.data.user));
      navigate("/reset-password");
      // dispatch(forgotPasswordSuccess("Reset link sent to your email"));
    } else if (response.status === 400) {
      console.error("forgotPassword - bad request");
      toast.error("Bad request");
      // dispatch(forgotPasswordFailure("Bad request"));
    } else {
      throw new Error("Failed to send reset link");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error);
    } else {
      console.error("Error:", error.message);
    }
    toast.error("Error sending reset link");
    // dispatch(forgotPasswordFailure("Error sending reset link"));
  }
};

// Action creators for reset password
export const resetPassword = (password, token) => async (dispatch) => {
  console.log("Dispatching RESET_PASSWORD_REQUEST action");
  // dispatch({ type: "RESET_PASSWORD_REQUEST" });

  try {
    console.log("Sending request to reset password...");

    const response = await axios.post(
      `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/reset-password?token=${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response received:", response);

    if (response.status !== 200) {
      console.error("Failed to reset password, status:", response.status);
      throw new Error("Failed to reset password");
    }

    console.log("Password reset successful, response data:", response.data);
    toast.success("Password reset successful");
    // dispatch(resetPasswordSuccess(response.data)); // Dispatch success action with data
  } catch (error) {
    console.error("Error occurred during password reset:", error.message);
    toast.error("Error resetting password");
    // dispatch(resetPasswordFailure(error.message)); // Dispatch failure action with error message
  }
};

export const verifyEmail = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/verify-otp",
      data
    );

    if (response.status === 200) {
      toast.success("Berhasil verifikasi email.");
      dispatch(setIsLoggedIn(true));
      dispatch(setLogin("login"));
      dispatch(setUser(response.data.data.user));
      setTimeout(() => {
        navigate("/");
      }, 1500);
      localStorage.removeItem("userEmail");
      // navigate("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error);
    } else {
      console.error("Error:", error.message);
    }
  }
};

export const resendOtp = (email) => async (dispatch) => {
  console.log("email", email);
  try {
    const response = await axios.post(
      "https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/resend-otp",
      { email: email }
    );
    console.log("response.status", response.status);

    if (response.status === 200) {
      toast.success("OTP has been resent.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error);
    } else {
      console.error("Error:", error.message);
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
