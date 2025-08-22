import React, { useState } from "react";
import Biometric from "../../public/assets/Biometric.png";
import backarrow from "../../public/assets/backarrow.png";
import { Link, useNavigate } from "react-router-dom";
import { backendActorPromise } from "../utils/backend";

const Voterlogin = () => {
  const [voterId, setVoterId] = useState("");
  const [electionId, setElectionId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async () => {
    if (!voterId || !electionId) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const backendActor = await backendActorPromise;
      const response = await backendActor.authenticateVoter(BigInt(voterId), BigInt(electionId));

      console.log("Authentication response:", response);

      if (response === "Success") {
          localStorage.setItem("voterId", voterId);
          localStorage.setItem("electionId", electionId);
        navigate("/votingpage");
      } else {
        setError(response); // Displays "Fail" or "ElectionID does not exist"
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative contaner-r">
      <Link to="/">
        <img src={backarrow} alt="" className="absolute w-8 left-5 top-6 cursor-pointer" />
      </Link>

      <div className="bg-main_bg_color flex flex-col items-center justify-center text-center p-14 md:pt-16 pb-28 ">
        <div className="flex flex-col items-center md:w-2/4">
          <img src={Biometric} alt="" className="w-9 mb-5 md:w-11" />
          <h1 className="text-white text-xl font-bold mb-4 md:text-2xl">Login</h1>
          <p className="text-gray-500 text-base max-w-96 leading-tight mb-6 ">
            Secure access for verified voters to vote in the election.
          </p>

          <div className="flex flex-col border-none gap-4 w-full">
            <input
              type="text"
              placeholder="Enter your voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              className="input placeholder-gray-500 text-sm w-full text-center p-2 rounded-lg text-gray-500"
            />
          </div>
          <div className="flex flex-col border-none gap-4 w-full py-5">
            <input
              type="text"
              placeholder="Election id"
              value={electionId}
              onChange={(e) => setElectionId(e.target.value)}
              className="input placeholder-gray-500 text-sm w-full text-center p-2 rounded-lg text-gray-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className="text-white mt-8 bg-primary_blue w-full p-2 rounded-lg text-base"
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voterlogin;
