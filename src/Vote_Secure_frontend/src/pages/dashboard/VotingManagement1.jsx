import React, { useState } from "react";
import backarrow from "/assets/backarrow.png";
import { Link, useNavigate } from "react-router-dom";
import { backendActorPromise } from "../../utils/backend";  // ✅ add at top

const VotingManagement1 = () => {
  const [electionId, setElectionId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!electionId) {
      setError("Please enter an election ID.");
      return;
    }
    try {
      const backendActor = await backendActorPromise;  // unwrap the promise
      const stats = await backendActor.getElectionStats(BigInt(electionId));
      console.log("Election stats:", stats);

      if (stats.length === 0) {
        setError("Election ID does not exist or has no data.");
        return;
      }

      // ✅ Convert BigInt to Number before storing
      const normalizedStats = stats.map(candidate => ({
        candidateName: candidate[0],
        voteCount: Number(candidate[1]),
      }));

      // ✅ Save to localStorage for VotingManagement2
      localStorage.setItem("electionStats", JSON.stringify(normalizedStats));
      localStorage.setItem("electionId", electionId);

      navigate("/votingm2");
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4 relatve">
      <Link to="/dashboard">
        <img
          src={backarrow}
          alt=""
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>

      <div className="w-11/12">
        {/* Header */}
        <div className="flex flex-col items-center text-white text-center mb-6 relative w-full">
          <h1 className="text-xl font-bold mb-2 md:text-2xl">
            Vote Management
          </h1>
          <p className="text-sm text-gray-500 md:text-base md:max-w-xl">
            Easily track, verify, and tally votes in real time with VoteSecure.
            Our system ensures every vote is counted accurately and transparently.
          </p>
        </div>

        {/* Enter Election ID */}
        <div className="vpage border-2 border-transparent border-t-primary_blue rounded-3xl w-full py-6 px-4 mt-10 sm:px-10">
          <h1 className="text-white text-base mb-4 sm:text-xl">
            Enter Election ID
          </h1>
          <input
            type="text"
            placeholder="Election ID"
            value={electionId}
            onChange={(e) => setElectionId(e.target.value)}
            className="input placeholder-gray-500 text-sm w-full text-center p-2 rounded-lg text-gray-500 mb-4"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="flex items-center text-center py-2 px-8 rounded-md text-white border border-primary_blue bg-primary_blue w-fit mt-4 transition duration-300 cursor-pointer hover:bg-transparent md:py-4 md:px-10"
          >
            Show Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingManagement1;
