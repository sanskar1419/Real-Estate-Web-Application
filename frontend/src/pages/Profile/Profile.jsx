import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import ProfileInformation from "../../components/ProfileInformation/ProfileInformation";
import { randomBackgroundPicker } from "../../utils/randomBackground";

export default function Profile() {
  const currentUser = useSelector(getCurrentUser);
  const handleChange = () => {};
  const handleSubmit = () => {};
  const handleDeleteUser = () => {};
  const handleListingDelete = () => {};
  const handleShowListings = () => {};
  const handleSignOut = () => {};

  return (
    <div
      className={`w-full min-h-[88vh] lg:min-h-[88vh] h-[88vh] relative shadow-2xl shadow-black-100 flex items-center flex-col sm:min-h-[90vh] lg:flex-row overflow-y-auto no-scrollbar bg-blue-gradient text-[#adbbda]`}
    >
      <div className=" bg-[url('./assets/images/background5.jpg')] opacity-25 w-full h-full absolute z-[-10] bg-cover bg-center"></div>
      <div />
    </div>
  );
}
