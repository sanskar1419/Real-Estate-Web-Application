import React, { useEffect, useState } from "react";
import styles from "./RightIconNavbar.module.css";
import homeImage from "../../assets/images/home.png";
import searchImg from "../../assets/images/searchIcon.png";
import aboutImage from "../../assets/images/about.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser, userActions } from "../../redux/slices/user.slice";

export default function RightIconNavbar() {
  const [charArray, setCharArray] = useState([]);
  const currentUser = useSelector(getCurrentUser);
  useEffect(() => {
    const text = "Dwellio E-state";
    const result = text.split("");
    setCharArray([...result]);
  }, []);
  return (
    <div
      className={`fixed w-12 h-screen right-0 ${styles.rightNavbar} flex items-center py-2 flex-col text-black gap-5 glass cursor-pointer`}
    >
      <NavLink to="/" className="flex items-center">
        <div
          className={`${styles.logo} cursor-pointer text-xs font-medium`}
          id="circle"
        >
          <div className={`${styles.logoText}`}>DE</div>
          <div className={`${styles.text}`}>
            <p id="text">
              {charArray.map((char, i) => (
                <span style={{ transform: `rotate(${i * 23}deg)` }}>
                  {char}
                </span>
              ))}
            </p>
          </div>
        </div>
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
        className="absolute bottom-3 h-10 w-10 rounded-full overflow-hidden"
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
