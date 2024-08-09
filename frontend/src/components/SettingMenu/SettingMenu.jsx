import React, { useState } from "react";
import styles from "./SettingMenu.module.css";
import updateImg from "../../assets/images/updated.png";
import editImg from "../../assets/images/edit.png";
import deleteImg from "../../assets/images/delete.png";
import cancelImg from "../../assets/images/cancel.png";
import { useDispatch } from "react-redux";
import { settingMenuActions } from "../../redux/slices/settingMenu.slice";
import ConfirmationModel from "../ConfirmationModel/ConfirmationModel";

export default function SettingMenu({ setEdit }) {
  const dispatch = useDispatch();
  const [showConfirmationModel, setShowConfirmationModel] = useState(false);

  return (
    <ul
      className={`menu first-color shadow-inner shadow-black ${styles.settingMenuContainer}`}
    >
      <li onClick={() => setEdit(true)} className=" z-10">
        <a className="tooltip tooltip-right" data-tip="Edit Profile">
          <img alt="edit" src={editImg} className="w-5 h-5 " />
        </a>
      </li>
      <li className=" z-10" onClick={() => setShowConfirmationModel(true)}>
        <a className="tooltip tooltip-right z-[999]" data-tip="Delete Account">
          <img alt="edit" src={deleteImg} className="w-5 h-5 " />
        </a>
      </li>
      {showConfirmationModel && (
        <ConfirmationModel
          setShowConfirmationModel={setShowConfirmationModel}
          confirmationMessage="Are you sure want to delete your account?"
        />
      )}
      <li
        onClick={() => dispatch(settingMenuActions.hideMenu())}
        className=" z-10"
      >
        <a className="tooltip tooltip-right" data-tip="Close Menu">
          <img alt="edit" src={cancelImg} className="w-5 h-5 " />
        </a>
      </li>
    </ul>
  );
}
