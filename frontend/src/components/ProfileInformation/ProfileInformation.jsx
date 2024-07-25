import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import SettingsMenu from "../SettingsMenu/SettingsMenu";

export default function ProfileInformation() {
  const currentUser = useSelector(getCurrentUser);
  const [formData, setFormData] = useState({
    email: currentUser.email,
    dob: "1999-12-19",
    phoneNumber: 8259990668,
    address: "Agartala, Tripura India",
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(formData);
  return (
    <div className="absolute bottom-[-15%] w-[90%] z-[999] rounded-3xl drop-shadow-2xl bg-slate-900 p-4 flex items-center justify-center gap-3 h-[30vh]">
      <SettingsMenu
        showUpdateButton={showUpdateButton}
        setShowUpdateButton={setShowUpdateButton}
      />
      <div className="relative w-[12%] h-[90%] flex items-center justify-center rounded-2xl mr-3 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="w-[90%] h-[90%] rounded-2xl">
          <img
            alt="profile"
            src={currentUser.avatar}
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>
      <div className="border-r border-gray-300 w-[20%] ">
        <div className=" text-xl font-bold">Sanskar Gupta</div>
        <div className=" text-sm text-gray-400">Engineer</div>
        <div className=" text-xs text-gray-400">Mumbai</div>
      </div>
      <form className=" w-[55%] flex flex-wrap justify-around items-center p-3 text-gray-500  h-[90%]">
        <div className="mb-3  w-[30%] flex items-start justify-center flex-col">
          <div className=" text-[0.5rem] uppercase font-semibold">Email</div>
          <input
            className={`text-[0.6rem] text-gray-400 mt-1 ${
              showUpdateButton
                ? "outline outline-1 outline-slate-600"
                : "outline-none"
            } bg-transparent mr-2 w-full`}
            id="email"
            type="email"
            value={formData.email}
            disabled={!showUpdateButton}
            onChange={handleFormData}
          />
        </div>
        <div className="mb-3   flex items-start justify-center flex-col">
          <div className=" text-[0.5rem] uppercase font-semibold">DOB</div>
          <input
            className={`text-[0.6rem] text-gray-400 mt-1 ${
              showUpdateButton
                ? "outline outline-1 outline-slate-600"
                : "outline-none"
            } bg-transparent mr-2 `}
            id="dob"
            type="date"
            value={formData.dob}
            disabled={!showUpdateButton}
            onChange={handleFormData}
          />
        </div>
        <div className="mb-3   flex items-start justify-center flex-col">
          <div className=" text-[0.5rem] uppercase font-semibold">
            Phone Number
          </div>
          <input
            className={`text-[0.6rem] text-gray-400 mt-1 ${
              showUpdateButton
                ? "outline outline-1 outline-slate-600"
                : "outline-none"
            } bg-transparent mr-2 `}
            id="phoneNumber"
            type="number"
            value={formData.phoneNumber}
            disabled={!showUpdateButton}
            onChange={handleFormData}
          />
        </div>
        <div className="mb-3  flex items-start justify-center flex-col">
          <div className=" text-[0.5rem] uppercase font-semibold">Address</div>
          <input
            className={`text-[0.6rem] text-gray-400 mt-1 ${
              showUpdateButton
                ? "outline outline-1 outline-slate-600"
                : "outline-none"
            } bg-transparent mr-2 `}
            id="address"
            type="text"
            value={formData.address}
            disabled={!showUpdateButton}
            onChange={handleFormData}
          />
        </div>
      </form>
    </div>
  );
}
