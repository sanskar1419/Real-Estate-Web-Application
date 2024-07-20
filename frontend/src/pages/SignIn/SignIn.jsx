import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  getUserLoadingState,
  userActions,
} from "../../redux/slices/user.slice.js";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice.js";
import OAuth from "../../components/OAuth/OAuth.jsx";
import signInImage from "../../assets/images/signInPageImage.png";
import mail from "../../assets/images/mail.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const userLoading = useSelector(getUserLoadingState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getError);
  const message = useSelector(getMessage);

  /* Handling Form Data Changes */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (message != null) {
      toast.success(message);
      dispatch(notificationAction.resetMessage());
    }
    if (error != null) {
      toast.error(error);
      dispatch(notificationAction.resetError());
    }
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userActions.signInError(data.message));
        return;
      }
      dispatch(userActions.signInSuccess(data));
      localStorage.setItem("logged-in-user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      dispatch(userActions.signInError(error.message));
    }
  };
  return (
    <div className=" w-full min-h-[85vh] sm:min-h-[90vh] relative shadow-2xl shadow-black-100 flex items-center justify-center">
      <div className=" bg-[url('assets/images/background.jpg')] opacity-20 bg-cover w-full h-full absolute z-[-10]"></div>
      <div className=" w-[50%] p-12">
        <div className=" uppercase font-bold text-sm mb-3 w-full">
          Make your holiday special
        </div>
        <div className=" font-extrabold text-3xl mb-3 w-full">
          Unleash the traveller{" "}
          <span className=" text-green-500">inside you</span>, Enjoy your dream
          vacation
        </div>
        <img alt="Sign In" src={signInImage} className=" w-[60%]" />
        <div className=" text-xs w-full">
          Get started with one of the best travel destination
        </div>
      </div>
      <div className="w-[50%] p-12 flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-semibold mb-5">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-[80%] justify-center items-center"
        >
          <div className=" w-full">
            <label className=" relative">
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-lg w-full placeholder: italic bg-slate-950 border border-gray-700 pr-8"
                id="email"
                required
                onChange={handleChange}
              />
              <img
                alt="mail"
                src={mail}
                className=" absolute w-5 right-2 top-0"
              />
            </label>
          </div>
          <PasswordInput handleChange={handleChange} />
          <div className="flex gap-2 mt-1 items-end justify-end w-full text-xs">
            <p>Don't have a account?</p>
            <Link to={"/sign-up"}>
              <span className="text-green-500">Sign Up</span>
            </Link>
          </div>

          <button className="text-white p-2 uppercase hover:opacity-95 disabled:opacity-80 btn btn-success bg-green-600 w-[90%] rounded-full shadow-green-950 shadow-inner">
            {userLoading ? <PropagateLoader color="#050505" /> : "Sign In"}
          </button>
          <OAuth />
        </form>
      </div>
    </div>
  );
}

/* 
 <div className="p-1 max-w-xs mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg"
            id="email"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            className="border p-2 rounded-lg"
            id="password"
            required
            onChange={handleChange}
          />

          <button className="text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 btn btn-success bg-green-500">
            {userLoading ? <PropagateLoader color="#050505" /> : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have a account?</p>
          <Link to={"/sign-up"}>
            <span className="text-green-500">Sign Up</span>
          </Link>
        </div>
      </div>
*/
