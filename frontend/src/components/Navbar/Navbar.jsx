import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <>
      <header className="shadow-md bg-black text-white p-3 md:p-1">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-2 pl-3 pr-3">
          <Link to="/">
            <h1 className="font-bold text-xl flex flex-wrap">
              <span className="text-sky-100">Dream</span>
              <span className="text-green-500">Dwell</span>
            </h1>
          </Link>
          <form className="m-2 p-2 rounded-xl hidden md:flex items-center border-gray-400 border-solid border-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none focus:border-sky-100 w-24 lg:w-64 md:w-48 sm:w-34"
            />
            <button>
              <FaSearch className="text-sky-100 ml-3" />
            </button>
          </form>
          <ul className="gap-6 hidden md:flex">
            <Link to="/">
              <li className="hidden sm:inline text-sky-100 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-sky-100 hover:underline">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              <li className=" text-sky-100 hover:underline"> Sign in</li>
            </Link>
          </ul>
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="">
              <div className="flex items-center justify-self-center btn btn-circle ">
                <IoReorderThreeOutline className="w-10 avatar" size={60} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow text-sky-100"
            >
              <li>
                <Link to="/">
                  <a className="justify-between">Home</a>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link to="/sign-in">
                  <a>Sign In</a>
                </Link>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent focus:outline-none focus:border-sky-100 text-white"
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
