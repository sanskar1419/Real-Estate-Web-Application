import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userActions } from "../../redux/slices/user.slice";
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
import SettingMenu from "../../components/SettingMenu/SettingMenu";
import { getSettingMenu } from "../../redux/slices/settingMenu.slice";
import ProfileUpdateForm from "../../components/ProfileUpdateForm/ProfileUpdateForm";

export default function Profile() {
  const dispatch = useDispatch();
  const profilePictureRef = useRef(null);
  const currentUser = useSelector(getCurrentUser);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(undefined);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(undefined);
  const [edit, setEdit] = useState(false);
  const showMenu = useSelector(getSettingMenu);

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
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            setFileUploadSuccess("Image successfully uploaded!");
            setFormData({ ...formData, avatar: downloadURL });
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ avatar: downloadURL }),
            });
            const data = await res.json();
            if (data.success === false) {
              dispatch(userActions.updateError(data.message));
              return;
            }
            dispatch(userActions.updateSuccess(data));
            localStorage.setItem("logged-in-user", JSON.stringify(data));
          })
          .catch((error) => {
            console.log(error);
            dispatch(userActions.updateError(error.message));
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
      <div className="w-[100%] flex flex-wrap  justify-around lg:justify-start gap-5 overflow-y-auto no-scrollbar p-7 flex-row lg:flex-col relative">
        {showMenu && (
          <div className="fixed top-[4.2rem] left-0 z-[999]">
            <SettingMenu setEdit={setEdit} />
          </div>
        )}
        <div className="w-[90%] xl:w-[30%] lg:w-[40%] md:w-[80%] sm:w-[80%]  rounded-2xl third-color shadow-inner shadow-black flex flex-col justify-center items-center gap-1 p-3">
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
        <div className="w-[90%] xl:w-[30%] lg:w-[40%] md:w-[80%] sm:w-[80%] rounded-2xl third-color shadow-inner shadow-black bg-blend-darken flex items-start justify-center cursive flex-wrap p-4">
          <div className="w-[50%] mb-3">
            <div className="text-xs font-semibold">User Name</div>
            <div className="text-sm">{currentUser.username}</div>
          </div>
          <div className="w-[50%] mb-3">
            <div className="text-xs font-semibold">Date Of Birth</div>
            <div className="text-sm">{currentUser.dob || "dd-mm-yy"}</div>
          </div>
          <div className="w-[50%] mb-3">
            <div className="text-xs font-semibold">Mobile Number</div>
            <div className="text-sm mb-4">
              {currentUser.phoneNumber || "1234564789"}
            </div>
          </div>
          <div className="w-[50%] mb-3">
            <div className="text-xs font-semibold">Address</div>
            <div className="text-sm">
              {currentUser.address || "Place, City Country"}
            </div>
          </div>
          <div className="">
            <div className="text-xs font-semibold">City</div>
            <div className="text-sm">{currentUser.city || "Mumbai"}</div>
          </div>
        </div>
        {edit ? (
          <ProfileUpdateForm
            formData={formData}
            handleFormData={handleFormData}
          />
        ) : (
          <div className=" w-[90%] xl:w-[65%] lg:w-[55%] md:w-[80%]  rounded-lg  ">
            Listings
          </div>
        )}
      </div>
      <div />
    </div>
  );
}
