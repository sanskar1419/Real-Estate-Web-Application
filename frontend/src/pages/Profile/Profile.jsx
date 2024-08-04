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
    <div className=" w-full min-h-[100vh] h-screen relative shadow-2xl shadow-black-100 flex items-center overflow-y-auto no-scrollbar bg-blue-gradient text-black "></div>
  );
}
