import React from "react";
import biometric from "/assets/Biometric.webp";
import favicon from "/Favicon.webp";
import ellispe from "/assets/Ellipse.webp";
import facebook from "/assets/Facebook.webp";
import linkedin from "/assets/Linkedin.webp";
import twitter from "/assets/Twitter.webp";

const Footer = () => {
  return (
    <div className="main-hero-bg flex flex-col p-3  gap-3 text-white px-8 py-11">
      <div className="flex justify-between">
        <div className="flex flex-col gap-10 w-1/2">
          <div className="flex gap-2 items-center">
            <img src={favicon} alt="favicon" />
            <p className="font-medium">
              <span className="text-blue-800">Vote</span>Secure
            </p>
          </div>
          <div className="lg:text-base text-sm">
            <p className="font-medium">About us</p>
            <p className="text-opacity-40 text-white">
              Learn more about how our blockchain technology is transforming{" "}
              <br /> elections by ensuring secure, transparent, and trustworthy
              voting <br /> systems.
            </p>
          </div>
        </div>
        <div className="w-1/12">
          <img className="w-full" src={biometric} alt="favicon" />
        </div>
      </div>
      <div className="flex gap-12">
        <div className="flex flex-col lg:text-base text-sm">
          <p className="font-medium">Contact</p>
          <p className="text-opacity-40 text-white">
            Have questions or need assistance? <br /> Email:
            support@votesecure.com
            <br />
            <span>Phone: +1 (800) 123-4567</span>
          </p>
        </div>
        <div className="w-1/2">
          <p className="font-medium lg:text-base w-full text-sm lg:w-1/4">
            Resources
          </p>
          <div className="flex-col flex gap-4 items-center md:flex-row lg:text-base text-sm">
            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center   gap-2 text-opacity-40 text-white">
                <img className="w-1/10 h-1/10" src={ellispe} alt="ellipse" />
                <p>
                  <a href="">FAQs</a>
                </p>
              </div>
              <div className="flex items-center  gap-2 text-opacity-40 text-white">
                <img className="w-1/10 h-1/10" src={ellispe} alt="ellipse" />
                <p className="w-full">
                  <a href="">Help Center</a>
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center   gap-2 text-opacity-40 text-white">
                <img className="w-1/10 h-1/10" src={ellispe} alt="ellipse" />
                <p>
                  <a href="">Terms of Service</a>
                </p>
              </div>
              <div className="flex items-center   gap-2 text-opacity-40 text-white">
                <img className="w-1/10 h-1/10" src={ellispe} alt="ellipse" />
                <p>
                  <a href="">Help Center</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">Follow us</p>
        <div className="flex gap-3">
          <button>
            <img className="w-3/5" src={facebook} alt="" />
          </button>
          <button>
            <img className="w-3/5" src={twitter} alt="" />
          </button>
          <button>
            <img className="w-3/5" src={linkedin} alt="" />
          </button>
        </div>
      </div>
      <div className="w-full p-6 justify-items-center text-center items-center">
        <p className="lg:text-xl text-opacity-40 text-white">
          Copyright © 2024 VoteSecure. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
