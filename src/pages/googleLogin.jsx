import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setLogin } from "../redux/reducers/authReducers";


function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOAuth = () => {
    window.open(`https://aviatick-backend-git-development-aviaticks-projects.vercel.app/api/v1/auth/google`, "_self");
  };

  return (
    <>
      <button onClick={() => handleOAuth()}>Masuk dengan Google</button>
    </>
  );
}

export default GoogleLogin;