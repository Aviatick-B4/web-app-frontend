import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/reducers/authReducers";
import { toast } from "react-toastify";
import axios from "axios";

function GoogleCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.get(
            `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/google/callback?code=${code}`
          );
          const user = response.data;

          // Dispatch user data to Redux store
          dispatch(setLogin(user));

          // Redirect to the homepage or another route
          navigate("/");
          toast.success("Login successful!");
        } catch (error) {
          toast.error("Login failed!");
          navigate("/login");
        }
      } else {
        toast.error("No code found!");
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  return <div>Loading...</div>;
}

export default GoogleCallback;
