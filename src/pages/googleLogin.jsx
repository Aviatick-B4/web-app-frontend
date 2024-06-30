import React from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import { GoogleLogin as Google } from "@react-oauth/google";
import { googleLogin } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";
import { setLogin } from "../redux/reducers/authReducers";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOAuth = async () => {
    window.open(
      `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/google`,
      "_self"
    );
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      try {
        const response = await axios.get(
          `https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/google/callback?code=${code}`
        );
        const user = response.data;

        dispatch(setLogin(user));

        navigate("/");
        toast.success("Login successful!");
      } catch (error) {
        toast.error("Login failed!");
        navigate("/masuk");
      }
    } else {
      toast.error("No code found!");
      navigate("/masuk");
    }
  };

  return (
    <>
      <button
        className="w-full flex justify-center py-2 px-4 rounded-full border border-neutral/50 shadow-md text-sm md:text-base font-medium text-main hover:bg-darkprimary/20 focus:outline-none"
        onClick={handleOAuth}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <p>Masuk dengan Google</p>
        </div>
      </button>
    </>
  );
}

export default GoogleLogin;
