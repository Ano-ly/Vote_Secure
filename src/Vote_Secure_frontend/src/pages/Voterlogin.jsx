import React from "react";
import Biometric from "../../public/assets/Biometric.png";
import backarrow from "../../public/assets/backarrow.png";
import { Link } from "react-router-dom";
const Voterlogin = () => {
  return (
    <div className="relative contaner-r">
      <Link to="/">
        <img
          src={backarrow}
          alt=""
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>

      <div className="bg-main_bg_color flex flex-col items-center justify-center text-center p-14 md:pt-16 pb-28 ">
        {/* the main login div */}
        <div className=" flex flex-col items-center md:w-2/4">
          <img src={Biometric} alt="" className="w-9 mb-5 md:w-11" />
          <h1 className="text-white text-xl font-bold mb-4 md:text-2xl">
            Login
          </h1>
          <p className="text-gray-500 text-base max-w-96 leading-tight mb-6 ">
            Secure access for verified voters to vote in the election.
          </p>
          {/* inputs */}
          <div className="flex flex-col border-none gap-4 w-full">
            <input
              type="text"
              placeholder="Enter your voter ID"
              className="input placeholder-gray-500 text-sm w-full text-center p-2 rounded-lg text-gray-500"
            />
          </div>

          <Link to="/votingpage" className="w-full">
            <div className="text-white mt-8 bg-primary_blue w-full p-2 rounded-lg text-base">
              Vote
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Voterlogin;
