import React from "react";
import img1 from "/assets/img1.png";
import img2 from "/assets/img2.png";
import img3 from "/assets/img3.png";
import img4 from "/assets/img4.png";

const Features = () => {
  return (
    <div className="bg-main_bg_color flex flex-col items-center text-center py-20 px-5">
      <div className="">
        <h1 className="gradient-text font-bold text-3xl md:text-4xl mb-3">
          Features Overview
        </h1>
        <p className="max-w-xl text-white mb-28 text-base">
          Provides a secure, blockchain-powered voting system with encrypted,
          tamper-proof votes and real-time verification. Its decentralized
          structure ensures transparent and trustworthy elections for all.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="border flex flex-col items-center text-center p-6 rounded-2xl cursor-pointer border-col">
          <img src={img1} alt="" className="w-24" />
          <p className="gradient-text">Voters Authentication</p>
        </div>
        <div className="border flex flex-col items-center text-center p-6 gap-2 rounded-2xl cursor-pointer border-col">
          <img src={img2} alt="" className="w-24" />
          <p className="gradient-text">Blockchain Security</p>
        </div>
        <div className="border flex flex-col items-center text-center p-6 gap-3 rounded-2xl cursor-pointer border-col">
          <img src={img3} alt="" className="w-32" />
          <p className="gradient-text">Multi-channel Voting</p>
        </div>
        <div className="border flex flex-col items-center text-center p-6 gap-2 rounded-2xl cursor-pointer border-col">
          <img src={img4} alt="" className="w-28" />
          <p className="gradient-text">Real-Time Results</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
