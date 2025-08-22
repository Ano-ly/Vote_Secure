import React, { useEffect, useState } from "react";
import Biometric from "../../public/assets/Biometric.png";
import logo from "../../public/Favicon.webp";
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { backendActorPromise } from "../utils/backend";

const Votingpage = () => {
  const [polls, setPolls] = useState([]); // polls with candidates
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const electionId = localStorage.getItem("electionId");
  const voterId = localStorage.getItem("voterId"); // ✅ save this in Voterlogin after login success

  // Fetch polls + candidates dynamically
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const backendActor = await backendActorPromise;
        const [status, msg, pollAndCandidates] = await backendActor.getCandidates(BigInt(electionId));

        if (status === "Success") {
          setPolls(pollAndCandidates); // [(pollName, [candidates])]
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.error("Error fetching candidates:", err);
        message.error("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [electionId]);

  // Handle selection
  const voteClick = (position, candidate) => {
    setSelectedCandidate((prev) => ({
      ...prev,
      [position]: candidate,
    }));
  };

  // Submit votes
  const handleSubmit = async () => {
    if (!voterId || !electionId) {
      message.error("Missing Voter ID or Election ID");
      return;
    }

    const votes = Object.entries(selectedCandidate); // [(pollName, candidate)]

    if (votes.length === 0) {
      message.error("Please select at least one candidate");
      return;
    }

    try {
      const backendActor = await backendActorPromise;
      const [status, msg] = await backendActor.castOverallVote(
        BigInt(voterId),
        BigInt(electionId),
        votes
      );

      if (status === "Success") {
        message.success("Votes submitted successfully!");
        navigate("/votingresults"); // ✅ go home after voting
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.error("Error casting vote:", err);
      message.error("Failed to submit vote");
    }
  };

  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4">
      <div className="w-10/12">
        {/* Header */}
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

        {/* Voting section */}
        <div className="vpage border-2 border-transparent border-t-primary_blue rounded-3xl w-full py-6 px-2 mt-10 sm:px-10">
          {loading ? (
            <p className="text-gray-400 text-center">Loading candidates...</p>
          ) : polls.length === 0 ? (
            <p className="text-gray-400 text-center">No polls available</p>
          ) : (
            <div className="flex flex-col gap-4 text-gray-500">
              {polls.map(([pollName, candidates]) => (
                <div className="flex flex-col" key={pollName}>
                  <h1 className="text-white text-xl mb-4 md:text-2xl">{pollName}</h1>
                  {candidates.map((candidate) => (
                    <div
                      className="flex justify-between items-center mb-4"
                      key={candidate}
                    >
                      <div className="flex items-center gap-3">
                        <p className="text-sm">{candidate}</p>
                      </div>
                      <div
                        className={`w-3 h-3 border-2 border-primary_blue rounded-lg md:w-4 md:h-4 ${
                          selectedCandidate[pollName] === candidate
                            ? "bg-primary_blue"
                            : "bg-transparent"
                        } cursor-pointer`}
                        onClick={() => voteClick(pollName, candidate)}
                      ></div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Submit button */}
              <div className="w-1/6">
                <Button
                  className="my-7 w-full"
                  size="large"
                  type="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Votingpage;
