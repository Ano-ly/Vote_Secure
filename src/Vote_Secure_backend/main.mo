import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Buffer "mo:base/Buffer";

actor VoteSecure {
  // Data Structure for storing voters info
  //i.e [("johndoe@gmail.com", 55546), ("janedoe@gmail.com", 57586)]
  stable var realVotersArr : [var (Text, Nat)] = Array.init<(Text, Nat)>(1, ("", 0));
  //i.e [(55546, "CandidateA"), (57586, "CandidateB")]
  stable var votes = Array.init<(Nat, Text)>(1, (0, ""));
  //i.e [55546, 57586]
  stable var voterIDsArr : [Nat] = [];

  // function to generate random IDs
  func genRandID() : async Nat {
    let seed = await Random.blob();
    let random = Random.Finite(seed);
    let optRandID = random.range(32);
    let randID : Nat = switch (optRandID) {
      case (?n) { n }; // extract Nat value if present
      case (null) { 0 }; // default value if null
    };
    return randID;
  };

  // Function to register voters
  public func registerVoters(voterInfo: [Text]) : async [Nat] {
    let numValidVoters = Array.size(voterInfo);
    let realVoters = Buffer.Buffer<(Text, Nat)>(numValidVoters);
    let voterIDs = Buffer.Buffer<(Nat)>(numValidVoters);
    var i = 0;
    //Generate IDs for all voters in voterInfo
    while (i < numValidVoters) {
      //while function to ensure generated ID does not already exist
      label getUniqID while true {
        let newID = await genRandID();
        let isNotUniq = Buffer.contains<Nat>(voterIDs, newID, Nat.equal);
        if (isNotUniq == false) {
          realVoters.add((voterInfo[i], newID));
          voterIDs.add(newID);
          break getUniqID;
        } else {
          continue getUniqID;
        };
      };
      i += 1;
    };
    realVotersArr := Array.thaw<(Text, Nat)>(Buffer.toArray<(Text, Nat)>(realVoters));
    voterIDsArr := Buffer.toArray<(Nat)>(voterIDs);
    return voterIDsArr;
  };

  // Function to authenticate voter
  func authenticateVoter(voterId: Nat): async Bool {
    let id = Array.find<Nat>(voterIDsArr, func x = x == voterId);
    if (id != null) {
      return true
    } else {
      return false
    };
  };

  // Function to cast and store votes
  public func castVote(voterId: Nat, vote: Text): async Text {
    let authStatus : Bool = await authenticateVoter(voterId);
    if (authStatus == false) {
      return "Unidentified Voter";
    } else {
      let votesBuff = Buffer.fromArray<(Nat, Text)>(Array.freeze<(Nat, Text)>(votes));
      votesBuff.add((voterId, vote));
      votes := Array.thaw(Buffer.toArray<(Nat, Text)>(votesBuff));
      return "Vote Successfully Cast";
    };
  };

  // Function to retrieve votes
  public query func getVotes(): async [(Nat, Text)] {
    return Array.freeze<(Nat, Text)>(votes);
  };
};
