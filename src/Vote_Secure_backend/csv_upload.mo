import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Random "mo:base/Random";
import Native "mo:base/Native";

actor CsvUpload {
    // function to parse csv content
    public func parseCsv(csvContent: Text) : async [[Text]] {
        let rows = Text.split(csvContent, "\n");
        let parsedRows = Array.map(rows, func (row: Text) -> [Text] {
            return Text.split(row, ",");
        });
        return parsedRows;
    };
    
    // Function to generate random 7-character voter ID
    public func generateVoterId() async Text {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var voterId ="";
        let rand = Nat.abs(Nat.random());
        for (i in 0..6) {
            voterId #= Text.fromChar(Array.get(characters, Nat.toInt(rand % 62)));
            };
            return voterId;
        };

    // Function to generate system field and handle csv uploads
    public func uploadFromCsv(csvContent: Text) : async [(Text, Nat)] {
        let parsedData = await parseCsv(csvContent);
        let voterBuffer = Buffer.Buffer<(Text, Nat)>(Array.size(parsedData));
        
        for (row in parsedData.vals()) {
            let voterName = Array.get(row, 0);
            let voterEmail = Array.get(row, 1);
            let voterPhone = if (Array.size(row) > 2) Array.get(row, 2) else "";
            let voterId = await generateVoterId();
            let 
        }
    }
}