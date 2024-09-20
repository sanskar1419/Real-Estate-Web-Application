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
import { brainwave } from "../../assets";
import { HamburgerMenu } from "../design/Header";
import MenuSvg from "../../assets/svg/MenuSvg";
import { navigation } from "../../constants";
import Button from "../Button/Button";

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = useLocation();
  const currentPath = location.pathname;
  const settingMenu = useSelector(getSettingMenu);
  const currentUser = useSelector(getCurrentUser);
  const [toggleMenuButton, setToggleMenuButton] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

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

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      // enablePageScroll();
    } else {
      setOpenNavigation(true);
      // disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    // enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm py-0"
        }`}
      >
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 py-2 text-n-2">
          <NavLink to="/" className="flex items-center gap-2">
            <Logo />
            <h1 className="cursive font-extrabold text-xl">
              Pinnacle<span className=" text-[#AC6AFF]">Realty</span>
            </h1>
          </NavLink>
          {/* <a className="block w-[12rem] xl:mr-8" href="#hero">
            <img src={brainwave} width={190} height={40} alt="Brainwave" />
          </a> */}

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #AC6AFF",
                        paddingBottom: "1px",
                        // transition: "1s all ease-in",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center cursive px-8`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </NavLink>
              <NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #AC6AFF",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center cursive px-8`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>

                <span>About</span>
              </NavLink>

              <NavLink
                to="/features"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #AC6AFF",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer flex items-center gap-1 justify-center cursive px-8`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>

                <span>Features</span>
              </NavLink>
            </div>

            <HamburgerMenu />
          </nav>

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
                        onClick={() => dispatch(settingMenuActions.showMenu())}
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
            <>
              <NavLink
                to="/sign-up"
                style={({ isActive }) =>
                  isActive
                    ? {
                        borderBottom: "3px solid #AC6AFF",
                        paddingBottom: "1px",
                      }
                    : {}
                }
                className={`${styles.navButton} cursor-pointer hidden lg:flex items-center gap-1 justify-center cursive transition-colors hover:text-[#AC6AFF] px-4 mr-8`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                  />
                </svg>

                <span>Register</span>
              </NavLink>
              <Button>
                <NavLink
                  to="/sign-in"
                  className={`${styles.navButton} cursor-pointer hidden lg:flex items-center gap-1 justify-center cursive  transition-colors hover:text-[#AC6AFF]`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>

                  <span>Sign-In</span>
                </NavLink>
              </Button>
            </>
          )}

          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
      {/* <div
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
      </div> */}
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
