import React from "react";
import styles from "./SettingMenu.module.css";
import updateImg from "../../assets/images/updated.png";
import editImg from "../../assets/images/edit.png";
import deleteImg from "../../assets/images/delete.png";
import cancelImg from "../../assets/images/cancel.png";

export default function SettingMenu() {
  return (
    <ul
      className={`menu first-color shadow-inner shadow-black ${styles.settingMenuContainer}`}
    >
      <li>
        <a className="tooltip tooltip-right z-50" data-tip="Edit Profile">
          <img alt="edit" src={editImg} className="w-5 h-5 " />
        </a>
      </li>
      <li>
        <a className="tooltip tooltip-right z-50" data-tip="Delete Account">
          <img alt="edit" src={deleteImg} className="w-5 h-5 " />
        </a>
      </li>
      <li>
        <a className="tooltip tooltip-right z-50" data-tip="Close Menu">
          <img alt="edit" src={cancelImg} className="w-5 h-5 " />
        </a>
      </li>
    </ul>
  );
}
