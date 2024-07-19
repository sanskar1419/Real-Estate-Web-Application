import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { userActions } from "../../redux/slices/user.slice.js";
import {
  getError,
  getMessage,
  notificationAction,
} from "../../redux/slices/notification.slice.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getError);
  const message = useSelector(getMessage);

  console.log("Message : ", message);
  console.log("Error : ", error);
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
      navigate("/");
    } catch (error) {
      dispatch(userActions.signInError(error.message));
    }
  };
  return (
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
          {loading ? <PropagateLoader color="#050505" /> : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have a account?</p>
        <Link to={"/sign-up"}>
          <span className="text-green-500">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
