import React from "react";
import logo from "/assets/Biometric.png";
import votingsteps from "/assets/votingsteps.png";
import bgdots from "/assets/bgdots.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Herosection = () => {
  return (
    <div className="pt-4 flex flex-col items-center text-center text-white z-40 w-screen">
      {/* Main Title */}
      <div className="text-xl font-bold pt-1 mb-4 relative flex flex-col items-center sm:text-2xl">
        <h1 className="max-w-96 relative leading-snug m-auto sm:max-w-xl md:text-3xl md:max-w-2xl lg:text-4xl">
          <img src={logo} alt="" className="inline-block w-7" />
          Blockchain-Powered Voting for Unmatched Security and Transparency
        </h1>
        <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={bgdots} alt="" />
        </div>
      </div>

      {/* Subtitle */}
      <div>
        <p className="text-sm max-w-80 mb-6 md:max-w-xl lg:text-base lg:max-w-90">
          VoteSecure ensures elections are secure and tamper-proof with blockchain technology. Every vote is encrypted and verifiable, guaranteeing trust and transparency.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center px-20 lg:px-28 w-full">
        <Link to={"/adminsignup"} className="w-full sm:w-2/5 ">
          <Button className="w-full" size="large" type="primary">
            <p className="lg:text-base text-sm">Get Started</p>
          </Button>
        </Link>

        <Button
          className="w-full sm:w-2/5"
          type="default"
          size="large"
          ghost
          onClick={() => console.log('Schedule a Demo clicked')}
        >
          <p className="lg:text-base text-sm">Schedule a Demo</p>
        </Button>
      </div>

      {/* The Voting Steps */}
      <div className="mt-2 w-full h-52 relative flex items-center justify-center">
        <img src={votingsteps} alt="" className="w-96 relative top-6" />
      </div>
    </div>
  );
};

export default Herosection;
