import React, { useEffect, useState } from "react";
import { app } from "../../firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  getRedirectResult,
  TwitterAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../redux/slices/user.slice";
import toast from "react-hot-toast";
import OAuthIcon from "../OAuthIcon/OAuthIcon";
import googleIcon from "../../assets/images/google.png";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import { notificationAction } from "../../redux/slices/notification.slice";

const auth = getAuth(app);

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(userActions.signInSuccess(data));
      localStorage.setItem("logged-in-user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      dispatch(notificationAction.setError(error.code));
    }
  };

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/facebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName || result._tokenResponse.displayName,
          email: result.user.email || result._tokenResponse.email,
          photo: result.user.photoURL || result._tokenResponse.photoUrl,
        }),
      });
      const data = await res.json();
      dispatch(userActions.signInSuccess(data));
      localStorage.setItem("logged-in-user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      dispatch(notificationAction.setError(error.code));
    }
  };
  const handleTwitterClick = async () => {
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      dispatch(notificationAction.setError(error.code));
    }
  };

  return (
    <div className=" w-full flex items-center gap-5 justify-center mt-2 mb-3 lg:mb-0">
      <OAuthIcon socialIcon={googleIcon} handleClick={handleGoogleClick} />
      <OAuthIcon socialIcon={facebookIcon} handleClick={handleFacebookClick} />
      <OAuthIcon socialIcon={twitterIcon} handleClick={handleTwitterClick} />
    </div>
  );
}
