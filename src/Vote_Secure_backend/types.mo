module {
  //Type Candidate
  public type Candidate = {
    name : Text;
    description : Text;
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
    description : Text;
    date_created : Text;
    var voterIDsArr : [Nat];
    var realVotersArr : [var (Text, Nat)];
    var polls : [Poll];
    var pollNames : [Text];
    var alreadyVotedIDs : [Nat];
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
};
