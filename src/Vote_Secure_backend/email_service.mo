actor EmailService {
  // Stable variable to store voter information
  stable var voters: [(Text, Text, Text)] = [];  // (voterName, voterEmail, voterID)


  // Function to prepare voter data for external email service
  public func sendVotersEmail() : async [Text] {
    var responses : [Text] = [];
    for (voter in voters.vals()) {
      let voterName = voter.0;
      let voterEmail = voter.1;
      let voterID = voter.2;

      // // Prepare the message to be sent to the external service
      // let message = "Sending email to " # voterName # " at " # voterEmail # " with Voter ID: " # voterID;
    };

    return responses;
  }
}
