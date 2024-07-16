import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message, { duration: 4000 });
        return;
      }
      setLoading(false);
      toast.success("Signed In Successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        duration: 4000,
      });
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
