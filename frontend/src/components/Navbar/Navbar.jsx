import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userActions } from "../../redux/slices/user.slice";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import homeImage from "../../assets/images/home.png";
import logInImage from "../../assets/images/log-in.png";
import aboutImage from "../../assets/images/about2.png";
import {
  getSettingMenu,
  settingMenuActions,
} from "../../redux/slices/settingMenu.slice";

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const settingMenu = useSelector(getSettingMenu);
  const currentUser = useSelector(getCurrentUser);
  const [toggleMenuButton, setToggleMenuButton] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(userActions.logoutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(userActions.logoutError(data.message));
        return;
      }
      dispatch(userActions.logoutSuccess(data));
      localStorage.removeItem("logged-in-user");
    } catch (error) {
      dispatch(userActions.logoutError(error.message));
    }
  };

  return (
    <>
      <div
        className={`${styles.navbarContainer} flex items-center justify-center py-1 text-["white"] bg-transparent relative w-full`}
      >
        <div className={`w-[90%] flex items-center justify-between`}>
          <NavLink to="/" className="w-[30%] flex items-center gap-5">
            {" "}
            <Logo />
            <span>Dwellio</span>
          </NavLink>
          <div
            className={`w-[60%] items-center gap-3 justify-end text-sm hidden sm:flex`}
          >
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: "3px solid #141010",
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
                      borderBottom: "3px solid #141010",
                      paddingBottom: "1px",
                    }
                  : {}
              }
              className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center`}
            >
              <img alt="About" src={aboutImage} className="w-4" />
              <span>About</span>
            </NavLink>
            {currentUser ? (
              <div
                className="flex items-center gap-1"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div
                  className={`dropdown dropdown-end relative ${styles.profilePhoto} flex items-center justify-center`}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={currentUser.avatar}
                      />
                    </div>
                  </div>
                  {showProfileMenu && (
                    <ul
                      className="menu menu-sm first-color rounded-lg z-[1] mt-3 max-w-fit p-2 shadow absolute top-[2.80rem] left-[-100px] xl:left-[-100%]"
                      onMouseLeave={() => setShowProfileMenu(false)}
                    >
                      <NavLink to="/profile">
                        <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                      </NavLink>
                      {currentPath == "/profile" ? (
                        <li
                          onClick={() =>
                            dispatch(settingMenuActions.showMenu())
                          }
                        >
                          <a>Settings</a>
                        </li>
                      ) : null}
                      <li onClick={handleLogout}>
                        <a>Logout</a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <NavLink
                to="/sign-in"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #141010",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center`}
              >
                <img alt="About" src={logInImage} className="w-4" />
                <span>Sign-In</span>
              </NavLink>
            )}
          </div>
          <label className="cursor-pointer sm:hidden">
            {toggleMenuButton ? (
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
                onClick={() => setToggleMenuButton(false)}
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            ) : (
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
                onClick={() => setToggleMenuButton(true)}
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            )}
          </label>
        </div>

        {toggleMenuButton && (
          <ul
            className="menu first-color lg:menu-horizontal rounded-lg absolute top-[110%] z-10 w-[97%] sm:hidden"
            onMouseLeave={() => setToggleMenuButton(false)}
          >
            <div
              class={`${styles.triangleUp} absolute right-4 top-[-35px] z-10`}
            ></div>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#c3195d" } : {}
              }
              className="rounded-lg"
            >
              <li className="">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                  <span className="badge badge-sm">99+</span>
                </a>
              </li>
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#c3195d" } : {}
              }
              className="rounded-lg"
            >
              <li>
                <a>
                  <img alt="About" src={aboutImage} className="w-4" />
                  About
                  <span className="badge badge-sm badge-warning">NEW</span>
                </a>
              </li>
            </NavLink>

            {currentUser ? (
              <div
                className="flex items-center gap-1 "
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                onM
              >
                <div
                  className={`dropdown dropdown-end ${styles.profilePhoto} flex items-center justify-center`}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={currentUser.avatar}
                      />
                    </div>
                  </div>
                  {showProfileMenu && (
                    <ul
                      className="menu menu-sm first-color rounded-lg z-[30] mt-3 max-w-fit p-2 shadow absolute top-[2.80rem] left-0"
                      onMouseLeave={() => setShowProfileMenu(false)}
                    >
                      <NavLink to="/profile">
                        <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                      </NavLink>
                      {currentPath == "/profile" ? (
                        <li
                          onClick={() =>
                            dispatch(settingMenuActions.showMenu())
                          }
                        >
                          <a>Settings</a>
                        </li>
                      ) : null}
                      <li onClick={handleLogout}>
                        <a>Logout</a>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="">
                  {currentUser ? currentUser.username : "Guest"}
                </div>
              </div>
            ) : (
              <NavLink
                to="/sign-in"
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "#c3195d" } : {}
                }
                className="rounded-lg"
              >
                <li>
                  <a>
                    <img alt="About" src={logInImage} className="w-4" />
                    Sign-In
                  </a>
                </li>
              </NavLink>
            )}
          </ul>
        )}
      </div>
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
