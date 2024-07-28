import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import styles from "./ProfileInformation.module.css";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function ProfileInformation() {
  const profilePictureRef = useRef(null);
  const currentUser = useSelector(getCurrentUser);
  const [formData, setFormData] = useState({});
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  useEffect(() => {
    if (fileUploadError) {
      setTimeout(() => {
        setFileUploadError(false);
      }, 3000);
    }
  }, [fileUploadError]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div
      className={`absolute w-[90%] bg-slate-950 p-4 flex items-center justify-center gap-3 h-[30vh] ${styles.profileContainer} min-h-[35vh] shadow-slate-400 shadow-inner opacity-100 text-white`}
    >
      <SettingsMenu
        showUpdateButton={showUpdateButton}
        setShowUpdateButton={setShowUpdateButton}
      />

      <div className="flex items-center justify-center mr-3 flex-col">
        <input
          type="file"
          accept="image/*"
          ref={profilePictureRef}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className={`${styles.profilePhotoContainer}`}>
          <img
            alt="profile"
            src={formData.avatar || currentUser.avatar}
            className="w-full h-full"
            onClick={() => profilePictureRef.current.click()}
          />
        </div>

        <p className="text-xs self-center text-center mt-3">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
            <span className="text-slate-200">{`Uploading ${fileUploadPercentage}%`}</span>
          ) : fileUploadPercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="border-r border-gray-300 w-[20%] ">
        <div className=" text-xl font-bold">
          {currentUser.firstName === "" ? "First" : currentUser.firstName}{" "}
          {currentUser.lastName === "" ? "First" : currentUser.lastName}
        </div>
        <div className=" text-xs text-gray-400">
          {currentUser.city === "" ? "City" : currentUser.city.split(",")[0]}
        </div>
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
            value={formData.email || currentUser.email || "xyz@gmail.com"}
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
            value={formData.dob || currentUser.dob}
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
            value={
              formData.phoneNumber || currentUser.phoneNumber || 1234567890
            }
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
            value={
              formData.address || currentUser.address || "City, State Country"
            }
            disabled={!showUpdateButton}
            onChange={handleFormData}
          />
        </div>
      </form>
    </div>
  );
}
