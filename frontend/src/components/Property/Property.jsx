import React, { useState } from "react";
import styles from "./Property.module.css";
import upArrow from "../../assets/images/up.png";
import downArrow from "../../assets/images/down.png";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../redux/slices/notification.slice";
import { getCurrentUser } from "../../redux/slices/user.slice";
import { set } from "mongoose";
import { Link } from "react-router-dom";
import noPropertyImg from "../../assets/images/noProperty.png";

export default function Property() {
  const dispatch = useDispatch();
  const [showProperty, setShowProperty] = useState(false);
  const [userProperties, setUserProperties] = useState([]);
  const currentUser = useSelector(getCurrentUser);

  const handleShowListing = async () => {
    try {
      const res = await fetch(`/api/user/properties/${currentUser._id}`);
      const data = await res.json();
      if (data.success == false) {
        dispatch(notificationAction.setError(data.message));
        return;
      }
      setUserProperties([...data]);
      setShowProperty(true);
    } catch (error) {
      dispatch(notificationAction.setError(error.message));
    }
  };

  return (
    <div className="w-[90%] xl:w-[65%] lg:w-[55%] md:w-[80%] cursive lg:max-h-full text-[#adbbda] flex flex-col relative">
      {!showProperty && (
        <div
          className="flex items-center gap-3 justify-center cursor-pointer"
          onClick={handleShowListing}
        >
          <div className="text-2xl text-first">Show Properties</div>
          <img alt="arrow" src={downArrow} className="w-5 cursor-pointer" />
        </div>
      )}

      {showProperty && userProperties.length == 0 && (
        <div className="flex lg:max-h-[95%] place-items-center third-color cursive text-[#adbbda] px-6 py-24 sm:py-32 lg:px-8 rounded-2xl shadow-inner shadow-black items-center justify-center">
          <div className="text-center flex items-center justify-center flex-col">
            <img alt="logo" src={noPropertyImg} className="w-[30%]" />
            {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              No Property Found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-900">
              Sorry, we couldn’t find any property which are added by you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/create-property"
                href="#"
                className="rounded-md bg-slate-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Property
              </Link>
              <p
                className="text-sm font-semibold text-gray-900 cursor-pointer"
                onClick={() => setShowProperty(false)}
              >
                Go Back <span aria-hidden="true">&rarr;</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {showProperty && userProperties.length !== 0 && (
        <div className="flex items-center gap-3 w-full flex-col lg:max-h-full">
          <div className="text-2xl text-first">List of all properties</div>
          <div className="flex gap-2 w-full flex-col lg:max-h-[90%] overflow-y-auto no-scrollbar items-center">
            {userProperties.map((img, index) => (
              <div
                className={`w-[90%] p-3 flex items-center second-color rounded-2xl shadow-inner shadow-black ${styles.propertyBar} gap-3`}
              >
                <img
                  src={img.imageUrls[0]}
                  className="w-10 h-10 md:w-14 md:h-14  sm:w-12 sm:h-12 rounded-full"
                />
                <Link className="w-[70%] sm:block truncate hover:underline">
                  {img.propertyName}
                </Link>
                <button className="btn btn-outline btn-ghost btn-sm rounded-lg text-xs md:text-sm">
                  Delete
                </button>
                <button className="btn btn-outline btn-ghost btn-sm rounded-lg text-xs md:text-sm">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
