import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backarrow from "/assets/backarrow.png";
// Assume you fetch these images from the backend too
import p1 from "/assets/p1.png";
import p2 from "/assets/p2.png";
import p3 from "/assets/p3.png";
import p4 from "/assets/p4.png";
import p5 from "/assets/p5.png";
import p6 from "/assets/p6.png";
import p7 from "/assets/p7.png";
import p8 from "/assets/p8.png";
import p9 from "/assets/p9.png";
import p10 from "/assets/p10.png";

// Simulate data from the backend
const data = {
  president: [
    { id: 1, name: "Kehinde Bankole", image: p1 },
    { id: 2, name: "Adewuyui Lekan", image: p2 },
    { id: 3, name: "Popoola Olayide", image: p3 }
  ],
  vicePresident: [
    { id: 1, name: "Idowu Daniel", image: p4 },
    { id: 2, name: "Michael Olatunde", image: p5 },
    { id: 3, name: "Kehinde Mayowa", image: p6 }
  ],
  generalSecretary: [
    { id: 1, name: "Kehinde Bankole", image: p7 },
    { id: 2, name: "Adewuyui Lekan", image: p8 }
  ],
  publicRelationsOfficer: [
    { id: 1, name: "Oladipo Sharon", image: p9 },
    { id: 2, name: "Adewuyui Lekan", image: p10 }
  ]
};

// Simulate the backend response for winning candidates
const winningCandidates = {
  president: 1, // Kehinde Bankole won for President
  vicePresident: 2, // Michael Olatunde won for Vice President
  generalSecretary: 1, // Kehinde Bankole won for General Secretary
  publicRelationsOfficer: 2 // Adewuyui Lekan won for PRO
};

const VotingManagement2 = () => {
  const [selectedPresident, setSelectedPresident] = useState(null);
  const [selectedVicePresident, setSelectedVicePresident] = useState(null);
  const [selectedGeneralSecretary, setSelectedGeneralSecretary] = useState(null);
  const [selectedPRO, setSelectedPRO] = useState(null);

  // Use effect to set the winners on component mount
  useEffect(() => {
    // Set the winning candidates from the backend response
    setSelectedPresident(winningCandidates.president);
    setSelectedVicePresident(winningCandidates.vicePresident);
    setSelectedGeneralSecretary(winningCandidates.generalSecretary);
    setSelectedPRO(winningCandidates.publicRelationsOfficer);
  }, []);

  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4 relative">
      <Link to="/votingm1">
        <img
          src={backarrow}
          alt=""
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>
      <div className="w-10/12">
        {/* Header */}
        <div className="flex flex-col items-center text-white text-center mb-6 relative w-full ">
          <h1 className="text-xl font-bold mb-2 md:text-2xl">Vote Management</h1>
          <p className="text-sm text-gray-500 md:text-base md:max-w-xl">
            Easily track, verify, and tally votes in real time with VoteSecure.
            Our system ensures every vote is counted accurately and transparently.
          </p>
        </div>

        {/* Voting Category List */}
        <div className="vpage border-2 border-transparent border-t-primary_blue rounded-3xl w-full py-6 px-2 mt-10 sm:px-10">
          <div className="flex flex-col gap-4 text-gray-500">
            
            {/* President Category */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">President</h1>
              {data.president.map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.id}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt="" className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedPresident === candidate.id ? "bg-primary_blue" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Vice President Category */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">Vice President</h1>
              {data.vicePresident.map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.id}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt="" className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedVicePresident === candidate.id ? "bg-primary_blue" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* General Secretary Category */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">General Secretary</h1>
              {data.generalSecretary.map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.id}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt="" className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedGeneralSecretary === candidate.id ? "bg-primary_blue" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Public Relations Officer Category */}
            <div className="flex flex-col">
              <h1 className="text-white text-xl mb-4 md:text-2xl">Public Relations Officer</h1>
              {data.publicRelationsOfficer.map((candidate) => (
                <div className="flex justify-between items-center mb-4" key={candidate.id}>
                  <div className="flex items-center gap-3">
                    <img src={candidate.image} alt="" className="w-9" />
                    <p className="text-xs md:text-sm">{candidate.name}</p>
                  </div>
                  <div
                    className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                      selectedPRO === candidate.id ? "bg-primary_blue" : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <p className="text-center text-white py-8 text-sm">You can't make any change on this screen</p>
      </div>
    </div>
  );
};

export default VotingManagement2;
