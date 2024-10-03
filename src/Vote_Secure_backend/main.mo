import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Buffer "mo:base/Buffer";

actor VoteSecure {
  //Type Candidate
  public type Candidate = {
    name : Text;
    pollName : Text;
    manifesto : Text;
    var no_of_votes : Nat;
  };
  
  //Type Poll
  public type Poll = {
    position : Text;
    electionID : Nat;
    var votes : [(Nat, Text)];
    var candidates : [Candidate];
    var candidateNames : [Text];
  };

  //Type Election
  public type Election = {
    title : Text;
    var id : Nat;
    adminName : Text;
    var voterIDsArr : [Nat];
    var realVotersArr : [var (Text, Nat)];
    var polls : [Poll];
    var pollNames : [Text];
  };
  
  //Type Admin
  public type Admin = {
    name : Text;
    email : Text;
    phoneNo : Text;
    username : Text;
    password : Text;
    var elections : [Election];
  };

  //stable variables to store existing admins, elections, election IDs and usernames
  stable var ExistingAdmins : [Admin] = [];
  stable var ExistingElections : [Election] = [];
  stable var ExistingElectionIDs : [Nat] = [];
  stable var ExistingUsernames : [Text] = [];

  //checks the equality of two text values or strings
  func istextEqual(x : Text, y : Text) : Bool{
    return x == y;
  };

  //generates random IDs
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

  //gets list of emails and corresponding ids
  public query func getEmailsnIDS(electionID : Nat) : async [(Text, Nat)] {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        return Array.freeze(election.realVotersArr);
      }; 
    };
    return [];
  };   

  //sign up for admin
  public func signup (name : Text, email : Text, phoneNo : Text, username : Text, password : Text) : async Text {
    let isAdminCreated = await createAdmin(name, email, phoneNo, username, password);
    if (isAdminCreated == true) {
      return "Successfully Signed In";
    } else {
      return "SignUp failed. Try again";
    };
  };

  //creates an Admin record
  func createAdmin(name : Text, email : Text, phoneNo : Text, username : Text, password : Text) : async Bool {
    //check if username exists; username must be unique
    let OptUsrname = Array.find<Text>(ExistingUsernames, func x = x == username);
    let usrname = switch (OptUsrname) {
      case(?n){n};
      case(null){"Unique"};
    };
    if (usrname == "Unique") {
      let newAdmin : Admin = {
        name = name;
        email = email;
        phoneNo = phoneNo;
        username = username;
        password = password;
        var elections = [];
      };
      
      //add new admin to stable list of admins
      let ExAdminsBuff = Buffer.fromArray<Admin>(ExistingAdmins);
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
  func createPoll(pollName : Text, electionID : Nat, candidates : [(Text, Text)]) : Bool {
    for (election in ExistingElections.vals()) {
      let pollNamesBuff = Buffer.fromArray<Text>(election.pollNames);
      let pollsBuff = Buffer.fromArray<Poll>(election.polls);

      if (election.id == electionID) {
        //check if pollName (position) already exists in the election object
        if (Buffer.contains<Text>(pollNamesBuff, pollName, istextEqual)) {
          return false;
        };

        //create new poll under an election
        let newPoll : Poll = {
          electionID = electionID;
          position = pollName;
          var votes = [];
          var candidates = [];
          var candidateNames = [];
        };

        let candNamesBuff = Buffer.fromArray<Text>(newPoll.candidateNames);
        let candsBuff = Buffer.fromArray<Candidate>(newPoll.candidates);

        for (candidate in candidates.vals()) {
          //check if candidate name already exists in poll
          if (Buffer.contains<Text>(candNamesBuff, candidate.0, istextEqual)) {
            return false;
          };
    
          let newCand = {
            name = candidate.0;
            pollName = pollName;
            manifesto = candidate.1;
            var no_of_votes = 0;
          };

          //add new candidate to buffers
          candsBuff.add(newCand);
          candNamesBuff.add(newCand.name);
        };
        //reassign the array equivalent of updated buffers to the list of candidates and candidate names in new poll
        newPoll.candidates := Buffer.toArray<Candidate>(candsBuff);
        newPoll.candidateNames := Buffer.toArray<Text>(candNamesBuff);

        //add the new poll to the list of polls in the election with electionID       
        pollsBuff.add(newPoll);
        pollNamesBuff.add(newPoll.position);
        election.polls := Buffer.toArray<Poll>(pollsBuff);
        election.pollNames := Buffer.toArray<Text>(pollNamesBuff);
        return true;
      };
    };
    return false;
  };

  //public function: creates new election
  public func createNewElection(title : Text, adminName : Text, adminPass : Text, pollList : [(Text, [(Text, Text)])]) : async Text {
    for (admin in ExistingAdmins.vals()) {
      if (admin.username == adminName) {
        if (adminPass == admin.password) {
          let electionReturn : Text = await createElection(title, pollList, adminName);
          return electionReturn;
        } else {
          return "Wrong Password";
        };
      };
    };
    return "Username does not exist";
  };

  //creates new election (Note: named poll in frontend button)
  //sample pollList : [("President", [("CandidateA", "Manifesto: I will make the world a better place"), ("CandidateB", "Manifesto: I will make the world a better place")])]
  //returns ID of new election or error text
  func createElection(title : Text, pollList : [(Text, [(Text, Text)])], adminName : Text) : async Text {
    for (admin in ExistingAdmins.vals()) {
      //if admin with username adminName found:
      if (admin.username == adminName) {
        var ElectionID = 0;
        //initialise new election record
        var newElection : Election = {
          var id = 0;
          title = title;
          adminName = adminName;
          var voterIDsArr = [];
          var realVotersArr = [var];  
          var polls = [];
          var pollNames = [];
        };
        //generate unique ID for election record
        label getElectionID while true {
          let newID = await genRandID();
          if (Array.find<Nat>(ExistingElectionIDs, func x = x == newID) != null) {
            continue getElectionID;
          } else {
            newElection.id := newID;
            ElectionID := newID;
            break getElectionID;
          };
        };
        //add election record and electionID to existing stable lists
        let ExElectionsBuff = Buffer.fromArray<Election>(ExistingElections);
        let ExElectionIDsBuff = Buffer.fromArray<Nat>(ExistingElectionIDs);
        ExElectionsBuff.add(newElection);
        ExElectionIDsBuff.add(newElection.id);
        ExistingElections := Buffer.toArray<Election>(ExElectionsBuff);
        ExistingElectionIDs := Buffer.toArray<Nat>(ExElectionIDsBuff);

        //add new election to list of elections in the associated Admin record
        let adminElectionsBuff = Buffer.fromArray<Election>(admin.elections);
        adminElectionsBuff.add(newElection);
        admin.elections := Buffer.toArray<Election>(adminElectionsBuff);

        //create all polls (positions) associated with newelection
        for (poll in pollList.vals()) {
          let isPollCreated : Bool = createPoll(poll.0, ElectionID, poll.1);
          //remove all polls from election if a single poll fails (Note: Better handling will be incorporated at a later date)
          if (isPollCreated != true) {
            for (election in ExistingElections.vals()) {
              if (election.id == ElectionID) {
                election.polls := [];
                election.pollNames := [];
              };
            };
            return "A poll failed";
          };
        };
        let IDNat : Text = Nat.toText(newElection.id);
        return IDNat;
      };
    };
    return "Admin not found";
  };

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

  //registers voters
  func registerVoters(voterInfo: [Text], electionID : Nat) : async [Nat] {
    for (election in ExistingElections.vals()){
      if (election.id == electionID) {
        let numValidVoters = Array.size(voterInfo);
        let realVoters = Buffer.Buffer<(Text, Nat)>(numValidVoters);
        let voterIDs = Buffer.Buffer<Nat>(numValidVoters);
        var i = 0;
        //generate IDs for all voters in voterInfo
        while (i < numValidVoters) {
          //while loop to ensure generated ID does not already exist
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
        //reassign voter info of election with electionID
        election.realVotersArr := Array.thaw<(Text, Nat)>(Buffer.toArray<(Text, Nat)>(realVoters));
        election.voterIDsArr := Buffer.toArray<(Nat)>(voterIDs);

        return election.voterIDsArr;
      };
    };
    return [];
  };

  //authenticates voter based on electionID
  func authenticateVoter(voterId: Nat, electionID : Nat): async Bool {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        let id = Array.find<Nat>(election.voterIDsArr, func x = x == voterId);
        if (id != null) {
          return true
        } else {
          return false
        };
      };
    };
  return false;
  };

  //casts and store votes
  func castVote(pollName : Text, electionID : Nat, voterID : Nat, vote: Text): async Text {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        let electionPollsArr = election.polls;
        for (poll in electionPollsArr.vals()) {
          if (poll.position == pollName) {
            let votesBuff = Buffer.fromArray<(Nat, Text)>(poll.votes);
            let pollCandNamesBuff = Buffer.fromArray<Text>(poll.candidateNames);
            //check if candidate is amongst the list of valid candidates
            if (Buffer.contains(pollCandNamesBuff, vote, istextEqual)) {
              votesBuff.add((voterID, vote));
              poll.votes := Buffer.toArray<(Nat, Text)>(votesBuff);
              for (candidate in poll.candidates.vals()) {
                if (candidate.name == vote) {
                  candidate.no_of_votes += 1;
                };
              };
              return "Success";
            } else {
              return "Candidate Name does not exist for poll";
            };         
          };
        };
        return "Non-existent poll";         
      };
    };
    return "ElectionID non-existent";   
  };

  //casts votes for all the polls in a particular election, for a single voterID
  //sample input: (33433, [(position1, "Candidate3"), (position2, "Candidate1")])
  public func castOverallVote(voterID : Nat, listOfVotes : [(Text, Text)], electionID : Nat) : async Text{
    let authStatus : Bool = await authenticateVoter(voterID, electionID);
    if (authStatus == false) {
      return "Unidentified Voter";
    } else {
      for (vote in listOfVotes.vals()) {
        let voteCastInfo = await castVote(vote.0, electionID, voterID, vote.1);
        if (voteCastInfo != "Success") {
          return "An error occurred at" # vote.1;
        };
      };
      return "Votes Successfully Cast";
    };
  };

  //retrieve votes stats
  public query func getVotes(electionID : Nat): async Text {
    for (election in ExistingElections.vals()) {
      if (election.id == electionID) {
        let electionStats = Buffer.Buffer<(Text, [(Text, Nat)])>(0);
        for (poll in election.polls.vals()) {
          let pollStats = Buffer.Buffer<(Text, Nat)>(0);
          for (candidate in poll.candidates.vals()) {
            pollStats.add((candidate.name, candidate.no_of_votes));
          };
          electionStats.add((poll.position, Buffer.toArray(pollStats)));
        };
        return debug_show(Buffer.toArray(electionStats));
      };
    };
    return "Election with ID provided does not exist";
  };
};
