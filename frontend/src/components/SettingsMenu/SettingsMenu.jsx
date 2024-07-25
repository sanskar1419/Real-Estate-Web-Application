import React, { useEffect, useRef, useState } from "react";
import updateImg from "../../assets/images/updated.png";
import editImg from "../../assets/images/edit.png";
import deleteImg from "../../assets/images/delete.png";
import settingImg from "../../assets/images/settings.png";
import cancelImg from "../../assets/images/cancel.png";

export default function SettingsMenu({
  showUpdateButton,
  setShowUpdateButton,
}) {
  const menuRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuVisibility = () => {
    setShowMenu(true);
  };

  const handleOutsideClick = (e) => {
    if (menuRef && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleEditClick = () => {
    setShowUpdateButton(true);
  };

  const handleCancelClick = () => {
    setShowUpdateButton(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      {showMenu ? (
        <div
          className="flex items-center justify-center p-2 gap-2 absolute top-0 right-0 cursor-pointer"
          ref={menuRef}
        >
          {showUpdateButton ? (
            <>
              <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center">
                <img alt="edit" src={updateImg} className="w-full h-full" />
              </div>
              <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center cursor-pointer">
                <img
                  alt="edit"
                  src={cancelImg}
                  className="w-full h-full"
                  onClick={handleCancelClick}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center">
                <img
                  alt="edit"
                  src={editImg}
                  className="w-full h-full"
                  onClick={handleEditClick}
                />
              </div>
              <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center cursor-pointer">
                <img alt="edit" src={deleteImg} className="w-full h-full" />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center p-2 gap-2 absolute top-0 right-0">
          <div
            className="w-8 h-8 p-2 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleMenuVisibility}
            on
          >
            <img alt="edit" src={settingImg} className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
}
