import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";

export default function ProfileInformation() {
  const currentUser = useSelector(getCurrentUser);
  return (
    <div className="absolute bottom-[-15%] w-[90%] z-[999] rounded-lg drop-shadow-2xl bg-slate-900 p-4 flex items-center justify-center gap-3">
      <div className="relative w-[150px] min-h-[150px] flex items-center justify-center rounded-2xl mr-3 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="w-[90%] h-[90%] rounded-2xl">
          <img
            alt="profile"
            src={currentUser.avatar}
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>
      <div className="border-r border-gray-300 w-[25%] relative">
        <div className=" text-xl font-bold">Sanskar Gupta</div>
        <div className=" text-sm text-gray-400">Engineer</div>
        <div className=" text-xs text-gray-400">Mumbai</div>
      </div>
      <div className=" w-[45%] flex flex-wrap justify-around items-center pl-6 text-gray-500">
        <div className="mb-3">
          <div className=" text-[0.5rem] uppercase font-semibold">Email</div>
          <div className=" text-[0.6rem] text-gray-400">
            {currentUser.email}
          </div>
        </div>
        <div className="mb-3">
          <div className=" text-[0.5rem] uppercase font-semibold">DOB</div>
          <div className=" text-[0.6rem] text-gray-400">19-Dec-1999</div>
        </div>
        <div className="mb-3">
          <div className=" text-[0.5rem] uppercase font-semibold">
            Phone Number
          </div>
          <div className=" text-[0.6rem] text-gray-400">4785124548</div>
        </div>
        <div className="mb-5">
          <div className=" text-[0.5rem] uppercase font-semibold">Address</div>
          <div className=" text-[0.6rem] text-gray-400">
            Agartala, Tripura India
          </div>
        </div>
      </div>
    </div>
  );
}
