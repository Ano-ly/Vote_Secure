import React from "react";
import backarrow from "/assets/backarrow.png";
import check from "/assets/check.png";
import { Link } from "react-router-dom";

const VotingManagement1 = () => {
  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4 relatve">
      {/* don't know where you want it to link back to */}
      <Link to="/dashboard">
        <img
          src={backarrow}
          alt=""
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>
      <div className=" w-11/12 ">
        {/* first div */}
        <div className="flex flex-col items-center text-white text-center mb-6 relative w-full ">
          <h1 className="text-xl font-bold mb-2 md:text-2xl">
            Vote Management
          </h1>
          <p className="text-sm text-gray-500 md:text-base md:max-w-xl">
            Easily track, verify, and tally votes in real time with VoteSecure.
            Our system ensures every vote is counted accurately and
            transparently.
          </p>
        </div>
        {/* Second div */}
        <div className="vpage border-2 border-transparent border-t-primary_blue rounded-3xl w-full py-6 px-4 mt-10 sm:px-10  ">
          <h1 className="text-white text-base mb-4 sm:text-xl">
            List of voters
          </h1>
          {/* lists */}
          <div className="flex flex-col gap-4">
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
            <div className="border border-blue-500 text-white flex justify-between items-center py-4 px-2 text-sm sm:p-3 rounded-md  ">
              <p>056P7QJ</p>
              <div className="flex gap-6 items-center sm:gap-20 md:gap-48">
                <p className="text-gray-500">View</p>

                <div className="flex gap-2 items-center sm:gap-6 md:gap-11">
                  <p className="text-sm text-primary_blue sm:text-base">
                    Voted
                  </p>
                  <img src={check} alt="" className="w-5 md:w-7" />
                </div>
              </div>
            </div>
          </div>
          {/* show result */}
          <Link to="/votingm2">
            <div className="flex items-center text-center py-2 px-8 rounded-md text-white border border-primary_blue bg-primary_blue w-fit mt-4 transition duration-300 cursor-pointer hover:bg-transparent md:py-4 md:px-10">
              Show result
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VotingManagement1;
