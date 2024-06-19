import React from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import { GoogleLogin as Google } from "@react-oauth/google";
import { googleLogin } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      dispatch(googleLogin(responseGoogle.access_token)).then(() => {
        navigate("/", { state: { token: responseGoogle.access_token } });
      });
    },
  });

  return (
    <>
      <button variant="primary" onClick={() => loginWithGoogle()}>
        {buttonText}
      </button>
      <Google
        onSuccess={(credentialResponse) => {
          localStorage.setItem("token", credentialResponse.credential);
          localStorage.setItem("login", "google component");
          navigate("/", {
            state: { token: credentialResponse.credential },
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

export default GoogleLogin;
