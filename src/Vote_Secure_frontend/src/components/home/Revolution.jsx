import React from "react";
import revicon from "/assets/Revicon.webp";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Revolution = () => {
  return (
    <div className="flex flex-col bg-main_bg_color py-5 gap-32 items-center text-white text-opacity-40 ">
      <div className="flex flex-col  items-center text-center">
        <h1 className="text-4xl font-bold gradient-text">
          VoteSecure: Revolutionizing Elections with <br />
          Blockchain Security and Transparency
        </h1>
      </div>
      <div className="flex p-5 items-center gap-10 text-sm lg:text-2xl w-full">
        <div className="w-1/2">
          <img className="w-full h-auto" src={revicon} alt="Revicon" />
        </div>
        <div className="flex flex-col gap-7 w-2/3">
          <p>
            "With VoteSecure, voting is safer than ever. <br />
            Our decentralized blockchain platform protects votes from <br />
            tampering, offers real-time verification, and ensures <br />
            full transparency for voters and officials alike."
          </p>
          <div className="flex  gap-3">
            <Link to={"/Adminsignup"} className="w-2/5">
              <Button className="w-full" size="large" type="primary">
                <p className="lg:text-base text-sm">Sign up</p>
              </Button>
            </Link>

            <Button
              className="lg:w-2/5 sm:w-3/5"
              color="default"
              variant="outlined"
              size="large"
              ghost
            >
              <p className="lg:text-base text-sm">Schedule a Demo</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revolution;
