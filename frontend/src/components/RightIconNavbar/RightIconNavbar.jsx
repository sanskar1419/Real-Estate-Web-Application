import React, { useEffect, useState } from "react";
import styles from "./RightIconNavbar.module.css";
import homeImage from "../../assets/images/home.png";
import searchImg from "../../assets/images/searchIcon.png";
import aboutImage from "../../assets/images/about.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser, userActions } from "../../redux/slices/user.slice";
import RightNavLogo from "../RightNavLogo/RightNavLogo";

export default function RightIconNavbar({ setShowNavMenu }) {
  const currentUser = useSelector(getCurrentUser);
  return (
    <div
      className={`fixed w-12 h-screen right-0 ${styles.rightNavbar} flex items-center py-2 flex-col text-black gap-5 cursor-pointer z-20 shadow-inner shadow-black`}
      onMouseLeave={() => setShowNavMenu(false)}
    >
      <NavLink to="/" className="flex items-center">
        <RightNavLogo />
      </NavLink>
      <div className="flex items-center gap-3 flex-col">
        <NavLink to="/">
          <img alt="home" src={homeImage} className="w-6" />
        </NavLink>
        <NavLink to="/about">
          <img alt="about" src={aboutImage} className="w-6" />
        </NavLink>
        <img alt="search" src={searchImg} className="w-6" />
      </div>
      <NavLink
        to="/profile"
        className="absolute bottom-3 h-8 w-8 rounded-full overflow-hidden"
      >
        <img
          src={currentUser.avatar}
          alt="profile"
          className="w-full h-full rounded full"
        />
      </NavLink>
    </div>
  );
}
