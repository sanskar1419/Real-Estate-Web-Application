import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import OAuth from "../../components/OAuth/OAuth";
import signUpImage from "../../assets/images/signUpPageImage.png";
import mail from "../../assets/images/mail.png";
import userNameImage from "../../assets/images/id-card.png";
import passwordImage from "../../assets/images/pasword.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLoadingState,
  userActions,
} from "../../redux/slices/user.slice";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const userLoading = useSelector(getUserLoadingState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const message = useSelector(getMessage);

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
      const res = await fetch("/api/auth/sign-up", {
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
      navigate("/sign-in");
    } catch (error) {
      dispatch(userActions.signInError(error.message));
    }
  };

  return (
    <div className=" w-full min-h-[85vh] h-[85vh] relative shadow-2xl shadow-black-100 flex items-center flex-col sm:min-h-[90vh] lg:flex-row overflow-y-auto no-scrollbar">
      <div className=" bg-[url('assets/images/background.jpg')] opacity-20 bg-cover w-full min-h-full absolute z-[-10]"></div>
      <div className=" p-8 flex-col lg:w-[50%] lg:p-12">
        <div className=" uppercase font-bold text-sm mb-3 w-full flex justify-start">
          Make your holiday special
        </div>
        <div className=" font-extrabold text-3xl mb-3 w-full ">
          Unleash the traveller{" "}
          <span className=" text-green-500">inside you</span>, Enjoy your dream
          vacation
        </div>
        <div className="w-full flex items-center justify-center lg:justify-start">
          <img
            alt="Sign Up"
            src={signUpImage}
            className=" w-[90%] sm:w-[60%]"
          />
        </div>
        <div className=" text-[0.7rem] sm:text-xs flex justify-center lg:justify-start w-full">
          Get started with one of the best travel destination
        </div>
      </div>
      <div className="w-[90%] lg:w-[50%] sm:w-[70%] lg:p-8 flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-semibold mb-5">
          Sign Up Here
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-[80%] justify-center items-center"
        >
          <div className=" w-full">
            <label className=" relative">
              <input
                type="text"
                placeholder="Username"
                className="p-2 rounded-lg w-full placeholder: italic bg-slate-950 border border-gray-700 pr-8"
                id="username"
                required
                onChange={handleChange}
              />
              <img
                alt="username"
                src={userNameImage}
                className=" absolute w-5 right-2 top-0"
              />
            </label>
          </div>
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
          <div className=" w-full">
            <label className=" relative">
              <input
                type="text"
                placeholder="Password"
                className="p-2 rounded-lg w-full placeholder: italic bg-slate-950 border border-gray-700 pr-8"
                id="password"
                required
                onChange={handleChange}
              />
              <img
                alt="password"
                src={passwordImage}
                className=" absolute w-5 right-2 top-0"
              />
            </label>
          </div>
          <PasswordInput
            handleChange={handleChange}
            placeholder="Confirm Password"
          />
          <div className="flex gap-2 mt-1 items-end justify-end w-full text-xs">
            <p>Already have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-green-500">Sign In</span>
            </Link>
          </div>

          <button className="text-white p-2 uppercase hover:opacity-95 disabled:opacity-80 btn btn-success bg-green-600 w-[90%] rounded-full shadow-green-950 shadow-inner">
            {userLoading ? <PropagateLoader color="#050505" /> : "Sign Up"}
          </button>
          <OAuth />
        </form>
      </div>
    </div>
  );
}
