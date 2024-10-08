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

  /* Returning the JSX */
  return (
    <>
      <div className=" w-full h-screen relative shadow-2xl shadow-black-100 flex items-center flex-col sm:min-h-[90vh] lg:flex-row overflow-y-auto no-scrollbar bg-blue-gradient text-[#adbbda]">
        <div className=" bg-[url('./assets/images/background2.jpg')] opacity-25 w-full h-full absolute z-[-10] bg-cover bg-center"></div>
        <div className=" p-8 flex-col lg:w-[50%] lg:p-12">
          <div className=" uppercase font-bold text-sm mb-3 w-full flex justify-start">
            Make your holiday special
          </div>
          <div className=" font-extrabold text-3xl mb-3 w-full ">
            <span className="text-first">Welcome Back</span>, now unleash the
            traveller <span className="text-first">inside you</span>, Enjoy your
            dream vacation
          </div>
          <div className="w-full flex items-center justify-center lg:justify-start">
            <img
              alt="Sign In"
              src={signInImage}
              className=" w-[90%] lg:w-[60%]"
            />
          </div>
          <div className=" text-[0.7rem] sm:text-xs flex justify-center lg:justify-start w-full">
            Get started with one of the best travel destination
          </div>
        </div>
        <div className="w-[90%] lg:w-[50%] sm:w-[70%] lg:p-12 flex justify-center items-center flex-col">
          <h1 className="text-3xl text-center font-semibold mb-5 text-first">
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[80%] justify-center items-center"
            style={{ color: "#adbbda" }}
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
            <PasswordInput handleChange={handleChange} placeholder="Password" />
            <div className="flex gap-2 mt-1 items-end justify-end w-full text-xs">
              <p>Don't have a account?</p>
              <Link to={"/sign-up"}>
                <span className="text-first">Sign Up</span>
              </Link>
            </div>

            <button
              className="text-white p-3 uppercase first-color w-[90%] rounded-full shadow-slate-950 shadow-inner hover:bg-[#c3195d] btn flex items-center justify-center"
              style={{ color: "#adbbda" }}
            >
              {userLoading ? <PropagateLoader color="#050505" /> : "Sign In"}
            </button>
            <OAuth />
          </form>
        </div>
      </div>
    </>
  );
}
