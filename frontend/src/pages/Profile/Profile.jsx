import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import ProfileInformation from "../../components/ProfileInformation/ProfileInformation";

export default function Profile() {
  const currentUser = useSelector(getCurrentUser);
  const handleChange = () => {};
  const handleSubmit = () => {};
  const handleDeleteUser = () => {};
  const handleListingDelete = () => {};
  const handleShowListings = () => {};
  const handleSignOut = () => {};

  return (
    <div className="w-full relative shadow-2xl shadow-black-100 overflow-y-auto no-scrollbar min-h-[85vh]">
      <div className=" bg-[url('assets/images/misurina-sunset.jpg')] bg-cover w-full h-[45vh] opacity-60 relative flex justify-center z-0">
        <ProfileInformation />
      </div>
      <div className="w-full border border-white mt-[5%]"></div>
    </div>
  );
}
