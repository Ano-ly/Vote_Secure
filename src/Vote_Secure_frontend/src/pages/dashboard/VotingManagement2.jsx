import React, { useEffect, useState } from "react";
import backarrow from "/assets/backarrow.png";
import { Link } from "react-router-dom";
import { backendActorPromise } from "../../utils/backend";

const VotingManagement2 = () => {
  const [electionStats, setElectionStats] = useState({});
  const [electionId, setElectionId] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedElectionId = localStorage.getItem("electionId") || "";
        setElectionId(storedElectionId);

        if (!storedElectionId) return;

        const backendActor = await backendActorPromise;
        const stats = await backendActor.getElectionStats(
          BigInt(storedElectionId)
        );

        // Transform API response
        const groupedStats = {};
        stats.forEach(([pollName, candidates]) => {
          groupedStats[pollName] = candidates.map(
            ([candidateName, voteCount]) => ({
              candidateName,
              voteCount: Number(voteCount), // convert BigInt -> number
            })
          );
        });

        setElectionStats(groupedStats);
        localStorage.setItem("electionStats", JSON.stringify(groupedStats));
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-main_bg_color flex flex-col items-center justify-center py-14 px-4 relative">
      <Link to="/votingm1">
        <img
          src={backarrow}
          alt="back"
          className="absolute w-8 left-5 top-6 cursor-pointer"
        />
      </Link>

      <div className="w-11/12">
        {/* Header */}
        <div className="flex flex-col items-center text-white text-center mb-6 relative w-full">
          <h1 className="text-xl font-bold mb-2 md:text-2xl">
            Election Results
          </h1>
          <p className="text-sm text-gray-500 md:text-base md:max-w-xl">
            Showing real-time voting statistics for Election ID: {electionId}
          </p>
        </div>

        {/* Render results grouped by poll/position */}
        {Object.keys(electionStats).map((pollName) => {
          const candidates = electionStats[pollName];
          const totalVotes = candidates.reduce(
            (sum, c) => sum + c.voteCount,
            0
          );

          return (
            <div
              key={pollName}
              className="bg-[#0f1a2f] rounded-2xl p-6 mt-8 shadow-md text-white"
            >
              <h2 className="text-lg mb-6 font-semibold">{pollName}</h2>

              <div className="space-y-6">
                {candidates.map((candidate, idx) => {
                  const percentage =
                    totalVotes > 0
                      ? ((candidate.voteCount / totalVotes) * 100).toFixed(0)
                      : 0;

                  return (
                    <div key={idx} className="flex items-center gap-4">
                      {/* Candidate index */}
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>

                      {/* Candidate avatar */}
                      <img
                        src="/assets/avatar.png"
                        alt={candidate.candidateName}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      {/* Candidate details */}
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">
                          {candidate.candidateName}
                        </p>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
                          <div
                            className="h-4 bg-blue-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Percentage + votes */}
                      <div className="flex flex-col text-right text-sm min-w-[100px]">
                        <span className="font-semibold">{percentage}%</span>
                        <span className="text-gray-400">
                          {candidate.voteCount} Votes
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total votes footer */}
              <p className="mt-6 text-right text-sm text-gray-400">
                Total no of votes = {totalVotes}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VotingManagement2;
