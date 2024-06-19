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
  try {
    const response = await axios.post(
      "https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/register",
      data
    );

    const { token } = response.data.data;

    if (response.status === 201) {
      toast.success("Account registration successful.");
      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(setLogin("login"));
      setTimeout(() => {
        navigate("/");
      }, 1500);
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
  console.log("fetchUser - token:", token); // Get token from state
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/users/profile",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  };

  try {
    const response = await axios.request(config);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }
    const user = response.data;
    dispatch(setUser(user)); // Assuming setUser is an action to update user in state
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

export const userProfileRequest = "update Profile Request";
export const userProfileSuccess = "update Profile Success";
export const userProfileFail = "update Profile Fail";

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: userProfileRequest });

  const state = getState();
  console.log("Current state:", state);

  const token = state.auth.token;

  // Log token for debugging purposes
  console.log("updateUserProfile - token:", token);

  if (!token) {
    const errorMessage = "No token found, user might not be authenticated";
    console.error(errorMessage);
    toast.error(errorMessage);
    dispatch({
      type: userProfileFail,
      payload: errorMessage,
    });
    return;
  }

  try {
    const response = await axios.put(
      "https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/users/profile",
      user,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update user profile");
    }

    dispatch({
      type: userProfileSuccess,
      payload: response.data,
    });

    return true;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    console.error("Error updating user profile:", errorMessage);
    dispatch({
      type: userProfileFail,
      payload: errorMessage,
    });

    toast.error(errorMessage);
    throw error;
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

// export const googleLogin =
//   (credentialResponse, navigate) => async (dispatch) => {
//     const token = credentialResponse.credential;
//     dispatch(setToken(token));
//     dispatch(setIsLoggedIn(true));
//     dispatch(setLogin("google"));
//     toast.success("Login successful.");
//     setTimeout(() => {
//       navigate("/", {
//         state: { token: credentialResponse.credential },
//       });
//     }, 1500);
//   };

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
        "https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/users/profile",
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

// export const googleLogin = (credentialResponse, navigate) => async (dispatch) => {
//   const token = credentialResponse.credential;

//   const config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/google',
//     headers: {
//       'accept': '*/*'
//     }
//   };

//   try {
//     const response = await axios.request(config);
//     console.log(JSON.stringify(response.data));

//     dispatch(setToken(token));
//     dispatch(setIsLoggedIn(true));
//     dispatch(setLogin("google"));
//     toast.success("Login successful.");

//     setTimeout(() => {
//       navigate("/", {
//         state: { token: credentialResponse.credential },
//       });
//     }, 1500);
//   } catch (error) {
//     console.error("Error during Google login:", error);
//     toast.error("Login failed. Please try again.");
//   }
// };

// export const getUser = () => async (dispatch, getState) => {
//   const loginType = getState().auth.login;
//   const token = getState().auth.token;

//   if (loginType === "google") {
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken);
//     dispatch(setUser(decodedToken));
//   } else {
//     const config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: 'https://web-app-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/users/profile',
//       headers: {
//         'accept': 'application/json'
//       }
//     };

//     try {
//       const response = await axios.request(config);
//       console.log(JSON.stringify(response.data));
//       dispatch(setUser(response.data.data));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// };

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
