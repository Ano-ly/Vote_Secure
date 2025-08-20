import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'authenticateAdmin' : ActorMethod<[string, string], string>,
  'authenticateVoter' : ActorMethod<[bigint, bigint], string>,
  'castOverallVote' : ActorMethod<
    [bigint, bigint, Array<[string, string]>],
    [string, string]
  >,
  'createNewElection' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      string,
      Array<[string, Array<[string, string, string]>]>,
    ],
    [string, string]
  >,
  'getCandidates' : ActorMethod<
    [bigint],
    [string, string, Array<[string, Array<string>]>]
  >,
  'getElectionStats' : ActorMethod<
    [bigint],
    Array<[string, Array<[string, bigint]>]>
  >,
  'getEmailsnIDS' : ActorMethod<[bigint], Array<[string, bigint]>>,
  'getPollCandidates' : ActorMethod<
    [bigint, string],
    [string, string, Array<string>]
  >,
  'regVotersFromCsv' : ActorMethod<[string, bigint], [string, Array<bigint>]>,
  'registerElectionVoters' : ActorMethod<
    [string, string, Array<string>, bigint],
    string
  >,
  'registerVoters' : ActorMethod<[Array<string>, bigint], Array<bigint>>,
  'signup' : ActorMethod<
    [string, string, string, string, string],
    [string, string]
  >,
}
