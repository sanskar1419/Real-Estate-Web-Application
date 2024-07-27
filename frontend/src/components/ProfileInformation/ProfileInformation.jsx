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
  const [formData, setFormData] = useState({
    email: currentUser.email,
    dob: "1999-12-19",
    phoneNumber: 8259990668,
    address: "Agartala, Tripura India",
    avatar: currentUser.avatar,
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

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
      className={`absolute bottom-[-15%] w-[90%] bg-slate-900 p-4 flex items-center justify-center gap-3 h-[30vh] ${styles.profileContainer} min-h-[35vh]`}
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
            src={formData.avatar}
            className="w-full h-full"
            onClick={() => profilePictureRef.current.click()}
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
