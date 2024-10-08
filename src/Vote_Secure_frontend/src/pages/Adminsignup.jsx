import React from "react";
import Biometric from "../../public/assets/Biometric.png";
import backarrow from "../../public/assets/backarrow.png";
import { Link } from "react-router-dom";
const Adminsignup = () => {
  return (
    <div className="relative container-r">
      <Link to="/login">
        <img
          src={backarrow}
          alt=""
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>
      <div className="bg-main_bg_color flex flex-col items-center justify-center text-center p-14 md:pt-16 container-r">
        {/* the main login div */}
        <div className=" flex flex-col items-center w-full sm:w-3/4 md:w-2/4">
          <img src={Biometric} alt="" className="w-9 mb-5 md:w-11" />
          <h1 className="text-white text-xl font-bold mb-4 md:text-2xl">
            Sign up
          </h1>
          <p className="text-white text-base max-w-96 leading-tight mb-6 ">
            Sign up as an admin
          </p>
          {/* inputs */}
          <div className="flex flex-col border-none gap-4 w-full">
            <input
              type="text"
              placeholder="Full name"
              className="input placeholder-gray-500 text-sm text-white w-full  p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="E-mail address"
              className="input placeholder-gray-500 text-sm w-full p-2 rounded-lg text-white"
            />
            <input
              type="number"
              placeholder="Phone number"
              className="input placeholder-gray-500 text-sm w-full  p-2 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Username"
              className="input placeholder-gray-500 text-sm w-full  p-2 rounded-lg text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="input placeholder-gray-500 text-sm w-full p-2 rounded-lg text-white"
            />
          </div>
            <Link className="text-white mt-8 bg-primary_blue w-full p-2 rounded-lg text-base" to={'/dashboard'}>
               Sign up
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Adminsignup;
