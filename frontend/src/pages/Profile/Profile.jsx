import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import ProfileInformation from "../../components/ProfileInformation/ProfileInformation";
import { randomBackgroundPicker } from "../../utils/randomBackground";
import styles from "./Profile.module.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function Profile() {
  const dispatch = useDispatch();
  const profilePictureRef = useRef(null);
  const currentUser = useSelector(getCurrentUser);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(undefined);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(undefined);

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
        setFileUploadError("Error Image upload (image must be less than 2 mb)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUploadSuccess("Image successfully uploaded!");
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (fileUploadError) {
      setTimeout(() => setFileUploadError(undefined), 3000);
    }
    if (fileUploadSuccess) {
      setTimeout(() => setFileUploadSuccess(undefined), 3000);
    }
  }, [fileUploadError, fileUploadSuccess]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(userActions.updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userActions.updateError(data.message));
        return;
      }

      dispatch(userActions.updateSuccess(data));
      localStorage.setItem("logged-in-user", JSON.stringify(data));
    } catch (error) {
      dispatch(userActions.updateError(error.message));
    }
  };

  const handleDeleteUser = () => {};
  const handleListingDelete = () => {};
  const handleShowListings = () => {};
  const handleSignOut = () => {};

  return (
    <div
      className={`w-full min-h-[88vh] lg:min-h-[88vh] h-[88vh] relative shadow-2xl shadow-black-100 flex justify-center sm:min-h-[90vh] lg:flex-row bg-blue-gradient text-[#adbbda]`}
    >
      <div className=" bg-[url('./assets/images/background5.jpg')] opacity-25 w-full h-full absolute z-[-10] bg-cover bg-center"></div>
      <div className="w-[100%] flex flex-wrap justify-around gap-5 overflow-y-auto no-scrollbar p-7">
        <div className="w-[90%] md:w-[30%] sm:w-[80%] rounded-2xl third-color shadow-inner shadow-black flex flex-col justify-center items-center gap-1">
          <input
            type="file"
            accept="image/*"
            gap-1
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
          <p className="text-xs font-bold self-center text-center mt-3 z-30">
            {fileUploadError ? (
              <span className="text-fourth">{fileUploadError}</span>
            ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
              <span className="text-[#adbbda]">{`Uploading ${fileUploadPercentage}%`}</span>
            ) : fileUploadPercentage === 100 && fileUploadSuccess ? (
              <span className="text-green-300">{fileUploadSuccess}</span>
            ) : (
              ""
            )}
          </p>
          <div className=" font-semibold text-2xl cursive">
            {currentUser.firstName || "Guest"} {currentUser.lastName || "User"}
          </div>
          <div className=" font-semibold text-xs cursive">
            <div> {currentUser.email}</div>
          </div>
        </div>
        <div className="w-[90%] md:w-[65%] sm:w-[80%] rounded-lg third-color shadow-inner shadow-black bg-blend-darken"></div>
        <div className="w-[90%] md:w-[90%] sm:w-[80%] rounded-lg "></div>
      </div>
      <div />
    </div>
  );
}
