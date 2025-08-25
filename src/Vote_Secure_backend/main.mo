import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

import Types "./types";
import Utils "./utils";
import csvUpload "./csv_upload";


actor VoteSecure {
  //stable variables to store existing admins, elections, election IDs and usernames
  stable var ExistingAdmins : [Types.Admin] = [];
  stable var ExistingElections : [Types.Election] = [];
  stable var ExistingElectionIDs : [Nat] = [];
  stable var ExistingUsernames : [Text] = [];

  //gets list of emails and corresponding ids
  //returns empty list if election with electionID does not exist
  public shared ({ caller }) query func getEmailsnIDS(electionID : Nat) : async [(Text, Nat)] {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        if (election.adminPrincipal != caller) {
          return [];
        }
        return Array.freeze(election.realVotersArr);
      };
    };
    return [];
  };

  //authenticates admin (for admin login)
  //returns "Success" if admin authenticated
  //returns "Fail" if admin not authenticated
  //returns "Admin does not exist" if admin account with caller provided does not exist
  public query shared ({ caller }) func authenticateAdmin() : async Text {
    for (admin in ExistingAdmins.vals()) {
      if (admin.principal == caller) {
        return "Success";
      } else {
        return "Fail";
      };
    };
    return "Admin does not exist";
  };

  //sign up for admin
  //Returns ("Success", "Nil") is successfully signed in
  //Returns ("Fail", "<Error message>") if sign in failed
  public shared ({ caller }) func signup (name : Text, email : Text, phoneNo : Text, username : Text, password : Text) : async (Text, Text) {
    let isAdminCreated = await createAdmin(name, email, caller, phoneNo, username, password);
    if (isAdminCreated == true) {
      return ("Success", "Nil");
    } else {
      return ("Fail", "Admin with username" # username # "exists");
    };
  };

  //creates an Admin record and persists to stable storage
  public func createAdmin(name : Text, email : Text, principal : Principal, phoneNo : Text, username : Text, password : Text) : async Bool {
    //check if username exists; username must be unique
    let OptUsrname = Array.find<Text>(ExistingUsernames, func x = x == username);
    let usrname = switch (OptUsrname) {
      case(?n){ n };
      case(null){ "Unique" };
    };
    if (usrname == "Unique") {
      let newAdmin : Types.Admin = {
        name = name;
        email = email;
        principal = principal;
        phoneNo = phoneNo;
        username = username;
        password = password;
        var elections = [];
      };

      //add new admin to stable list of admins
      let ExAdminsBuff = Buffer.fromArray<Types.Admin>(ExistingAdmins);
      let ExUsernamesBuff = Buffer.fromArray<Text>(ExistingUsernames);
      ExAdminsBuff.add(newAdmin);
      ExUsernamesBuff.add(username);
      ExistingAdmins := Buffer.toArray(ExAdminsBuff);
      ExistingUsernames := Buffer.toArray(ExUsernamesBuff);

      return true;
    } else {
      return false;
    };
  };

  //creates poll;
  //returns true if poll created
  //returns false if poll not created
  //sample input ("President", 344233322, [("CandidateA", "Manifesto: I will make the world a better place")])
  public func createPoll(pollName : Text, electionID : Nat, candidates : [(Text, Text, Text)]) : async Text {
    for (election in ExistingElections.vals()) {
      let pollNamesBuff = Buffer.fromArray<Text>(election.pollNames);
      let pollsBuff = Buffer.fromArray<Types.Poll>(election.polls);

      if (election.id == electionID) {
        //check if pollName (position) already exists in the election object
        if (Buffer.contains<Text>(pollNamesBuff, pollName, Utils.istextEqual)) {
          return "Duplicate Poll Names";
        };

        //create new poll under an election
        let newPoll : Types.Poll = {
          electionID = electionID;
          position = pollName;
          var votes = [];
          var candidates = [];
          var candidateNames = [];
        };

        let candNamesBuff = Buffer.fromArray<Text>(newPoll.candidateNames);
        let candsBuff = Buffer.fromArray<Types.Candidate>(newPoll.candidates);

        for (candidate in candidates.vals()) {
          //check if candidate name already exists in poll
          if (Buffer.contains<Text>(candNamesBuff, candidate.0, Utils.istextEqual)) {
            return "Duplicate candidate names";
          };

          let newCand = {
            name = candidate.0;
            description = candidate.2;
            pollName = pollName;
            manifesto = candidate.1;
            var no_of_votes = 0;
          };

          //add new candidate to buffers
          candsBuff.add(newCand);
          candNamesBuff.add(newCand.name);
        };
        //reassign the array equivalent of updated buffers to the list of candidates and candidate names in new poll
        newPoll.candidates := Buffer.toArray<Types.Candidate>(candsBuff);
        newPoll.candidateNames := Buffer.toArray<Text>(candNamesBuff);

        //add the new poll to the list of polls in the election with electionID
        pollsBuff.add(newPoll);
        pollNamesBuff.add(newPoll.position);
        election.polls := Buffer.toArray<Types.Poll>(pollsBuff);
        election.pollNames := Buffer.toArray<Text>(pollNamesBuff);
        return "Success";
      };
    };
    return "ElectionID does not exist";
  };



  //creates new election (Note: named poll in frontend button)
  //sample pollList : [("President", [("CandidateA", "Manifesto: I will make the world a better place"), ("CandidateB", "Manifesto: I will make the world a better place")])]
  //returns ("Success", <ID of new election>) if successful
  //returns ("Fail", "<Error message>") if fail
  public shared ({ caller }) func createElection(date: Text, title : Text, desc : Text, pollList : [(Text, [(Text, Text, Text)])], adminName : Text) : async (Text, Text) {
    for (admin in ExistingAdmins.vals()) {
      //if admin with username adminName found:
      if (admin.username == adminName) {
        var ElectionID = 0;
        //initialise new election record
        var newElection : Types.Election = {
          var id = 0;
          title = title;
          adminPrincipal = caller;
          var voterIDsArr = [];
          var realVotersArr = [var];
          var polls = [];
          var pollNames = [];
          var alreadyVotedIDs = [];
          description = desc;
          date_created = date;
        };
        //generate unique ID for election record
        label getElectionID while true {
          let newID = await Utils.genRandID();
          if (Array.find<Nat>(ExistingElectionIDs, func x = x == newID) != null) {
            continue getElectionID;
          } else {
            newElection.id := newID;
            ElectionID := newID;
            break getElectionID;
          };
        };
        //add election record and electionID to existing stable lists
        let ExElectionsBuff = Buffer.fromArray<Types.Election>(ExistingElections);
        let ExElectionIDsBuff = Buffer.fromArray<Nat>(ExistingElectionIDs);
        ExElectionsBuff.add(newElection);
        ExElectionIDsBuff.add(newElection.id);
        ExistingElections := Buffer.toArray<Types.Election>(ExElectionsBuff);
        ExistingElectionIDs := Buffer.toArray<Nat>(ExElectionIDsBuff);

        //add new election to list of elections in the associated Admin record
        let adminElectionsBuff = Buffer.fromArray<Types.Election>(admin.elections);
        adminElectionsBuff.add(newElection);
        admin.elections := Buffer.toArray<Types.Election>(adminElectionsBuff);

        //create all polls (positions) associated with newelection
        for (poll in pollList.vals()) {
          let pollCreateReturn : Text = await createPoll(poll.0, ElectionID, poll.1);
          //remove all polls from election if a single poll fails (Note: Better handling will be incorporated at a later date)
          if (pollCreateReturn != "Success") {
            for (election in ExistingElections.vals()) {
              if (election.id == ElectionID) {
                election.polls := [];
                election.pollNames := [];
              };
            };
            return ("Fail", pollCreateReturn);
          };
        };
        let IDNat : Text = Nat.toText(newElection.id);
        return ("Success", IDNat);
      };
    };
    return ("Fail", "Admin not found");
  };

  //registers voters
  //returns empty list if election with electionID does not exist or caller not authorised
  public shared ({ caller }) func registerVoters(voterInfo: [Text], electionID : Nat) : async [Nat] {
    for (election in ExistingElections.vals()){
      if (election.id == electionID) {
        if (election.adminPrincipal != caller) {
          return [];
        }
        let numValidVoters = Array.size(voterInfo);
        let realVoters = Buffer.Buffer<(Text, Nat)>(numValidVoters);
        let voterIDs = Buffer.Buffer<Nat>(numValidVoters);
        var i = 0;
        //generate IDs for all voters in voterInfo
        while (i < numValidVoters) {
          //while loop to ensure generated ID does not already exist
          label getUniqID while true {
            let newID = await Utils.genRandID();
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
        //reassign voter info of election with electionID
        election.realVotersArr := Array.thaw<(Text, Nat)>(Buffer.toArray<(Text, Nat)>(realVoters));
        election.voterIDsArr := Buffer.toArray<(Nat)>(voterIDs);

        return election.voterIDsArr;
      };
    };
    return [];
  };

  //authenticates voter (for voter login)
  //returns "Success" if voter authenticated
  //returns "Fail" if voter not authenticated
  //returns "ElectionID does not exist" if electionID does not exist
  public func authenticateVoter(voterId: Nat, electionID : Nat): async Text {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        let id = Array.find<Nat>(election.voterIDsArr, func x = x == voterId);
        if (id != null) {
          let ID = Array.find<Nat>(election.alreadyVotedIDs, func x = x == voterId);
          if (ID != null) {
            return "Fail";
          };
          return "Success";
        } else {
          return "Fail";
        };
      };
    };
    return "ElectionID does not exist";
  };

  //casts and store votes
  public func castVote(pollName : Text, electionID : Nat, voterID : Nat, vote: Text): async Text {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        let electionPollsArr = election.polls;
        for (poll in electionPollsArr.vals()) {
          if (poll.position == pollName) {
            let votesBuff = Buffer.fromArray<(Nat, Text)>(poll.votes);
            let pollCandNamesBuff = Buffer.fromArray<Text>(poll.candidateNames);
            //check if candidate is amongst the list of valid candidates
            if (Buffer.contains(pollCandNamesBuff, vote, Utils.istextEqual)) {
              votesBuff.add((voterID, vote));
              let alVotedIDsBuff = Buffer.fromArray<Nat>(election.alreadyVotedIDs);
              alVotedIDsBuff.add(voterID);
              election.alreadyVotedIDs := Buffer.toArray<Nat>(alVotedIDsBuff);
              poll.votes := Buffer.toArray<(Nat, Text)>(votesBuff);
              for (candidate in poll.candidates.vals()) {
                if (candidate.name == vote) {
                  candidate.no_of_votes += 1;
                };
              };
              return "Success";
            } else {
              return "Candidate Name does not exist";
            };
          };
        };
        return "Poll does not exist";
      };
    };
    return "ElectionID does not exist";
  };

  //casts votes for all the polls in a particular election, for a single voterID
  //sample input: (33433, [(position1, "Candidate3"), (position2, "Candidate1")])
  public func castOverallVote(voterID : Nat,  electionID : Nat, listOfVotes : [(Text, Text)]) : async (Text, Text){
    let authStatus : Text = await authenticateVoter(voterID, electionID);
    if (authStatus == "Fail") {
      return ("Fail", "Unidentified Voter");
    } else if (authStatus != "Success") {
      return ("Fail", authStatus);
    } else {
      for (vote in listOfVotes.vals()) {
        let voteCastInfo = await castVote(vote.0, electionID, voterID, vote.1);
        if (voteCastInfo != "Success") {
          return ("Fail", "An error occurred when casting vote for" # vote.0);
        };
      };
      return ("Success", "Votes Successfully Cast");
    };
  };

  //retrieve votes stats
  /*sample return value: [("President", [("Candidate_A", 78), ("Candidate_B", 65)]),
                      ("Vice President", [("Candidate_C", 77), ("Candidate_D", 44)])
                    ]
  */
  //returns empty list if electionID does not exist
  public shared ({ caller }) query func getElectionStats(electionID : Nat): async [(Text, [(Text, Nat)])] {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        if (election.adminPrincipal != caller) {
          return [];
        }
        let electionStats = Buffer.Buffer<(Text, [(Text, Nat)])>(0);
        for (poll in election.polls.vals()) {
          let pollStats = Buffer.Buffer<(Text, Nat)>(0);
          for (candidate in poll.candidates.vals()) {
            pollStats.add((candidate.name, candidate.no_of_votes));
          };
          electionStats.add((poll.position, Buffer.toArray(pollStats)));
        };
        return Buffer.toArray(electionStats);
      };
    };
    return [];
  };

  //Returns "Success" if voters successfully registered
  //Returns "ElectionID does not exist" if electionID does not exist
  public shared ({ caller }) func regVotersFromCsv(csvInfo : Text, electionID : Nat) : async (Text, [Nat]) {
    let emailList = await csvUpload.uploadFromCsv(csvInfo);
    let regInfo : [Nat] = await registerVoters(emailList, electionID);
    if (Array.size(regInfo) == 0) {
      return ("ElectionID does not exist", []);
    } else {
      return ("Success",regInfo);
    };
  };

  //gets the names of candidates from a poll
  /* sample return value if successfull: (
    "Success", 
    "Nil",
    ["Candidate_A", "Candidate_B","Candidate_C"]
  )
  sample return value if fail: (
    "Fail", 
    "<Error message>",
    []
  )
  */
  public func getPollCandidates(electionID : Nat, pollName : Text) : async (Text, Text, [Text]) {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        for (poll in election.polls.vals()) {
          if (poll.position == pollName) {
            return ("Success", "Nil", poll.candidateNames);
          };
        };
        return ("Fail", "Position does not exist", [])
      };
    };
    return ("Fail", "ElectionID does not exist", []);
  };

  //gets the names of candidates from all polls under an election
  /* sample return value if successfull: (
    "Success", 
    "Nil",
    [("President", ["Candidate_A", "Candidate_B"]),
      ("Vice President", ["Candidate_C", "Candidate_D])]
  )
  sample return value if fail: (
    "Fail", 
    "<Error message>",
    []
  )
  */
  public func getCandidates(electionID : Nat) : async (Text, Text, [(Text, [Text])]) {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        let pollandNames = Buffer.Buffer<(Text, [Text])>(0);
        for (poll in election.polls.vals()) {
          pollandNames.add(poll.position, poll.candidateNames);
        };
        return ("Success", "Nil", Buffer.toArray<(Text, [Text])>(pollandNames));
      };
    };
    return ("Fail", "ElectionID does not exist", []);
  };

  //----------------------------
  //The following functions are not required for frontend integration
  //----------------------------

  //public function: registers voters
  //calls registerVoters(...)
  public func registerElectionVoters(adminName : Text, adminPass : Text, voterInfo: [Text], electionID : Nat) : async Text {
    for (admin in ExistingAdmins.vals()) {
      if (admin.username == adminName) {
        if (adminPass == admin.password) {
          let regVReturnVal : [Nat] = await registerVoters(voterInfo, electionID);
          return "Voters Successfully Registered" # debug_show(regVReturnVal);
        } else {
          return "Wrong Password";
        };
      };
    };
    return "Username does not exist";
  };

  //public function: creates new election
  public shared ({ caller }) func createNewElection(date : Text, adminName : Text, adminPass : Text, title : Text, desc : Text, pollList : [(Text, [(Text, Text, Text)])]) : async (Text, Text) {
    for (admin in ExistingAdmins.vals()) {
      if (admin.username == adminName) {
        if (adminPass == admin.password) {
            let electionReturn : (Text, Text) = await createElection(date, title, desc, pollList, adminName);
            return electionReturn;
        } else {
          return ("Fail", "Wrong Password");
        };
      };
    };
    return ("Fail", "Username does not exist");
};
}
