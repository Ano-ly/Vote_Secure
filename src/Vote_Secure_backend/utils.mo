import Random "mo:base/Random";

module {
  //checks the equality of two text values or strings
  public func istextEqual(x : Text, y : Text) : Bool{
    return x == y;
  };

  //generates a random ID
  public func genRandID() : async Nat {
    var ID = 0;
    //change seed if randID is null
    label genID while true {
      let seed = await Random.blob();
      let random = Random.Finite(seed);
      let optRandID = random.range(32);
      let randID : Nat = switch (optRandID) {
        case (?n) { n }; // extract Nat value if present
        case (null) { 0 }; // default value if null
      };
      if (randID == 0) {
        continue genID;
      } else {
        ID := randID;
        break genID;
      };
    };
    return ID;
  };
};
