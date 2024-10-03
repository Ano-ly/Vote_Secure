import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Array "mo:base/Array";

module {
  // function to parse csv content
  func parseCsv(csvContent: Text) : async [[Text]] {
    let rowsBuff = Buffer.Buffer<Text>(0);
    for (row in Text.split(csvContent, #char '\n')) {
      rowsBuff.add(row);
    };
    let rows = Buffer.toArray(rowsBuff);
    let parsedRows : [[Text]] = Array.map<Text, [Text]>(rows, func (row: Text) : [Text] {
        let fields = Buffer.Buffer<Text>(0);
        for (field in Text.split(row, #char ',')) {
          fields.add(field);
        };
        return Buffer.toArray<Text>(fields);
    });
    return parsedRows;
  };

  /* Function to generate random 7-character voter ID
  public func generateVoterId() : async Text {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var voterId ="";
    let rand = Nat.abs(Nat.random());
    for (i in 0..6) {
      voterId #= Text.fromChar(Array.get(characters, Nat.toInt(rand % 62)));
    };
    return voterId;
  };
  */

  // Function to generate system field and handle csv uploads
  // format: name,email,phonenumber

  public func uploadFromCsv(csvContent: Text) : async [Text] {
    let parsedData = await parseCsv(csvContent);
    let voterBuffer = Buffer.Buffer<Text>(Array.size(parsedData));

    for (row in parsedData.vals()) {
      //let voterName = Array.get(row, 0);
      voterBuffer.add(row[1]);
      //let voterPhone = if (Array.size(row) > 2) Array.get(row, 2) else "";
      //let voterId = await generateVoterId();
    };
    return Buffer.toArray<Text>(voterBuffer);
  };
};
