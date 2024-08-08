import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import idImg from "../../assets/images/id-card.png";
import phoneImg from "../../assets/images/24-hours.png";
import calenderImg from "../../assets/images/calendar.png";
import locationImg from "../../assets/images/location.png";
import cityImg from "../../assets/images/cityscape.png";
import passwordImg from "../../assets/images/password.png";
import PasswordInput from "../PasswordInput/PasswordInput";
import eye from "../../assets/images/eyeU.png";
import hidden from "../../assets/images/hiddenU.png";

export default function ProfileUpdateForm({ handleFormData, formData }) {
  const currentUser = useSelector(getCurrentUser);
  const [showPassword, setShowPassword] = useState(false);
  console.log(formData);

  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" w-[90%] xl:w-[65%] lg:w-[55%] md:w-[80%] cursive xl:max-h-full text-[#adbbda] flex flex-col ">
      <div className="text-2xl text-first">Update Profile</div>
      <div className="divider divider-secondary"></div>

      <form className="flex flex-col gap-3 xl:overflow-y-auto xl:no-scrollbar max-h-[61%]">
        <div className="flex flex-col  xl:flex-row gap-2">
          <div className="w-full xl:w-[50%]">
            <div className="mb-3 text-sm text-second">First Name</div>
            <label className="input input-bordered flex items-center gap-2 rounded-lg">
              <img alt="id card" src={idImg} className="w-4" />
              <input
                type="text"
                id="firstName"
                className="grow"
                placeholder="First Name"
                defaultValue={formData.firstName || currentUser.firstName}
                onChange={handleFormData}
              />
            </label>
          </div>
          <div className="w-full xl:w-[50%]">
            <div className="mb-3 text-sm text-second">Last Name</div>
            <label className="input input-bordered flex items-center gap-2 rounded-lg">
              <img alt="id card" src={idImg} className="w-4" />
              <input
                type="text"
                id="lastName"
                className="grow"
                placeholder="Last Name"
                defaultValue={formData.lastName || currentUser.lastName}
                onChange={handleFormData}
              />
            </label>
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm text-second">Email</div>
          <label className="input input-bordered flex items-center gap-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              id="email"
              placeholder="Email"
              defaultValue={formData.email || currentUser.email}
              onChange={handleFormData}
            />
          </label>
        </div>

        <div>
          <div className="mb-3 text-sm text-second">Password</div>
          <label className="input input-bordered flex items-center gap-2 rounded-lg relative">
            <img alt="id card" src={passwordImg} className="w-4" />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              id="password"
              placeholder="Password"
              defaultValue={formData.password || currentUser.password}
              onChange={handleFormData}
            />
            <img
              alt="mail"
              src={showPassword ? hidden : eye}
              className=" absolute w-5 right-2 top-3 cursor-pointer"
              onClick={handlePasswordClick}
            />
          </label>
        </div>

        <div className="flex flex-col  xl:flex-row gap-2">
          <div className="w-full xl:w-[50%]">
            <div className="mb-3 text-sm text-second">Phone Number</div>
            <label className="input input-bordered flex items-center gap-2 rounded-lg">
              <img alt="id card" src={phoneImg} className="w-4" />
              <input
                type="number"
                id="phoneNumber"
                className="grow"
                placeholder="Phone Number"
                defaultValue={formData.phoneNumber || currentUser.phoneNumber}
                onChange={handleFormData}
              />
            </label>
          </div>
          <div className="w-full xl:w-[50%]">
            <div className="mb-3 text-sm text-second">Date of birth</div>
            <label className="input input-bordered flex items-center gap-2 rounded-lg">
              <img alt="id card" src={calenderImg} className="w-4" />
              <input
                type="date"
                id="dob"
                className="grow"
                placeholder="Dob"
                defaultValue={formData.dob || currentUser.dob}
                onChange={handleFormData}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col  xl:flex-row gap-2">
          <div className="w-full xl:w-[50%]">
            <div className="mb-3 text-sm text-second">City</div>
            <label className="input input-bordered flex items-center gap-2 rounded-lg">
              <img alt="id card" src={cityImg} className="w-4" />
              <input
                type="text"
                id="city"
                className="grow"
                placeholder="City"
                defaultValue={formData.city || currentUser.city}
                onChange={handleFormData}
              />
            </label>
          </div>
          <div className="w-full xl:w-[50%]">
            <div className="mb-3 text-sm text-second">Address</div>
            <label className="input input-bordered flex items-center gap-2 rounded-lg">
              <img alt="id card" src={locationImg} className="w-4" />
              <input
                type="text"
                id="address"
                className="grow"
                placeholder="Address"
                defaultValue={formData.address || currentUser.address}
                onChange={handleFormData}
              />
            </label>
          </div>
        </div>
      </form>
      <div className="divider divider-secondary"></div>

      <div className="flex justify-end gap-4">
        <button className="btn btn-outline btn-error btn-sm rounded-lg">
          Cancel
        </button>
        <button className="btn btn-outline btn-success btn-sm rounded-lg">
          Update
        </button>
      </div>
    </div>
  );
}
