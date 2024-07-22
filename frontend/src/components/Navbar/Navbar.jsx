import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/slices/user.slice";

export default function Navbar() {
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      <header className=" text-white p-2 bg-slate-950">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-2 pl-3 pr-3">
          <NavLink to="/">
            <h1 className="font-bold text-xl flex flex-wrap">
              <span className="text-sky-100">Dream</span>
              <span className="text-green-500">Dwell</span>
            </h1>
          </NavLink>
          {/* <form className="m-2 p-2 rounded-xl hidden md:flex items-center border-gray-400 border-solid border-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none focus:border-sky-100 w-24 lg:w-64 md:w-48 sm:w-34"
            />
            <button>
              <FaSearch className="text-sky-100 ml-3" />
            </button>
          </form> */}
          <ul className="gap-6 hidden md:flex">
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { color: "#22c55e" } : { color: "white" }
              }
            >
              <li className="hidden sm:inline hover:underline">Home</li>
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) =>
                isActive ? { color: "#22c55e" } : { color: "white" }
              }
            >
              <li className="hidden sm:inline  hover:underline">About</li>
            </NavLink>
            {currentUser ? (
              <NavLink to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
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
                    <img
                      className="rounded-full h-7 w-7 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
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
      <Outlet />
    </>
  );
}
