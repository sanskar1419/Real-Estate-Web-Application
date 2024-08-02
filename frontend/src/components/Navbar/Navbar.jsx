import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/Dwellio_transparent-.png";
import Logo from "../Logo/Logo";
import homeImage from "../../assets/images/home.png";
import logInImage from "../../assets/images/log-in.png";
import aboutImage from "../../assets/images/about.png";
import RightIconNavbar from "../RightIconNavbar/RightIconNavbar";

export default function Navbar() {
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      {currentUser ? (
        <div className="relative w-full">
          <RightIconNavbar />
        </div>
      ) : (
        <div
          className={`${styles.navbarContainer} flex items-center justify-center py-1 text-black`}
        >
          <div className={`w-[90%] flex items-center justify-between`}>
            <NavLink to="/" className="w-[30%] flex items-center gap-4">
              {" "}
              <Logo />
              <span>Dwellio</span>
            </NavLink>
            <div
              className={`w-[60%] flex items-center gap-3 justify-end text-sm`}
            >
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #3d52a0",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center`}
              >
                <img alt="home" src={homeImage} className="w-4" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #3d52a0",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center`}
              >
                <img alt="About" src={aboutImage} className="w-4" />
                <span>About</span>
              </NavLink>
              <NavLink
                to="/sign-in"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #3d52a0",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center`}
              >
                <img alt="signIn" src={logInImage} className="w-4" />
                <span>Sign-In</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

/* 
<header className=" text-white p-3 bg-slate-950 shadow-slate-500 shadow-inner drop-shadow-2xl">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-2 pl-3 pr-3">
          <NavLink to="/">
            <h1 className="font-bold text-xl flex flex-wrap">
              <span className="text-sky-100">Dream</span>
              <span className="text-green-500">Dwell</span>
            </h1>
          </NavLink>

          <ul className="gap-6 hidden md:flex h-full">
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { color: "#22c55e" } : { color: "white" }
              }
            >
              <li className="hidden hover:underline sm:flex sm:items-center sm:justify-center h-full font-bold">
                Home
              </li>
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) =>
                isActive ? { color: "#22c55e" } : { color: "white" }
              }
            >
              <li className="hidden sm:flex sm:items-center sm:justify-center hover:underline h-full font-bold">
                About
              </li>
            </NavLink>
            {currentUser ? (
              <NavLink to="/profile">
                <div className={`${styles.profilePhoto}`}>
                  <img
                    className="h-full w-full"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/sign-in"
                style={({ isActive }) =>
                  isActive ? { color: "#22c55e" } : { color: "white" }
                }
              >
                <li className=" hover:underline"> Sign in</li>
              </NavLink>
            )}
          </ul>
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="">
              <div className="flex items-center justify-self-center btn btn-circle bg-slate-900 hover:bg-slate-700">
                <IoReorderThreeOutline className="w-10 avatar" size={50} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-xs dropdown-content bg-slate-950 rounded-tr-box z-[1] mt-3 w-52 p-2 shadow text-sky-100"
            >
              {currentUser ? (
                <NavLink to="/profile">
                  <div className=" flex items-center mb-3">
                    <div className={`${styles.profilePhoto}`}>
                      <img
                        className="h-full w-full"
                        src={currentUser.avatar}
                        alt="profile"
                      />
                    </div>
                    <span className="ml-3 text-md font-bold">
                      {currentUser.username}
                    </span>
                  </div>
                </NavLink>
              ) : (
                <NavLink
                  to="/sign-in"
                  style={({ isActive }) =>
                    isActive ? { color: "#22c55e" } : { color: "white" }
                  }
                >
                  <li>Sign In</li>
                </NavLink>
              )}
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? { color: "#22c55e" } : { color: "white" }
                }
              >
                <li className="justify-between">Home</li>
              </NavLink>

              <NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive ? { color: "#22c55e" } : { color: "white" }
                }
              >
                <li>About</li>
              </NavLink>

              <li>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-slate-900 focus:border-sky-100 text-white mt-3 placeholder:italic"
                />
              </li>
            </ul>
          </div>
        </div>
      </header>
*/
