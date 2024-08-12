import React, { useState } from "react";
import styles from "./Property.module.css";
import upArrow from "../../assets/images/up.png";
import downArrow from "../../assets/images/down.png";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../redux/slices/notification.slice";
import { getCurrentUser } from "../../redux/slices/user.slice";
import { set } from "mongoose";

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
  console.log(userProperties);

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
      {/* {showProperty && userProperties.length > 0 && (
        <div className="flex items-center gap-3 justify-center fixed w-full top-0">
          <div className="text-2xl text-first">Hide Properties</div>
          <img alt="arrow" src={upArrow} className="w-5 cursor-pointer" />
        </div>
      )} */}

      {userProperties.length == 0 ? (
        <div></div>
      ) : (
        <div className="flex items-center gap-3 w-full flex-col lg:max-h-full">
          <div className="text-2xl text-first">List of all properties</div>
          <div className="flex gap-2 w-full flex-col lg:max-h-[90%] overflow-y-auto no-scrollbar items-center">
            {userProperties.map((img, index) => (
              <div
                className={`w-[100%] lg:w-[90%] p-3 flex items-center justify-between second-color rounded-2xl shadow-inner shadow-black ${styles.propertyBar} gap-3`}
              >
                <img
                  src={img.imageUrls[0]}
                  className="w-10 h-10 md:w-14 md:h-14  sm:w-12 sm:h-12 rounded-full"
                />
                <div className="w-[40%] hidden xl:block min-[1020px]:hidden sm:block overflow-clip">
                  {img.propertyName}
                </div>
                <button className="btn btn-outline btn-ghost btn-sm rounded-lg text-xs md:text-sm">
                  Delete
                </button>
                <button className="btn btn-outline btn-ghost btn-sm rounded-lg text-xs md:text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
