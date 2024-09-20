import { useEffect, useState } from "react";
import styles from "./Logo.module.css";
import { brainwaveSymbol } from "../../assets";

export default function Logo() {
  const [charArray, setCharArray] = useState([]);
  useEffect(() => {
    const text = "Pinnacle Realty";
    const result = text.split("");
    setCharArray([...result]);
    // const text = document.getElementById("text");
    // text.innerHTML = text.innerText
    //   .split("")
    //   .map(
    //     (char, i) =>
    //       `<span style="transform:rotate(${i * 12}deg)">${char}</span>`
    //   )
    //   .join("");
  }, []);
  return (
    <div
      className={`${styles.logo} cursor-pointer text-xs font-medium`}
      id="circle"
    >
      <img src={brainwaveSymbol} alt="brainwave" className=" p-2" />
      <div className={`${styles.text}`}>
        <p id="text">
          {charArray.map((char, i) => (
            <span style={{ transform: `rotate(${i * 23}deg)` }} key={i}>
              {char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
