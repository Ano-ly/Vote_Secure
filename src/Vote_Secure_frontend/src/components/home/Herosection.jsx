import React from "react";
import logo from "/assets/Biometric.png";
import votingsteps from "/assets/votingsteps.png";
import bgdots from "/assets/bgdots.png";

const Herosection = () => {
  // YET TO DO RESPONSIVENESS
  return (
    <div className=" pt-4 flex flex-col items-center text-center text-white z-40 w-screen">
      {/* maintitle */}
      <div className=" text-xl  font-bold pt-1 mb-4 relative flex flex-col items-center sm:text-2xl">
        <h1 className=" max-w-96 relative leading-snug m-auto sm:max-w-xl md:text-3xl md:max-w-2xl lg:text-4xl ">
          <img src={logo} alt="" className=" inline-block  w-7   " />
          Blockchain-Powered Voting for Unmatched Security and Transparency
        </h1>
        <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={bgdots} alt="" className="" />
        </div>
      </div>
      {/* subtitle */}
      <div>
        <p className="text-sm max-w-80 mb-6  md:max-w-xl lg:text-base lg:max-w-90">
          VoteSecure ensures elections are secure and tamper-proof with
          blockchain technology. Every vote is encrypted and verifiable,
          guaranteeing trust and transparency.
        </p>
      </div>
      {/* buttons */}
      <div className="flex gap-3  ">
        <div className="btn border border-transparent py-3 px-5 cursor-pointer rounded-lg bg-primary_blue text-sm  transition duration-300 hover:bg-transparent hover:border-white sm:text-base sm:px-8 sm:py-3 md:text-lg">
          Get started
        </div>
        <div className="btn border py-2 px-5 rounded-lg cursor-pointer text-sm flex items-center transition duration-300  hover:bg-primary_blue hover:border-transparent sm:text-base sm:px-8 sm:py-3 md:text-lg ">
          Learn More
        </div>
      </div>
      {/* The voting steps */}
      <div className=" mt-2 w-full h-52 relative flex items-center justify-center">
        <img src={votingsteps} alt="" className="w-96 relative top-6" />
      </div>
    </div>
  );
};

export default Herosection;
