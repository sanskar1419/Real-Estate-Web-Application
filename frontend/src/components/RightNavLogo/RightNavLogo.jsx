import React, { useEffect, useState } from "react";
import styles from "./RightNavLogo.module.css";
import { getCurrentUser } from "../../redux/slices/user.slice";
import { useSelector } from "react-redux";

export default function RightNavLogo() {
  const [charArray, setCharArray] = useState([]);
  useEffect(() => {
    const text = "Dwellio E-state";
    const result = text.split("");
    setCharArray([...result]);
  }, []);
  return (
    <div
      className={`${styles.logo} cursor-pointer text-xs font-medium`}
      id="circle"
    >
      <div className={`${styles.logoText}`}>DE</div>
      <div className={`${styles.text}`}>
        <p id="text">
          {charArray.map((char, i) => (
            <span style={{ transform: `rotate(${i * 23}deg)` }}>{char}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
