import slider1Img from "../../assets/slider/logo1.svg";
import slider2Img from "../../assets/slider/logo2.svg";
import slider3Img from "../../assets/slider/logo3.svg";
import slider4Img from "../../assets/slider/logo4.svg";
import slider5Img from "../../assets/slider/logo5.svg";
import slider6Img from "../../assets/slider/logo6.svg";
import slider7Img from "../../assets/slider/logo7.svg";
import slider8Img from "../../assets/slider/logo8.svg";
import slider9Img from "../../assets/slider/logo9.svg";
import slider10Img from "../../assets/slider/logo10.svg";
import styles from "./CompanyLogos.module.css";
import property1 from "../../assets/slider/property1.jpg";
import property2 from "../../assets/slider/property2.jpg";
import property3 from "../../assets/slider/property3.jpg";
import property4 from "../../assets/slider/property4.jpg";
import property5 from "../../assets/slider/property5.jpg";
import property6 from "../../assets/slider/property6.jpg";
import property7 from "../../assets/slider/property7.jpg";
import property8 from "../../assets/slider/property8.jpg";
import property9 from "../../assets/slider/property9.jpg";
import property10 from "../../assets/slider/property10.jpg";
import property11 from "../../assets/slider/property11.jpg";
import property12 from "../../assets/slider/property12.jpg";
import property13 from "../../assets/slider/property13.jpg";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-10 text-center text-n-1/50">
        Helping people create living peaceful life at
      </h5>

      <div
        className={styles.slider}
        style={{ "--width": "100px", "--height": "4rem", "--quantity": 10 }}
      >
        <div className={styles.list}>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 1 }}
          >
            <img src={slider1Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 2 }}
          >
            <img src={slider2Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 3 }}
          >
            <img src={slider3Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 4 }}
          >
            <img src={slider4Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 5 }}
          >
            <img src={slider5Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 6 }}
          >
            <img src={slider6Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 7 }}
          >
            <img src={slider7Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 8 }}
          >
            <img src={slider8Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 9 }}
          >
            <img src={slider9Img} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 10 }}
          >
            <img src={slider10Img} alt="" />
          </div>
        </div>
      </div>

      <div
        className={styles.slider}
        reverse="true"
        style={{ "--width": "200px", "--height": "200px", "--quantity": 9 }}
      >
        <div className={styles.list}>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 1 }}
          >
            <img src={property1} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 2 }}
          >
            <img src={property2} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 3 }}
          >
            <img src={property3} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 4 }}
          >
            <img src={property4} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 5 }}
          >
            <img src={property5} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 6 }}
          >
            <img src={property6} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 7 }}
          >
            <img src={property7} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 8 }}
          >
            <img src={property8} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 9 }}
          >
            <img src={property9} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 10 }}
          >
            <img src={property10} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 11 }}
          >
            <img src={property11} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 12 }}
          >
            <img src={property12} alt="" />
          </div>
          <div
            className={`${styles.item} scale-[0.8] md:scale-[1]`}
            style={{ "--position": 13 }}
          >
            <img src={property13} alt="" />
          </div>
        </div>
      </div>
      {/* <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={logo} width={134} height={28} alt={logo} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CompanyLogos;
