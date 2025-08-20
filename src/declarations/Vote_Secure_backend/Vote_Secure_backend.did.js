export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'authenticateAdmin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
    'authenticateVoter' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Text], []),
    'castOverallVote' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        [IDL.Text, IDL.Text],
        [],
      ),
    'createNewElection' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(
            IDL.Tuple(
              IDL.Text,
              IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text, IDL.Text)),
            )
          ),
        ],
        [IDL.Text, IDL.Text],
        [],
      ),
    'getCandidates' : IDL.Func(
        [IDL.Nat],
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Text)))],
        [],
      ),
    'getElectionStats' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))))],
        ['query'],
      ),
    'getEmailsnIDS' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'getPollCandidates' : IDL.Func(
        [IDL.Nat, IDL.Text],
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Text)],
        [],
      ),
    'regVotersFromCsv' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Text, IDL.Vec(IDL.Nat)],
        [],
      ),
    'registerElectionVoters' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Text), IDL.Nat],
        [IDL.Text],
        [],
      ),
    'registerVoters' : IDL.Func(
        [IDL.Vec(IDL.Text), IDL.Nat],
        [IDL.Vec(IDL.Nat)],
        [],
      ),
    'signup' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text, IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
