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
    <div className="w-full relative overflow-y-auto no-scrollbar min-h-[89vh] bg-[url('assets/images/profileBackground.jpg')] shadow-2xl shadow-black-100 bg-cover opacity-50">
      <div className="w-full h-[50vh] relative flex justify-center items-center z-0">
        <ProfileInformation />
      </div>
    </div>
  );
}
