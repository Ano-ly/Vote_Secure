import React from "react";
import logo from "/Favicon.webp";
import { useState } from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [Menu, setMenu] = useState(false);
  const toggleNav = () => {
    setMenu(!Menu);
  };
  // RESPONSIVENESS DONE
  return (
    <div className="w-full z-40 bg-transparent ">
      <div className="flex items-center justify-between p-3 px-6 md:px-12 pb-0 text-white  relative">
        {/* first section */}
        <div className="flex items-center gap-1 font-extrabold text-ms ">
          <img src={logo} alt="Logo" />
          <p>
            <span className="text-primary_blue">Vote</span>Secure
          </p>
        </div>
        {/* menu button */}
        <div className="sm:hidden" onClick={toggleNav}>
          <svg
            fill="white"
            className="w-7"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
              fill-rule="nonzero"
            />
          </svg>
        </div>
        {/* second section lists*/}
        <div
          className={`${
            Menu ? "flex" : "hidden"
          } bg-main_bg_color fixed flex-col p-6 gap-5 rounded-r-lg  top-12 left-0 z-50 border list-none justify-between items-center sm:bg-transparent sm:flex sm:flex-row sm:relative sm:top-auto  sm:right-auto md:bg-transparent sm:border-0 sm:p-2 sm:gap-8 md:gap-14 lg:gap-24`}
        >
          <li className="">
            <a
              href=""
              className="text-ms text-white text-sm  p-1  border-b-2  border-blue-600 hover:text-white"
            >
              Home
            </a>
          </li>
          <li className="">
            <Link to={'/Dashboard'}>
              <a
                href=""
                className="text-ms text-white text-sm p-1  border-b-2 border-transparent transition duration-300 hover:border-blue-600"
              >
                Features
              </a>
            </Link>
            
          </li>
          <li className="">
            <a
              href=""
              className="text-ms text-white text-sm p-1  border-b-2 border-transparent transition duration-300 hover:border-blue-600"
            >
              Pricing
            </a>
          </li>
          <li className="">
            <a
              href=""
              className="text-ms text-white text-sm p-1  border-b-2 border-transparent transition duration-300 hover:border-blue-600"
            >
              AboutUs
            </a>
          </li>
          <li className="">
            <Link to={"/login"}>
              <a
                href=""
                className="text-ms text-white  text-sm p-1  border-b-2 border-transparent transition duration-300 hover:border-blue-600"
              >
                Login
              </a>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
