import React, { useState } from "react";
import Biometric from "../../public/assets/Biometric.png";
import p1 from "../../public/assets/p1.png";
import p2 from "../../public/assets/p2.png";
import p3 from "../../public/assets/p3.png";
import p4 from "../../public/assets/p4.png";
import p5 from "../../public/assets/p5.png";
import p6 from "../../public/assets/p6.png";
import p7 from "../../public/assets/p7.png";
import p8 from "../../public/assets/p8.png";
import p9 from "../../public/assets/p9.png";
import p10 from "../../public/assets/p10.png";
import logo from "../../public/Favicon.webp";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Votingpage = () => {
  // State to track selected candidates for each category
  const [selectedCandidate, setSelectedCandidate] = useState({
    president: null,
    vicePresident: null,
    generalSecretary: null,
    publicRelationsOfficer: null,
  });

  // Function to handle candidate selection
  const voteClick = (position, candidate) => {
    setSelectedCandidate((prevState) => ({
      ...prevState,
      [position]: candidate,
    }));
  };

  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4">
      <div className="w-10/12">
        {/* First div */}
        <div className="flex flex-col items-center text-white text-center mb-6 relative w-full">
          <div className="absolute left-0 bottom-32 md:left-0 md:top-0 flex items-center font-bold gap-2">
            <img src={logo} alt="" className="w-6" />
            <p className="text-white">
              Vote<span className="text-primary_blue">Secure</span>
            </p>
          </div>
          <img src={Biometric} alt="" className="w-9 sm:w-11 mb-3" />
          <h1 className="text-3xl font-bold mb-2">Vote</h1>
          <p className="text-sm">Please select your candidate for each position</p>
        </div>

        {/* Second div */}
        <div className="vpage border-2 border-transparent border-t-primary_blue rounded-3xl w-full py-6 px-2 mt-10 sm:px-10">
          <div className="flex flex-col gap-4 text-gray-500">
            {/* President */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">President</h1>
              {[
                { name: "Kehinde Bankole", image: p1 },
                { name: "Adewuyui Lekan", image: p2 },
                { name: "Popoola Olayide", image: p3 },
              ].map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.name}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt={candidate.name} className="w-9" />
                    <p className="text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedCandidate.president === candidate.name
                        ? "bg-primary_blue"
                        : "bg-transparent"
                    } cursor-pointer`}
                    onClick={() => voteClick("president", candidate.name)}
                  ></div>
                </div>
              ))}
            </div>

            {/* Vice President */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">Vice President</h1>
              {[
                { name: "Idowu Daniel", image: p4 },
                { name: "Michael Olatunde", image: p5 },
                { name: "Kehinde Mayowa", image: p6 },
              ].map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.name}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt={candidate.name} className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedCandidate.vicePresident === candidate.name
                        ? "bg-primary_blue"
                        : "bg-transparent"
                    } cursor-pointer`}
                    onClick={() => voteClick("vicePresident", candidate.name)}
                  ></div>
                </div>
              ))}
            </div>

            {/* General Secretary */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">General Secretary</h1>
              {[
                { name: "Kehinde Bankole", image: p7 },
                { name: "Adewuyui Lekan", image: p8 },
              ].map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.name}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt={candidate.name} className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedCandidate.generalSecretary === candidate.name
                        ? "bg-primary_blue"
                        : "bg-transparent"
                    } cursor-pointer`}
                    onClick={() => voteClick("generalSecretary", candidate.name)}
                  ></div>
                </div>
              ))}
            </div>

            {/* Public Relations Officer */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">Public Relations Officer</h1>
              {[
                { name: "Oladipo Sharon", image: p9 },
                { name: "Adewuyui Lekan", image: p10 },
              ].map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.name}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt={candidate.name} className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedCandidate.publicRelationsOfficer === candidate.name
                        ? "bg-primary_blue"
                        : "bg-transparent"
                    } cursor-pointer`}
                    onClick={() => voteClick("publicRelationsOfficer", candidate.name)}
                  ></div>
                </div>
              ))}
            </div>
            <div className='w-1/6'>
                    <Link to={'/'} className='w-full'>
                    <Button
                            className='my-7 w-full'
                            size='large'
                            type='primary'
                            
                        >
                            Sumbit
                        </Button>
                    </Link>
                        
                    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votingpage;
